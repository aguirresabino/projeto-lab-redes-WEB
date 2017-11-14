(function(){
	'use strict';

	angular.module('UserController', ['UserService'])
		.controller('UserController', ['UserService', '$location', UserController]);

	function UserController(UserService, $location){
		var vm = this;

		vm.perfil = angular.fromJson(localStorage.getItem('user'));
		console.log(vm.perfil);

		vm.cadastrar = function(user){
			UserService.create(user)
				.then(function(success){
					alert('Cadastro realizado!');
				})
				.catch(function(error){
					alert('Cadastro não realizado!');
					console.log('Erro cadastro de usuário', error);
				})
		}

		vm.atualizar = function(user){
			UserService.update(user)
				.then(function(success){
					alert('Usuário atualizado!');
				})
				.catch(function(error){
					alert('Usuário não foi atualizado!');
					console.log('Erro atualização do usuário', error);
				})
		}

		vm.remover = function(id){
			UserService.remove(id)
				.then(function(success){
					$location.path('login');
					alert('Conta removida!');
				})
				.catch(function(error){
					alert('A conta não foi removida!');
					console.log('Erro remover usuário', error);
				})
		}
	}
})();