(function(){
	'use strict';

	angular.module('ArquivoController', ['ArquivoService'])
		.controller('ArquivoController', ['ArquivoService', ArquivoController]);

	function ArquivoController(ArquivoService){
		var vm = this;

		vm.listarArquivos = function(){
			ArquivoService.list()
				.then(function(success){
					vm.arquivos = success.data;
					console.log('Arquivos listados', vm.arquivos);
				})
				.catch(function(error){
					console.log('Arquivos não foram listados');
				})
		}();

		vm.enviarArquivo = function(arquivo){
			var arquivo = document.querySelector('input[type=file]').files[0];
			var user = angular.fromJson(localStorage.getItem('user'));
			var readerArquivo = new FileReader();

			var objArquivo = {};


			if(arquivo) {
				objArquivo = {
					'idUsuario': user.id,
					'nome': arquivo.name,
					'content': null,
					'tamanho': arquivo.size
				};
				readerArquivo.readAsDataURL(arquivo);
				console.log('arquivo', objArquivo);

				readerArquivo.onload = function() {
					objArquivo.content = readerArquivo.result.split(';base64,')[1];
					console.log(objArquivo.content);

					ArquivoService.upload(objArquivo)
						.then(function(success){
							console.log('Arquivo enviado');
						})
						.catch(function(error){
							console.log('O arquivo não foi enviado');
						});
				}
			}else{
				alert('Nenhum arquivo foi selecionado!');
			}
		}

		vm.deletar = function(idArquivo){
			ArquivoService.delete(idArquivo)
				.then(function(success){
					alert('Arquivo excluído!');
				})
				.catch(function(error){
					console.log('Erro ao deletar arquivo', error);
				})
		}

		vm.baixarArquivo = function(arquivo){
			ArquivoService.download(arquivo.id)
				.then(function(success){
					console.log('Arquivo baixado');	
					console.log(success.data);

					/*var tipo;
  
				  	var arquivo = {
				    	nome: "arquivo.pdf"
				  	};
				  
				  	switch (arquivo.nome.split(".")[1]) {
				    	case "pdf":
				      		tipo = "application/pdf";
				      		break;
				    	case "pnj":
				      		tipo = "image/png";
				      		break;
				    	case "jpg":
				      		tipo = "image/jpg";
				      		break;
				    	case "jpeg":
				      		tipo = "image/jpg";
				      		break;
				  }

				  console.log('AQUI');
				  
				  var blob = new Blob([], {type: tipo});
				  FileSaver.saveAs(blob, arquivo.nome);*/
				})
				.catch(function(error){
					console.log('O arquivo não foi baixado');
				})
		}

		vm.limparStorage = function(){
			localStorage.clear();
		}
	}
})();