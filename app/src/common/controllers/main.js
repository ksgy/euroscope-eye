'use strict';

angular.module('euroscopeEyeApp')
.controller('MainCtrl', function ($scope, $log, MapMapdataservice) {

	MapMapdataservice.get().then(function(response) {
		$log.debug(response);
	}, function(response) {
		// TODO error handling
	});

});
