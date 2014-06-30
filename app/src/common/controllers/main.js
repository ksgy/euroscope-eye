// TODO web workers to process data

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

	$scope.markers = [];

	MapMapdataservice.get().then(function(response) {
		var resLines = response.split('[');
		var prevTime;
		var posCounter = 1;

		// $log.debug(Date(), resLines.length)

		var getPreviousPilots = function(index) {
			var resultObj = {};
			var resultArr = [];
			for (var i = index - 1; i >= 0; i--) {
				if(resLines[i].indexOf('@S') > 0 || resLines[i].indexOf('@N') > 0){
					if(resLines[i].indexOf('@S') > 0){
						var pos = resLines[i].substring(resLines[i].indexOf('@S'), resLines[i].length).replace(/\s/g, '');
					}
					if(resLines[i].indexOf('@N') > 0){
						var pos = resLines[i].substring(resLines[i].indexOf('@N'), resLines[i].length).replace(/\s/g, '');
					}
					var posArr = pos.split(':');

					resultObj[posArr[1]] = {
						name: posArr[1],
						lat: posArr[4],
						lon: posArr[5]
					}


				}
			}
			for(var r in resultObj){
				if(resultObj.hasOwnProperty(r)){
					resultArr.push(resultObj[r])
				}
			}
			return resultArr;
		};

		// for (var i = 0; i < resLines.length-1; i++) {
		for (var i = 5000; i < 14500; i++) {
			if(resLines[i].indexOf('@S') > 0 || resLines[i].indexOf('@N') > 0){
				if(resLines[i].indexOf('@S') > 0){
					var pos = resLines[i].substring(resLines[i].indexOf('@S'), resLines[i].length).replace(/\s/g, '');
				}
				if(resLines[i].indexOf('@N') > 0){
					var pos = resLines[i].substring(resLines[i].indexOf('@N'), resLines[i].length).replace(/\s/g, '');
				}
				// $log.debug(pos)
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

				 	// $log.error('1', MapMapdataservice.data.positions[posCounter-1])

				 	if(MapMapdataservice.data.positions[posCounter-1] == undefined){
				 		MapMapdataservice.data.positions[posCounter-1] = {
				 			pilots: [{
					 			name: posArr[1],
					 			lat: posArr[4],
					 			lon: posArr[5]
				 			}]

						};
				 	}
				 	// $log.error(posCounter-1, MapMapdataservice.data.positions[0])
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
							pilots: []

						}
					);
					posCounter++;
				}



				prevTime = resLines[i].substring(0,8);
			}

		};
		//

		for (var k = MapMapdataservice.data.positions.length - 1; k >= 0; k--) {
			for (var x = MapMapdataservice.data.positions[k].pilots.length - 1; x >= 0; x--) {
				$scope.markers.push(
					{
						"id": x,
						"latitude": parseFloat(MapMapdataservice.data.positions[k].pilots[x].lat),
						"longitude": parseFloat(MapMapdataservice.data.positions[k].pilots[x].lon),
						"showWindow": false,
						"title": MapMapdataservice.data.positions[k].pilots[x].name
					}

				);
			};

		};

		// $scope.markers = [{
  //         id: 1,
  //         latitude: 45,
  //         longitude: -74,
  //         showWindow: false,
  //         title: 'Marker 2'
  //       },
  //       {
  //         id: 2,
  //         latitude: 15,
  //         longitude: 30,
  //         showWindow: false,
  //         title: 'Marker 2'
  //       },
  //       {
  //         id: 3,
  //         icon: 'assets/images/plane.png',
  //         latitude: 37,
  //         longitude: -122,
  //         showWindow: false,
  //         title: 'Plane'
  //       }]

		// $log.debug(MapMapdataservice.data);
		// $log.debug($scope.markers);
		// $log.debug(Date())
	}, function(response) {
		// TODO error handling
	});

});
