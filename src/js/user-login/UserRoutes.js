import angular from 'angular';

angular.module('app').config(($stateProvider, $urlRouterProvider, $locationProvider) => {
  $stateProvider.state('index', {
    url: '/',
    template: require('views/index.html')
  });
  $stateProvider.state('admin', {
    url: '/admin',
    template: require('views/user-login/admin.html'),
    controller: 'AuthCtrl'
  });
  $stateProvider.state('login', {
    url: '/login',
    template: require('views/user-login/login.html'),
    controller: 'AuthCtrl',
    onEnter: ['$state', 'AuthFactory', ($state, AuthFactory) => {
      if (AuthFactory.isLoggedIn()) {
        $state.go('admin');
      }
    }]
  });

  $locationProvider.html5Mode(true);
});
