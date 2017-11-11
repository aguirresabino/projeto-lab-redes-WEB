(function(){
	'use strict';

	angular.module('UpSafe')
		.config(config)

	function config($routeProvider){
		$routeProvider
		    .when('/login', {
		    	templateUrl: '../views/login.html',
		    	controller: 'LoginController',
		    	controllerAs: 'Login'
		    })
	}
})();