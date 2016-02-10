import angular from 'angular';
import uiRouter from 'angular-ui-router';

const app = angular.module('app', [uiRouter]);

app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
  $urlRouterProvider.otherwise('/');
  $stateProvider.state('index', {
            url: '/',
            template: require('main/index.html')
        });
  $stateProvider.state('admin', {
    url: '/admin',
    template: require('admin/admin.html')
  });

  $locationProvider.html5Mode(true);
});

export default app;
