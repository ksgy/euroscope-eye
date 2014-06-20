'use strict';

angular.module('euroscopeEyeApp')
	.service('MapMapdataservice', function MapMapdataservice($http) {
		var MapMapdataservice = {};

		MapMapdataservice.data = {
			pilots: [],
			positions: []
		}

		MapMapdataservice.get = function() {
			// $http returns a promise, which has a then function, which also returns a promise
			var promise = $http.get('data/EuroScope20140425.txt').then(function (response) {
				return response.data;
			});
			// Return the promise to the controller
			return promise;
		}

		return MapMapdataservice;

	});
