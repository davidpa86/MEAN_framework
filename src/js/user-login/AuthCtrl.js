import angular from 'angular';

angular.module('app').controller('AuthCtrl', [
  '$scope',
  '$state',
  'AuthFactory',
  ($scope, $state, AuthFactory) => {
    $scope.user = {};

    $scope.logIn = () => {
      AuthFactory.logIn($scope.user).error((error) => {
        $scope.error = error;
      }).then(() => {
        $state.go('admin');
      });
    };
    $scope.logOut = () => {
      AuthFactory.logOut();
      $state.go('login');
    };
  }
]);
