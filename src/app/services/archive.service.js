(function(){
	'use strict';

	angular.module('ArquivoService', [])
		.service('ArquivoService', ArquivoService);

	function ArquivoService($http){
		const urlBase = 'https://upsafe.herokuapp.com/rest';
		const methods = {
			GET : 'GET',
			POST : 'POST',
			PUT : 'PUT',
			DELETE : 'DELETE'
		};

		this.upload = function(arquivo){
			const path = 'arquivo/uploadArquivo';

			var dado = angular.toJson(arquivo);
			console.log(dado);

			var request = {
				url: `${urlBase}/${path}`,
				method: methods.POST,
				data: dado,
				headers: {'Authorization': 'Bearer '+ localStorage.token}
			};

			return $http(request);
		}

		this.download = function(id){
			const path = `arquivo/downloadArquivo/${id}`;

			var request = {
				url: `${urlBase}/${path}`,
				method: methods.GET,
				responseType: 'blob',
				headers: {'Authorization': 'Bearer '+ localStorage.token}
			};

			return $http(request);
		}

		this.list = function(){
			const path = 'arquivo/listarArquivos';

			var request = {
				url: `${urlBase}/${path}`,
				method: methods.GET,
				headers: {'Authorization': 'Bearer '+ localStorage.token}
			};

			return $http(request);
		}

		this.delete = function(id){
			const path = `arquivo/removerArquivo/${id}`;

			var request = {
				url: `${urlBase}/${path}`,
				method: methods.DELETE,
				headers: {'Authorization': 'Bearer '+ localStorage.token}
			};

			return $http(request);
		}
	}

	ArquivoService.$inject = ['$http'];
})();