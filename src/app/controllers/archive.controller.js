(function(){
	'use strict';

	angular.module('ArquivoController', ['ArquivoService'])
		.controller('ArquivoController', ['ArquivoService', ArquivoController]);

	function ArquivoController(ArquivoService){
		var vm = this;

		vm.enviarArquivo = function(arquivo){
			ArquivoService.update(arquivo)
				.then(function(success){
					console.log('Arquivo enviado');
				})
				.catch(function(error){
					console.log('O arquivo não foi enviado');
				})
		}

		vm.baixarArquivo = function(idArquivo){
			ArquivoService.download(idArquivo)
				.then(function(success){
					console.log('Arquivo baixado');
				})
				.catch(function(error){
					console.log('O arquivo não foi baixado');
				})
		}

		vm.listarArquivos = function(){
			ArquivoService.list()
				.then(function(success){
					console.log('Arquivos listados');
				})
				.catch(function(error){
					console.log('Arquivos não foram listados');
				})
		}
	}
})();