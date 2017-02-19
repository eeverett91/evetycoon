var mod = angular.module('tycoon.controllers', []);

/* Login Controller */
mod.controller('loginController', function($scope, $routeParams, authService) {
	var location = window.location.href;
	var code = location.slice(location.indexOf('=')+1, location.lastIndexOf('&'));
	var state = location.slice(location.lastIndexOf('=')+1);
	
	if(readCookie('state') == state)  {
		//createCookie('OAuth2_code', code, 'secure', 7);
		
		authService.getAccessToken(code).success(function (response) {				
			console.log(response);
		}).error(function (response) {
			console.log(response);
		})
	}
	
	window.location = 'https://tycoon.eeverett91.com';
});

/* Dashboard Controller */
mod.controller('dashboardController', function($scope, $routeParams) {
	
});

/* Minerals Controller */
mod.controller('mineralsController', function($scope, $routeParams, marketService) {
	$scope.sortType = "buy.max";
	$scope.sortReverse = false;
	$scope.loading = true;
	
	marketService.getGroupInfo(1857).success(function (response) {
		var length = response.items.length;
		$scope.marketData = new Array(length);
		var ids = '';
		
		for(var i=0; i < response.items.length; i++) {
			var item = response.items[i];
			
			var id = item.type.id;
			var icon = item.type.icon.href.replace('http','https');
			var name = item.type.name;
			
			ids += id + ',';
			
			$scope.marketData[i] = {
				id: id,
				name: name,
				icon: icon,
				buy: {
					min: '',
					max: '',
					volume: ''
				},
				sell: {
					min: '',
					max: '',
					volume: ''
				},
				history: {
					retrieved: false,
					loading: true
				},
				expanded: false
			};
		}
		
		ids = ids.slice(0, -1);
	
		marketService.getMarketInfo(ids).success(function (response) {
			for(var i=0; i < response.length; i++) {
				var item = response[i];
				
				$scope.marketData[i].buy.min = item.buy.min;
				$scope.marketData[i].buy.max = item.buy.max;
				$scope.marketData[i].buy.volume = item.buy.volume;
				$scope.marketData[i].sell.min = item.sell.min;
				$scope.marketData[i].sell.max = item.sell.max;
				$scope.marketData[i].sell.volume = item.sell.volume;
			}
			
			$scope.loading = false;
		});
	});
	
	$scope.getHistory = function(index, id) {
		$scope.marketData[index].history.loading = true;
		if($scope.marketData[index].history.retrieved == false) {
			marketService.getMarketHistory(id).success(function (response) {
				var dates = prices = volumes = '';
				
				for(var i=0; i < response.items.length; i++) {
					var item = response.items[i];
					
					dates += item.date.slice(0, -9) + '|';
					prices += item.avgPrice + '|';
					volumes += item.volume + '|';
				}
				
				dates = dates.slice(0, -1);
				prices = prices.slice(0, -1);
				volumes = volumes.slice(0, -1);
				
				$scope.marketData[index].history = {
					chart: {
						caption: "Market History",
						xaxisname: "Date",
						pyaxisname: "Average Price",
						pyaxisminvalue: "0",
						syaxisname: "Volume",
						syaxisminvalue: "0",
						pixelsPerPoint: "0",
						pixelsPerLabel: "30",
						lineThickness: "1",
						compactdatamode: "1",
						dataseparator: "|",
						labelHeight: "30",
						theme: "fint"
					},
					categories: [{
						category: dates
					}],
					dataset: [{
						seriesname: 'Average Price',
						data: prices,
						parentYaxis: 'P'
					},{
						seriesname: 'Volume',
						data: volumes,
						parentYaxis: 'S'
					}]
				};
			});
			
			$scope.marketData[index].history.retrieved = true;
		}
		
		$scope.marketData[index].history.loading = false;
	}
});

/* Blueprints Controller */
mod.controller('blueprintsController', function($scope, $routeParams) {
	
});

/* Manufacturing Controller */
mod.controller('manufacturingController', function($scope, $routeParams) {
	
});

/* Research Controller */
mod.controller('researchController', function($scope, $routeParams) {
	
});