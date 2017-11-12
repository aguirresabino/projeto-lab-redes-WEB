(function(){
	'use strict';

	angular.module('UserController', ['UserService'])
		.controller('UserController', ['UserService', UserController]);

	function UserController(UserService){
		var vm = this;

		vm.cadastrar = function(user){
			UserService.create(user)
				.then(function(succes){
					alert('Cadastro realizado!');
				})
				.catch(function(error){
					alert('Cadastro não realizado!');
				})
		}
	}
})();