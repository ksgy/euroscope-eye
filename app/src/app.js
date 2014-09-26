'use strict';

angular.module('euroscopeEyeApp', [
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ngRoute',
	'google-maps',
	'n3-line-chart'
])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'src/common/views/main.html',
				controller: 'MainCtrl'
			})
			.when('/admin', {
				templateUrl: 'src/admin/views/admin.html',
				controller: 'AdminAdminCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	});
