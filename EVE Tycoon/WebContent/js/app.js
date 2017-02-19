// Code goes here
var app = angular.module('tycoon',['tycoon.services','tycoon.controllers','ngRoute','ng-fusioncharts']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.
	when("/dashboard", {templateUrl: "partials/dashboard.html", controller: "dashboardController"}).
	when("/minerals", {templateUrl: "partials/minerals.html", controller: "mineralsController"}).
	when("/blueprints", {templateUrl: "partials/blueprints.html", controller: "blueprintsController"}).
	when("/manufacturing", {templateUrl: "partials/manufacturing.html", controller: "manufacturingController"}).
	when("/research", {templateUrl: "partials/research.html", controller: "researchController"}).
	when("/login", {templateUrl: "partials/login.html", controller: "loginController"}).
	otherwise({redirectTo: '/dashboard'});
}]);

var navMenuOpen = false;

function login() {
	var client_id = '1234db740b264a0ab557837dc257998f';
	var scope = 'publicData';
	var redirect_uri = 'https://tycoon.eeverett91.com/#/login';
	var response_type = 'code';
	var baseUrl = 'https://login.eveonline.com/oauth/authorize/?';
	var state = generateState();
	
	var url = baseUrl + 'client_id=' + client_id;
	url += '&redirect_uri=' + redirect_uri.replace(new RegExp(':','g'),'%3A').replace(new RegExp('/','g'),'%2F').replace(new RegExp('#','g'),'%23');
	url += '&state=' + state;
	url += '&scope=' + scope;
	url += '&response_type=' + response_type;
	
	createCookie('state', state, 'secure', 7);
	
	window.location.replace(url);
}

function generateState()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 15; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function createCookie(name,value,flags,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + ';' + flags + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function toggleNavMenu() {
	if(navMenuOpen) {
		document.getElementById("sideNav").style.width = "0";
		document.getElementById("main").style.marginLeft = "0";
	
		navMenuOpen = false;
	} else {
		document.getElementById("sideNav").style.width = "250px";
		document.getElementById("main").style.marginLeft = "250px";
		
		navMenuOpen = true;
	}
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("sideNav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}