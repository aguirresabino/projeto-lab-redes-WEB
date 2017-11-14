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
		    .when('/meus-arquivos', {
		    	templateUrl: '../views/arquivos.html',
		    	controller: 'ArquivoController',
		    	controllerAs: 'Arquivo',
		    	authorize: true
		    })
		    .when('/editar-perfil', {
		    	templateUrl: '../views/editar-perfil.html',
		    	controller: 'UserController',
		    	controllerAs: 'User',
		    	authorize: true
		    })
		    .otherwise({
		        redirectTo: '/login'
		    })
	}
	config.$inject = ['$routeProvider']
})();