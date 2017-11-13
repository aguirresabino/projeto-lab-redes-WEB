(function(){
	'use strict';

	angular.module('UpSafe')
		.config(config)

	function config($routeProvider){
		$routeProvider
		    .when('/login', {
		    	templateUrl: '../views/login.html',
		    	controller: 'UserController',
		    	controllerAs: 'User'
		    })
		    .otherwise({
		        redirectTo: '/login'
		    })
	}
	config.$inject = ['$routeProvider']
})();