( function() {
	'use strict';

	angular.module('ArquivoController', ['ArquivoService', 'ngFileSaver'])
		.controller('ArquivoController', ['ArquivoService', 'FileSaver', ArquivoController]);

	function ArquivoController(ArquivoService, FileSaver) {
		var vm = this;

		vm.listarArquivos = function() {
			ArquivoService.list()
				.then( function(success) {
					var arq = success.data;
					var indice = 0;
					console.log(arq.length);

					for(var i = 0; i < arq.length; i++){
						if(arq[i].tamanho > 500000){
							arq[i].tamanho = (arq[i].tamanho / 1000000).toPrecision(2) + ' MB';
						}else{
							arq[i].tamanho = arq[i].tamanho + ' Bytes';
						}
					}

					vm.arquivos = arq;
				})
				.catch( function(error) {
					console.log('Arquivos não foram listados');
				})
		}();

		vm.enviarArquivo = function(arquivo) {
			var arquivo = document.querySelector('input[type=file]').files[0];
			var user = angular.fromJson(localStorage.getItem('user'));
			var readerArquivo = new FileReader();

			var objArquivo = {};


			if (arquivo) {
				objArquivo = {
					'idUsuario': user.id,
					'nome': arquivo.name,
					'content': null,
					'tamanho': arquivo.size
				};
				readerArquivo.readAsDataURL(arquivo);

				readerArquivo.onload = function() {
					objArquivo.content = readerArquivo.result.split(';base64,')[1];

					ArquivoService.upload(objArquivo)
						.then(function(success) {
							console.log('Arquivo enviado');
							location.reload();
						})
						.catch( function(error) {
							console.log('O arquivo não foi enviado');
						});
				}
			} else {
				alert('Nenhum arquivo foi selecionado!');
			}
		}

		vm.deletar = function(idArquivo) {
			ArquivoService.delete(idArquivo)
				.then( function(success) {
					alert('Arquivo excluído!');
					vm.arquivos = vm.arquivos.filter(function(arquivo){
						return arquivo.id !== idArquivo;
					})
				})
				.catch( function(error) {
					console.log('Erro ao deletar arquivo', error);
				})			
		}

		vm.baixarArquivo = function(arquivo) {
			ArquivoService.download(arquivo.id)
				.then( function(success) {

				  FileSaver.saveAs(success.data, arquivo.nome);
				})
				.catch( function(error) {
					console.log('O arquivo não foi baixado');
				})
		}

		vm.limparStorage = function() {
			localStorage.clear();
		}
	}
})();