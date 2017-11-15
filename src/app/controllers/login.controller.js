(function(){
	'use strict';

	angular.module('LoginController', ['UserService'])
		.controller('LoginController', ['UserService', '$location', LoginController]);

	function LoginController(UserService, $location){
		var vm = this;

		vm.login = function(login){
			UserService.login(login)
				.then(function(success){
					$('.modal-backdrop').remove(); //Escondendo o modal onde eh feito o login.
					
					var token = success.data.password;
					localStorage.setItem('token', token);

					var user = angular.toJson(success.data);
					localStorage.setItem('user', user);

					$location.path('meus-arquivos');
				})
				.catch(function(error){
					alert("Dados informados estão incorretos, verifique as informações e tente novamente!");
					console.log("Erro login aluno:", error);
				})
		}
	}
})();