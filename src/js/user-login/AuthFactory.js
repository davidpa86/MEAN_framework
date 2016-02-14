import angular from 'angular';

angular.module('app').factory('AuthFactory', ['$http', '$window', ($http, $window) => {
  var AuthFactory = {};

  AuthFactory.saveToken = (token) => {
    $window.localStorage['flapper-news-token'] = token;
  };

  AuthFactory.getToken = () => {
    return $window.localStorage['flapper-news-token'];
  };

  AuthFactory.isLoggedIn = () => {
    var token = AuthFactory.getToken();

    if (token && token !== 'undefined') {
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  AuthFactory.currentUser = () => {
    if (AuthFactory.isLoggedIn()) {
      var token = AuthFactory.getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload.username;
    }
  };

  AuthFactory.logIn = (user) => {
    return $http.post('/login', user).success((data) => {
      AuthFactory.saveToken(data.token);
    });
  };

  AuthFactory.logOut = () => {
    $window.localStorage.removeItem('flapper-news-token');
  };

  return AuthFactory;
}]);
