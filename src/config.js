import angular from 'angular';
import uiRouter from 'angular-ui-router';

const app = angular.module('app', [uiRouter]);

app.factory('authFactory', ['$http', '$window', function($http, $window) {
  var authFactory = {};

  authFactory.saveToken = function(token) {
    $window.localStorage['flapper-news-token'] = token;
  };

  authFactory.getToken = function() {
    return $window.localStorage['flapper-news-token'];
  };

  authFactory.isLoggedIn = function() {
    var token = authFactory.getToken();

    if (token && token !== 'undefined') {
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  authFactory.currentUser = function() {
    if (authFactory.isLoggedIn()) {
      var token = authFactory.getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload.username;
    }
  };

  authFactory.logIn = function(user) {
    return $http.post('/login', user).success(function(data) {
      authFactory.saveToken(data.token);
    });
  };

  authFactory.logOut = function() {
    $window.localStorage.removeItem('flapper-news-token');
  };

  return authFactory;
}]);

app.controller('AuthCtrl', [
  '$scope',
  '$state',
  'authFactory',
  function($scope, $state, authFactory) {
    $scope.user = {};

    $scope.logIn = function() {
      authFactory.logIn($scope.user).error(function(error) {
        $scope.error = error;
      }).then(function() {
        $state.go('admin');
      });
    };
    $scope.logOut = function(){
      authFactory.logOut();
      $state.go('login');
    };
  }
]);

app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
  $stateProvider.state('index', {
    url: '/',
    template: require('views/index.html')
  });
  $stateProvider.state('admin', {
    url: '/admin',
    template: require('views/admin.html'),
    controller: 'AuthCtrl'
  });
  $stateProvider.state('login', {
    url: '/login',
    template: require('views/login.html'),
    controller: 'AuthCtrl',
    onEnter: ['$state', 'authFactory', ($state, authFactory) => {
      if (authFactory.isLoggedIn()) {
        $state.go('admin');
      }
    }]
  });

  $locationProvider.html5Mode(true);
});
export default app;
