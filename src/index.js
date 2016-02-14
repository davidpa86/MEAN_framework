import angular from 'angular';
import appModule from './config';
import './css/master.scss';

//Loading user-logins files:
import './js/user-login/AuthFactory.js';
import './js/user-login/AuthCtrl.js';
import './js/user-login/UserRoutes.js';

angular.bootstrap(document, [appModule.name]);
