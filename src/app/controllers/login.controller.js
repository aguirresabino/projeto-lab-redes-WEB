(function(){
	'use strict';

	angular.module('LoginController', ['UserService'])
		.controller('LoginController', ['UserService', '$location', LoginController]);

	function LoginController(UserService, $location){
		var vm = this;

		vm.login = function(login){
			console.log(login)
			UserService.login(login)
				.then(function(success){
					var token = success.data.password;
					localStorage.setItem('token', token);
					alert('nome:', success.data.nome);
				})
				.catch(function(error){
					alert("Dados informados estão incorretos, verifique as informações e tente novamente!");
					console.log("Erro login aluno:", error);
				})
		}
	}
})();