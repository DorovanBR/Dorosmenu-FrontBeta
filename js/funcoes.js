//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
	
//+--------------------------------------------------------------------------------+
//|                                                                                |
//|                jQuery Com Gerenciamento das Funções Padrões	    	           |
//|                                                                                |
//+--------------------------------------------------------------------------------+

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

	// Função para pegar a URL

		function pegaUrl(){

			// Retorna a Url atual

				return window.location.href

		}

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

	// Função para limpar formulario
	
		function limpaFormulario(formulario_id){
			var formulario = $(formulario_id);
			for(ponteiroFormulario = 0; ponteiroFormulario < formulario.length; ponteiroFormulario++){
				for(ponteiroCampos = 0; ponteiroCampos < formulario[ponteiroFormulario].length; ponteiroCampos++){
					formulario[ponteiroFormulario][ponteiroCampos].value = null
				}
			}
		}

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

	// Função para gerar estrutura da paginação
	
		function geraEstruturaPaginacao(paginacao_id, cacheName){

			// Declaração das Variaveis

				var cache = JSON.parse(localStorage.getItem(cacheName));
				var pagina_atual = parseInt(cache.paginaAtual);
				var registros_por_pagina = parseInt(cache.registrosPorPagina);
				var total_registros = parseInt(cache.totalRegistros);
				var pagina_registros = ((pagina_atual * registros_por_pagina) - registros_por_pagina)

				var paginacao = $(paginacao_id);
					paginacaoId = (paginacao_id).replace(/\#/g, "");

				var texto_paginacao = $(paginacao_id+"-texto");

				var totalPaginas = ((total_registros / registros_por_pagina).toLocaleString()).split(",");
					
					if(parseInt(totalPaginas[1]) > 0){
						totalPaginas = parseInt(totalPaginas[0]) + 1
					} else {
						totalPaginas = parseInt(totalPaginas[0])
					}
			
			// Atualiza o total de paginas da array de cache

				cache.totalPaginas = totalPaginas;
			
			// Define os botões Fixos

				var botoesFixos = [];
					botoesFixos[0] = '<li class="page-item"><a class="page-link" href="javascript:void(0);" id="btn-'+paginacaoId+'" data-paginacao="1"><i class="fa fa-angle-double-left"></i></a></li>'
					botoesFixos[1] = '<li class="page-item"><a class="page-link" href="javascript:void(0);" id="btn-'+paginacaoId+'" data-paginacao="'+(parseInt(pagina_atual)-1)+'"><i class="fa fa-angle-left"></i></a></li>'
					botoesFixos[2] = '<li class="page-item"><a class="page-link" href="javascript:void(0);" id="btn-'+paginacaoId+'" data-paginacao="'+(parseInt(pagina_atual)+1)+'"><i class="fa fa-angle-right"></i></a></li>'
					botoesFixos[3] = '<li class="page-item"><a class="page-link" href="javascript:void(0);" id="btn-'+paginacaoId+'" data-paginacao="'+totalPaginas+'"><i class="fa fa-angle-double-right"></i></a></li>'

			// Define a variavel de estrutura da paginação

				var estruturaPaginacao = "";
			
			// Condição para exibição dos botões de Pagina Anterior e Primeira Pagina

				if(totalPaginas > 1 && pagina_atual > 1){
					estruturaPaginacao += botoesFixos[0]
					estruturaPaginacao += botoesFixos[1]
				}

			// Loop para gerar os botões das paginas

				for(ponteiroPaginas = 1; ponteiroPaginas <= totalPaginas; ponteiroPaginas++){
					if(ponteiroPaginas == pagina_atual){
						estruturaPaginacao += '<li class="page-item active"><a class="page-link" href="javascript:void(0);" id="btn-'+paginacaoId+'" data-paginacao="'+ponteiroPaginas+'">'+ponteiroPaginas+'</a></li>'
					} else {
						if(totalPaginas > 5){
							if(ponteiroPaginas == pagina_atual-2 || ponteiroPaginas == pagina_atual-1 || ponteiroPaginas == pagina_atual+1 || ponteiroPaginas == pagina_atual+2){
								estruturaPaginacao += '<li class="page-item"><a class="page-link" href="javascript:void(0);" id="btn-'+paginacaoId+'" data-paginacao="'+ponteiroPaginas+'">'+ponteiroPaginas+'</a></li>'
							}
						} else {
							estruturaPaginacao += '<li class="page-item"><a class="page-link" href="javascript:void(0);" id="btn-'+paginacaoId+'" data-paginacao="'+ponteiroPaginas+'">'+ponteiroPaginas+'</a></li>'
						}
					}
				}

			// Condição para exibição dos botões de Proxima Pagina e Ultima Pagina

				if(totalPaginas > 1 && pagina_atual < totalPaginas){
					estruturaPaginacao += botoesFixos[2]
					estruturaPaginacao += botoesFixos[3]
				}

			// Retorna a paginacao no elemento atribuido pela id da função

				paginacao.html(estruturaPaginacao);
				
			// Declara as variaveis que trataram a mensagem de paginação

				var de = total_registros > 0 ? parseInt(pagina_registros+1) : 0;
				var para = 0;
					if(parseInt(pagina_registros+1) < parseInt(total_registros)){
						if(parseInt(pagina_registros/registros_por_pagina) < parseInt(total_registros/registros_por_pagina)){
							para = parseInt(registros_por_pagina+pagina_registros);
						} else {
							para = parseInt(total_registros);
						}
					} else if(parseInt(pagina_registros+1) == parseInt(total_registros)){
						para = parseInt(pagina_registros+1);
					}
				var total = parseInt(total_registros);

			// Atualiza o texto da paginação

				var texto = "Exibindo $de - $para de um total de $total registro(s)"
					texto = texto.replace("$de", de)
					texto = texto.replace("$para", para)
					texto = texto.replace("$total", total)
				texto_paginacao.html(texto);

			// Grava no localStorage o cache atualizado

				localStorage.setItem(cacheName, JSON.stringify(cache));

		}

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

	// Funcão para trocar a pagina

		function trocaPagina(objeto, cacheName){

			// Declara as Variaveis

				var paginaAtual = parseInt(objeto.getAttribute("data-paginacao"));

			// Carrega o Cache na variavel

				var cache = JSON.parse(localStorage.getItem(cacheName));
					cache.paginaAtual = paginaAtual;

			// Grava as informações no LocalStorage

				localStorage.setItem(cacheName, JSON.stringify(cache));

		}

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

	// Função para gerar a Notificação

		// function GeraNotificacao(titulo, opcoes){

		// 	var Notificacao = new Notification(titulo, opcoes);

		// }

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

	// Função para consultar o cep no viaCep

		function consultaCEP(cep){

			// Trata o CEP recebido

				cep = cep.replace(/\-/g,"");
				cep = cep.replace(/\./g,"");

			// Verifica se o cep possui 8 digitos

				if(cep.length == 8){

					$.ajax({
						type: "get",
						dataType: "html",
						url: "https://viacep.com.br/ws/"+cep+"/json/",
						beforeSend: function(data){
							Toast.fire({
								title: 'Consultando CEP',
								text: 'Aguarde',
								onOpen: () => {
								  swal.showLoading()
								},
								allowOutsideClick: false
							})
						},
						error: function(erro) {
							var mensagem = null; 
							if (erro == "timeout") {				        						
								mensagem = 'O Servidor demorou na resposta, tente novamente mais tarde!';
							}
							else {				        						
								mensagem = 'Algo estranho aconteceu, tente novamente mais tarde!';
							}
							swal.close();
							Toast.fire({
								title: "Ops!",
								text: mensagem,
								type: "error",
								allowOutsideClick: false
							})
						},		
						success: function(retorno) {

							// Fecha o SweetAlert

								swal.close();

							// Trata o retorno transformando em array

								return jQuery.parseJSON(retorno);
						}
					});

				} else {
					return false
				}

		}

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

	// Função para Gerar Token

		function GeraToken(tamanho, tiposcaracteres = 1){

			// Valida as variaveis de entrada

				if(typeof tamanho != 'number' || !Number.isInteger(tamanho) || tamanho < 1){
					return console.error("function GeraToken(tamanho, tiposcaracteres): a variavel [tamanho] deve conter apenas numeros inteiros e acima de 0");
				}
				if(typeof tiposcaracteres != 'number' || !Number.isInteger(tiposcaracteres) || tiposcaracteres < 1 || tiposcaracteres > 7){
					return console.error("function GeraToken(tamanho, tiposcaracteres): a variavel [tiposcaracteres] deve conter apenas numeros inteiros e estar entre 1 á 7");
				}

			// Declara as Variaveis

				var Token = "";
				var TipoCaracter = null;
				var Caracter = null;

			// Realiza a repetição para gerar o token

				for(var ponteiro = 0;ponteiro < tamanho;ponteiro++){

					TipoCaracter = Math.floor((Math.random() * tiposcaracteres) + 1);

					switch(TipoCaracter){
						case 1:
							Caracter = String.fromCharCode(Math.floor(Math.random() * (tabelaASCII.LetrasMaiusculas.fim - tabelaASCII.LetrasMaiusculas.inicio + 1)) + tabelaASCII.LetrasMaiusculas.inicio);
							break;
						case 2:
							Caracter = String.fromCharCode(Math.floor(Math.random() * (tabelaASCII.LetrasMinusculas.fim - tabelaASCII.LetrasMinusculas.inicio + 1)) + tabelaASCII.LetrasMinusculas.inicio);
							break;
						case 3:
							Caracter = String.fromCharCode(Math.floor(Math.random() * (tabelaASCII.Numeros.fim - tabelaASCII.Numeros.inicio + 1)) + tabelaASCII.Numeros.inicio);
							break;
						case 4:
							Caracter = String.fromCharCode(Math.floor(Math.random() * (tabelaASCII.CaracteresEspeciais1.fim - tabelaASCII.CaracteresEspeciais1.inicio + 1)) + tabelaASCII.CaracteresEspeciais1.inicio);
							break;
						case 5:
							Caracter = String.fromCharCode(Math.floor(Math.random() * (tabelaASCII.CaracteresEspeciais2.fim - tabelaASCII.CaracteresEspeciais2.inicio + 1)) + tabelaASCII.CaracteresEspeciais2.inicio);
							break;
						case 6:
							Caracter = String.fromCharCode(Math.floor(Math.random() * (tabelaASCII.CaracteresEspeciais3.fim - tabelaASCII.CaracteresEspeciais3.inicio + 1)) + tabelaASCII.CaracteresEspeciais3.inicio);
							break;
						case 7:
							Caracter = String.fromCharCode(Math.floor(Math.random() * (tabelaASCII.CaracteresEspeciais4.fim - tabelaASCII.CaracteresEspeciais4.inicio + 1)) + tabelaASCII.CaracteresEspeciais4.inicio);
							break;
					}

					Token += Caracter;

				}

			// Retorna o Token

				return Token;

		}

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

	// Função para Download de URI

		function downloadURI(uri, name){
		    var link = document.createElement("a");
		    link.download = name;
		    link.href = uri;
		    link.click();
		}

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

	// Função para Carregar um JSON

		function carregaJSON(url, usaCache = false, cache = ""){

			// Define a Promise

				return new Promise((resolve, reject)=>{

					// Verifica se é uma url valida

						var regUrl = /(([http]|[https])+([:])+([\/\/])+([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?)|(([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?)/gm;
						
						if(!regUrl.test(url)){

							// Retorna o log no console

								log("error", "URL inválida");

							// encerra função
							
								return reject(false);

						} else {

							// Realiza o ajax para consulta

								$.ajax({
									type: "get",
									dataType: "JSON",
									crossDomain: true,
									url: url,
									beforeSend: function(data){
										Toast.fire({
											title: 'Carregando arquivo JSON',
											text: 'Aguarde',
											onOpen: () => {
											  swal.showLoading()
											},
											allowOutsideClick: false
										})
									},
									error: function(erro) {
										var mensagem = null; 
										if (erro == "timeout") {				        						
											mensagem = 'O Servidor demorou na resposta, tente novamente mais tarde!';
										}
										else {				        						
											mensagem = 'Algo estranho aconteceu, tente novamente mais tarde!';
										}
										swal.close();
										Toast.fire({
											title: "Ops!",
											text: mensagem,
											type: "error",
											allowOutsideClick: false
										}).then((data)=>{
											reject();
										})
									},		
									success: function(retorno) {

										// Fecha o SweetAlert

											swal.close();

										// Verifica se irá gravar em cache

											if(usaCache && cache != "" && cache != null && cache != " "){
												localStorage.setItem(cache, JSON.stringify(retorno));
											}

										// Trata o retorno transformando em array

											return resolve(retorno);
									}
								});

						}

				});

		}

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

	// Função que gerencia o Base64

		var Base64 = {
			_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
			encode: function(e) {
				var t="";
				var n,r,i,s,o,u,a;
				var f=0;
				e=Base64._utf8_encode(e);
				while(f<e.length){
					n=e.charCodeAt(f++);
					r=e.charCodeAt(f++);
					i=e.charCodeAt(f++);
					s=n>>2;
					o=(n&3)<<4|r>>4;
					u=(r&15)<<2|i>>6;
					a=i&63;
					if(isNaN(r)){
						u=a=64
					} else if(isNaN(i)){
						a=64
					}
					t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)
				}
				return t
			},
			decode: function(e) {
				var t="";
				var n,r,i;
				var s,o,u,a;
				var f=0;
				e=e.replace(/[^A-Za-z0-9+/=]/g,"");
				while(f<e.length){
					s=this._keyStr.indexOf(e.charAt(f++));
					o=this._keyStr.indexOf(e.charAt(f++));
					u=this._keyStr.indexOf(e.charAt(f++));
					a=this._keyStr.indexOf(e.charAt(f++));
					n=s<<2|o>>4;
					r=(o&15)<<4|u>>2;
					i=(u&3)<<6|a;
					t=t+String.fromCharCode(n);
					if(u!=64){
						t=t+String.fromCharCode(r)
					}
					if(a!=64){
						t=t+String.fromCharCode(i)
					}
				}
				t=Base64._utf8_decode(t);
				return t
			},
			_utf8_encode: function(e) {
				e=e.replace(/rn/g,"n");
				var t="";
				for(var n=0; n<e.length; n++){
					var r=e.charCodeAt(n);
					if(r<128){
						t+=String.fromCharCode(r)
					} else if(r>127&&r<2048){
						t+=String.fromCharCode(r>>6|192);
						t+=String.fromCharCode(r&63|128)
					} else {
						t+=String.fromCharCode(r>>12|224);
						t+=String.fromCharCode(r>>6&63|128);
						t+=String.fromCharCode(r&63|128)
					}
				}
				return t
			},
			_utf8_decode: function(e) {
				var t="";
				var n=0;
				var r=c1=c2=0;
				while(n<e.length){
					r=e.charCodeAt(n);
					if(r<128){
						t+=String.fromCharCode(r);
						n++
					} else if(r>191&&r<224){
						c2=e.charCodeAt(n+1);
						t+=String.fromCharCode((r&31)<<6|c2&63);
						n+=2
					} else {
						c2=e.charCodeAt(n+1);
						c3=e.charCodeAt(n+2);
						t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);
						n+=3
					}
				}
				return t
			}
		}

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

	// Função para Verifica o navegador é mobile/tablet ou não

		function checaAcessoMobile() {
		  var check = false;
		  var regex1 = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i;
		  var regex2 = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i;
		  (function(a){if(regex1.test(a)||regex2.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
		  return check;
		}

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

	// Função para converter arquivo em Base64

		function getBase64(file) {
		  return new Promise((resolve, reject) => {
		    const reader = new FileReader();
		    reader.readAsDataURL(file);
		    reader.onload = () => resolve(reader.result);
		    reader.onerror = error => reject(error);
		  });
		}

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------