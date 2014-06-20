'use strict';

angular.module('euroscopeEyeApp')
.controller('MainCtrl', function ($scope, $log, MapMapdataservice) {

	$scope.map = {
	    center: {
	        latitude: 45,
	        longitude: -73
	    },
	    zoom: 8
	};

	MapMapdataservice.get().then(function(response) {
		var resLines = response.split('[');
		var prevTime;
		var posCounter = 0;

		// for (var i = 0; i < resLines.length; i++) {
		for (var i = 0; i < 100; i++) {
			if(resLines[i].indexOf('@S') > 0){
				var pos = resLines[i].substring(resLines[i].indexOf('@S'), resLines[i].length).replace(/\s/g, '');
				var posArr = pos.split(':');
					// 0 - @S
					// 1 - MIS
					// 2 - 2602
					// 3 - 1
					// 4 - 52.69050
					// 5 - -8.94933
					// 6 - 200
					// 7 - 136
					// 8 - 4282438256
					// 9 - 657


				if(prevTime == resLines[i].substring(0,8)){
					MapMapdataservice.data.positions[posCounter-1].pilots.push(
						{
							name: posArr[1],
							lat: posArr[4],
							lon: posArr[5]
						}
					);
				} else {
					MapMapdataservice.data.positions.push(
						{
							time: resLines[i].substring(0,8),
							pilots: [{
								name: posArr[1],
								lat: posArr[4],
								lon: posArr[5]
							}]

						}
					);
					posCounter++;
				}


				prevTime = resLines[i].substring(0,8);
			}

		};

		$log.debug(MapMapdataservice.data)
	}, function(response) {
		// TODO error handling
	});

});
