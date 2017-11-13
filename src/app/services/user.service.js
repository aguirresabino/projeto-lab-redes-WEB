(function(){
	'use strict';

	angular.module('UserService', [])
		.service('UserService', UserService);

	function UserService($http){
		const urlBase = 'https://upsafe.herokuapp.com/rest';
		const methods = {
			GET : 'GET',
			POST : 'POST',
			PUT : 'PUT',
			DELETE : 'DELETE'
		};

		this.login = function(login){
			const path = `login/loginUsuario/${login.email}/${login.password}`;

			var request = {
				url: `${urlBase}/${path}`,
				method: methods.POST
			};

			return $http(request);
		}

		this.create = function(user){
			const path = 'usuario/cadastrarUsuario';

			var request = {
				url: `${urlBase}/${path}`,
				method: methods.POST,
				data: user			
			};

			return $http(request);
		}

		this.update = function(user){
			const path = 'usuario/atualizarUsuario';

			var request = {
				url: `${urlBase}/${path}`,
				method: methods.PUT,
				data: user,
				headers: {'Authorization': 'Bearer '+ localStorage.token}
			};

			return $http(request);
		}

		this.remove = function(id){
			const path = `usuario/removerUsuario/${id}`;

			var requesst = {
				url:`${urlBase}/${path}`,
				method: methods.DELETE,
				headers: {'Authorization': 'Bearer '+ localStorage.token}
			};

			return $http(request);
		}
	}

	UserService.$inject = ['$http'];
})();