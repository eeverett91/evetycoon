var service = angular.module('tycoon.services', []);

service.factory('authService', function($http) {
	
	var authData = {};
	
	authData.getAccessToken = function(code) {
		
		event.preventDefault();
		
		console.log("Code: " + code);
		
		return $http({
			method: "POST",
			url: "https://login.eveonline.com/oauth/token",
			headers: {
				"Authorization": "Basic MTIzNGRiNzQwYjI2NGEwYWI1NTc4MzdkYzI1Nzk5OGY6N3NMeHRtOUFDOHlDc2RlamdPOXJKdVVxOGNIYTBwUlljamNVY2xqZQ==",
				"Content-Type": "application/json"
			},
			data: JSON.stringify({
				"grant_type": "authorization_code",
				"code": code
			})
		});
	}
	
	return authData;
});

service.factory('marketService', function($http) {
	  
	var marketData = {};

    marketData.getMarketInfo = function(itemID) {
      return $http({
        method: 'GET', 
        url: 'https://api.eve-central.com/api/marketstat/json?typeid=' + itemID + '&usesystem=30000142'
      });
    }

    marketData.getMarketInfoForSystem = function(itemID, systemID) {
      return $http({
        method: 'GET', 
        url: 'https://api.eve-central.com/api/marketstat/json?typeid=' + itemID + '&usesystem=' + systemID
      });
    }
	
	marketData.getGroupInfo = function(groupID) {
		return $http({
			method: 'GET',
			url: 'https://crest-tq.eveonline.com/market/types/?group=https://crest-tq.eveonline.com/market/groups/' + groupID + '/'
		})
	}
	
	marketData.getMarketHistory = function(itemID) {
		return $http({
			method: 'GET',
			url: 'https://crest-tq.eveonline.com/market/10000002/history/?type=https://crest-tq.eveonline.com/inventory/types/' + itemID + '/'
		});
	}
 
    return marketData;
	
});