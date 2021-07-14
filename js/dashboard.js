//------------------------------------
// Funções Customizadas
//------------------------------------

    // Função para Consultar os Registros de Pedido

        function ConsultaRegistrosPedido(){

            // Define as Variaveis

                var divCardsPedidos = $("#div-cards-pedidos");

            // Limpa os Registros da Tabela

                divCardsPedidos.html("");

            // Pesquisar os Registros no banco de dados

                PesquisaRegistroBD(bancoDados, "Pedidos").then((data)=>{
                    
                    // Define as Variaveis
                        
                        var registrosHtml = ""

                    // Faz um laço de repetição para adicionar os registros em formato HTML

                        for(var i in data){

                            // Define as Variaveis

                                var registro = data[i];
                                var codigo = registro.hasOwnProperty("codigo") ? registro.codigo : "-";
                                var mesa = registro.hasOwnProperty("mesa") ? registro.mesa : "-";
                                var cod_status = registro.hasOwnProperty("cod_status") ? registro.cod_status : "-";
                                var status = registro.hasOwnProperty("status") ? registro.status : "-";
                                var data_cadastro = registro.hasOwnProperty("data_cadastro") ? registro.data_cadastro : "-";
                                var horario_cadastro = registro.hasOwnProperty("horario_cadastro") ? registro.horario_cadastro : "-";
                                var data_atualizacao = registro.hasOwnProperty("data_atualizacao") ? registro.data_atualizacao : "-";
                                var horario_atualizacao = registro.hasOwnProperty("horario_atualizacao") ? registro.horario_atualizacao : "-";
                                var cod_situacao = registro.hasOwnProperty("cod_situacao") ? registro.cod_situacao : "-";
                                var estilo_card = {};

                            // Verifica Qual será o estilo do Card

                                switch(parseInt(cod_status)){
                                    case 1:
                                        estilo_card = {
                                            cor_fundo: "",
                                            cor_texto: "",
                                            icone: "<i class='far fa-check-circle fa-6x'></i>",
                                        }
                                        break;
                                    case 2:
                                        estilo_card = {
                                            cor_fundo: " bg-primary",
                                            cor_texto: " text-white",
                                            icone: "<i class='fas fa-pizza-slice fa-6x'></i>",
                                        }
                                        break;
                                    case 3:
                                        estilo_card = {
                                            cor_fundo: " bg-warning",
                                            cor_texto: " text-white",
                                            icone: "<i class='fas fa-user-tie fa-6x'></i>",
                                        }
                                        break;
                                    case 4:
                                        estilo_card = {
                                            cor_fundo: " bg-success",
                                            cor_texto: " text-white",
                                            icone: "<i class='fas fa-thumbs-up fa-6x'></i>",
                                        }
                                        break;
                                }

                            // Verifica se o registro está com a flag de Cadastrado
                            
                                if(parseInt(cod_situacao) == 1){
                                    registrosHtml += "<div class='col-6 col-md-4'>";
                                    registrosHtml += "<div class='card'>";
                                    registrosHtml += "<div class='card-header text-center"+estilo_card.cor_fundo+estilo_card.cor_texto+"'>";
                                    registrosHtml += estilo_card.icone;
                                    registrosHtml += "</div>";
                                    registrosHtml += "<ul class='list-group list-group-flush'>";
                                    registrosHtml += "<li class='list-group-item'>Status: "+status+"</li>";
                                    registrosHtml += "<li class='list-group-item'>Pedido: #"+codigo+"</li>";
                                    registrosHtml += "<li class='list-group-item'>Mesa: "+mesa+"</li>";
                                    registrosHtml += "<li class='list-group-item'>Lançado Em: "+data_cadastro+" "+horario_cadastro+"</li>";
                                    registrosHtml += "<li class='list-group-item'>Ultima Atualização: "+data_cadastro+" "+horario_cadastro+"</li>";
                                    registrosHtml += "<li class='list-group-item text-right'>";
                                    registrosHtml += "<button type='button' class='btn btn-secondary' name='button-pedido' id='button-pedido' data-registro-dados='"+JSON.stringify(registro)+"' funcao='informacao'><i class='fas fa-receipt'></i></button>";
                                    registrosHtml += "<button type='button' class='btn btn-primary' name='button-pedido' id='button-pedido' data-registro-dados='"+JSON.stringify(registro)+"' funcao='alterar-status'><i class='fas fa-undo-alt'></i></button>";
                                    registrosHtml += "<button type='button' class='btn btn-success' name='button-pedido' id='button-pedido' data-registro-dados='"+JSON.stringify(registro)+"' funcao='pagar'><i class='fas fa-hand-holding-usd'></i></button>";
                                    registrosHtml += "</li>";
                                    registrosHtml += "</ul>";
                                    registrosHtml += "</div>";
                                    registrosHtml += "</div>";
                                }
                        }

                    // Verifica se tem algum registro para exibir na tela

                        if(registrosHtml.length > 0){
                            divCardsPedidos.html(registrosHtml);
                        }

                })
        }

    // Função para Preencher os Dados no Formulario de Alteração

        function selecionaRegistroPedido(dados){

            // Define as Variaveis

                var form = {
                    codigo: {
                        input: $("input[name='input-codigo']")
                    },
                    mesa: {
                        input: $("input[name='input-mesa']"),
                        divMensagem: $("#input-mesa-div-mensagem"),
                        mensagemValida: $("input[name='input-mesa']").attr("data-mensagem-valido"),
                        mensagemInvalida: $("input[name='input-mesa']").attr("data-mensagem-invalido")
                    },
                    valor_total: {
                        input: $("input[name='input-valor-total']"),
                        divMensagem: $("#input-valor-total-div-mensagem"),
                        mensagemValida: $("input[name='input-valor-total']").attr("data-mensagem-valido"),
                        mensagemInvalida: $("input[name='input-valor-total']").attr("data-mensagem-invalido")
                    },
                    valor_pago: {
                        input: $("input[name='input-valor-pago']"),
                        divMensagem: $("#input-valor-pago-div-mensagem"),
                        mensagemValida: $("input[name='input-valor-pago']").attr("data-mensagem-valido"),
                        mensagemInvalida: $("input[name='input-valor-pago']").attr("data-mensagem-invalido")
                    },
                    valor_troco: {
                        input: $("input[name='input-valor-troco']"),
                        divMensagem: $("#input-valor-troco-div-mensagem"),
                        mensagemValida: $("input[name='input-valor-troco']").attr("data-mensagem-valido"),
                        mensagemInvalida: $("input[name='input-valor-troco']").attr("data-mensagem-invalido")
                    },
                    produtos: []
                }
            
            // Aplica o valor do Dado no Campo

                form.codigo.input.val(dados.codigo);
                form.mesa.input.val(dados.mesa);
                form.valor_total.input.val(dados.valor_total);
                form.valor_pago.input.val(dados.valor_pago);
                form.valor_troco.input.val(dados.valor_troco);
                form.produtos = dados.produtos;

            // Define as Variaveis

                var divProdutosPedido = $("#div-pedido-produtos");

            // Limpa a Div de Produtos do Pedido

                divProdutosPedido.html("");

            // Cria um Laço de Repetição para Exibir os Campos de Produtos na Tela

                for(var i in form.produtos){
                    var registro = form.produtos[i];
                    var indice = parseInt(i) + parseInt(1);

                    var rowsProdutosPedido = "<div class='row' id='div-produto' data-produto-id='"+indice+"'>";
                    rowsProdutosPedido += "<div class='col-5 col-xl-7'>";
                    rowsProdutosPedido += "<div class='form-floating mb-3'>";
                    rowsProdutosPedido += "<select class='form-select' name='select-produto' id='select-produto' data-produto-id='"+indice+"' data-mensagem-valido='Sucesso!' data-mensagem-invalido='Produto inválido, tente novamente!' required></select>";
                    rowsProdutosPedido += "<label for='select-produto'>Produto</label>";
                    rowsProdutosPedido += "<div id='select-produto-div-mensagem' data-produto-id='"+indice+"'></div>";
                    rowsProdutosPedido += "</div>";
                    rowsProdutosPedido += "</div>";
                    rowsProdutosPedido += "<div class='col-4 col-xl-3'>";
                    rowsProdutosPedido += "<div class='form-floating mb-3'>";
                    rowsProdutosPedido += "<input type='text' class='form-control' name='input-quantidade' id='input-quantidade' data-produto-id='"+indice+"' placeholder='Entre com a Quantidade do Produto' data-mensagem-valido='Sucesso!' data-mensagem-invalido='Quantidade inválida, tente novamente!' required>";
                    rowsProdutosPedido += "<label for='input-quantidade'>Qtd.</label>";
                    rowsProdutosPedido += "<div id='input-quantidade-div-mensagem' data-produto-id='"+indice+"'></div>";
                    rowsProdutosPedido += "</div>";
                    rowsProdutosPedido += "</div>";
                    rowsProdutosPedido += "<div class='col-3 col-xl'>";
                    rowsProdutosPedido += "<button type='button' class='btn btn-danger' name='button-excluir-produto' id='button-excluir-produto' data-produto-id='"+indice+"' style='margin-top: 13px;'><i class='fas fa-times'></i></button>";
                    rowsProdutosPedido += "</div>";
                    rowsProdutosPedido += "<input type='hidden' name='input-valor-total-produto' id='input-valor-total-produto' value='"+registro.valor_total_produto+"' data-produto-id='"+indice+"'>";
                    rowsProdutosPedido += "</div>";

                    divProdutosPedido.append(rowsProdutosPedido);

                    $("input[name='input-quantidade'][data-produto-id='"+indice+"']").mask('000.000.000.000.000', {reverse: true});

                    ConsultaRegistrosProduto("select[name='select-produto'][data-produto-id='"+indice+"']", {
                        cod_produto: registro.cod_produto,
                        quantidade: registro.quantidade,
                        valor_total_produto: registro.valor_total_produto
                    });

                }

            // Atualiza o Contador do Botão de Adicionar Produtos

                $("button[name='button-adicionar-produto']").attr("data-total-produtos", $("div[id='div-produto']").length)
            
            // Exibir o Botão de Alterar

                $("button[name='button-crud'][data-funcao='alterar']").show();
                $("button[name='button-crud'][data-funcao='cadastrar']").hide();
        }

    // Função para Excluir o Registro do Banco de Dados

        function excluirRegistroPedido(dados, excluirDefinitivo){
            
            // Verifica se o registro será excluido do banco ou flegado como excluido

                if(excluirDefinitivo){
                    excluiRegistroBD(bancoDados, "Pedidos", dados.codigo).then((data)=>{
                        Swal.fire({
                            icon: 'success',
                            title: 'Sucesso',
                            text: 'Pedido excluido com sucesso.',
                            allowOutsideClick: false
                        }).then((data)=>{
                            ConsultaRegistrosPedido();
                        })
                    })
                } else {

                    var novosDados = {
                        cod_situacao: 2,
                        data_atualizacao: (new Date).toLocaleDateString(),
                        horario_atualizacao: (new Date).toLocaleTimeString()
                    };

                    atualizaRegistroBD(bancoDados, "Pedidos", dados.codigo, novosDados).then((data)=>{
                        Swal.fire({
                            icon: 'success',
                            title: 'Sucesso',
                            text: 'Pedido excluido com sucesso.',
                            allowOutsideClick: false
                        }).then((data)=>{
                            // Consultar todos os Registros no Banco de Dados
                                ConsultaRegistrosPedido();
                        })
                    });
                }
        }


//------------------------------------
// Processos com jQuery
//------------------------------------

jQuery(document).ready(($)=>{

    // Executa os processos ao finalizar o carregamento da pagina

        $(document).ready(()=>{
            criaBancoDados(EstruturaBD).then((data)=>{
                bancoDados = data;
                ConsultaRegistrosPedido();
            })
        })

    // Valida o Campo de Mesa do Pedido

        $(document).on('keyup', 'input[name="input-mesa"]', (evento)=>{

            // Define as Variaveis

                var idInput = evento.currentTarget.id;
                var inputMesa = $(evento.currentTarget);
                var mensagemValida = inputMesa.attr("data-mensagem-valido");
                var mensagemInvalida = inputMesa.attr("data-mensagem-invalido");

                var divMensagem = $("#"+idInput+"-div-mensagem");

            // Remover a Classe e Limpar a Mensagem da divMensagem

                divMensagem.html("");
                divMensagem.removeClass("invalid-feedback");
                divMensagem.removeClass("valid-feedback");

            // Remove as Classes de Validação do Campo

                inputMesa.removeClass("is-invalid");
                inputMesa.removeClass("is-valid");

            // Define as Regras de Validação

                var validacao = [];
                    validacao[0] = inputMesa.val() != undefined;
                    validacao[1] = inputMesa.val() != null;
                    validacao[2] = parseInt(inputMesa.val().replace(/[.]/g, "")) > 0;

                var checaValidacao = validacao[0] && validacao[1] && validacao[2];

            // Realiza a condição das validações para tratar o campo

                if(checaValidacao){
                    divMensagem.html(mensagemValida);
                    divMensagem.addClass("valid-feedback");
                    inputMesa.addClass("is-valid");
                } else {
                    divMensagem.html(mensagemInvalida);
                    divMensagem.addClass("invalid-feedback");
                    inputMesa.addClass("is-invalid");
                }

        })

    // Funcionalidade para o Botão Adicionar Produto ao Pedido

        $(document).on('click', 'button[name="button-adicionar-produto"]', (evento)=>{

            // Define as Variaveis

                var botaoAdicionarProduto = $(evento.currentTarget);
                var divProdutosPedido = $("#div-pedido-produtos");
                var totalProdutos = parseInt(botaoAdicionarProduto.attr("data-total-produtos")) + 1;

            // Adiciona um Novo Produto

                var rowProdutosPedido = "<div class='row' id='div-produto' data-produto-id='"+totalProdutos+"'>";
                rowProdutosPedido += "<div class='col-5 col-xl-7'>";
                rowProdutosPedido += "<div class='form-floating mb-3'>";
                rowProdutosPedido += "<select class='form-select' name='select-produto' id='select-produto' data-produto-id='"+totalProdutos+"' data-mensagem-valido='Sucesso!' data-mensagem-invalido='Produto inválido, tente novamente!' required></select>";
                rowProdutosPedido += "<label for='select-produto'>Produto</label>";
                rowProdutosPedido += "<div id='select-produto-div-mensagem' data-produto-id='"+totalProdutos+"'></div>";
                rowProdutosPedido += "</div>";
                rowProdutosPedido += "</div>";
                rowProdutosPedido += "<div class='col-4 col-xl-3'>";
                rowProdutosPedido += "<div class='form-floating mb-3'>";
                rowProdutosPedido += "<input type='text' class='form-control' name='input-quantidade' id='input-quantidade' data-produto-id='"+totalProdutos+"' data-quantidade-anterior='0' placeholder='Entre com a Quantidade do Produto' data-mensagem-valido='Sucesso!' data-mensagem-invalido='Quantidade inválida, tente novamente!' required>";
                rowProdutosPedido += "<label for='input-quantidade'>Qtd.</label>";
                rowProdutosPedido += "<div id='input-quantidade-div-mensagem' data-produto-id='"+totalProdutos+"'></div>";
                rowProdutosPedido += "</div>";
                rowProdutosPedido += "</div>";
                rowProdutosPedido += "<div class='col-3 col-xl'>";
                rowProdutosPedido += "<button type='button' class='btn btn-danger' name='button-excluir-produto' id='button-excluir-produto' data-produto-id='"+totalProdutos+"' style='margin-top: 13px;'><i class='fas fa-times'></i></button>";
                rowProdutosPedido += "</div>";
                rowProdutosPedido += "<input type='hidden' name='input-valor-total-produto' id='input-valor-total-produto' data-produto-id='"+totalProdutos+"'>";
                rowProdutosPedido += "</div>";

            // Renderiza o Html do Produto na Tela

                divProdutosPedido.append(rowProdutosPedido)

            // Atualiza o Select com os Produtos de Estoque

                ConsultaRegistrosProduto("select[name='select-produto'][data-produto-id='"+totalProdutos+"']");

            // Atualiza o Dataset do Botão

                botaoAdicionarProduto.attr("data-total-produtos", totalProdutos);

        })

    // Funcionalidade para o Botão Excluir Produto do Pedido

        $(document).on('click', 'button[name="button-excluir-produto"]', (evento)=>{

            // Define as Variaveis

                var botaoAdicionarProduto = $("button[name='button-adicionar-produto']");
                var botaoExcluirProduto = $(evento.currentTarget);
                var idProduto = botaoExcluirProduto.attr("data-produto-id");

                var inputValorTotalProduto = $("input[name='input-valor-total-produto'][data-produto-id='"+idProduto+"']");
                inputValorTotalProduto.val("0");

            // Chama a Função para Recalcular o Valor Total do Pedido

                CalculaValorTotal();

            // Excluir a Linha de Registro do Produto

                $("#div-produto[data-produto-id='"+idProduto+"']").remove();
            
            // Atualiza o Total de Produtos no Botão Adicionar

                var totalProdutos = parseInt(botaoAdicionarProduto.attr("data-total-produtos")) - 1;

            // Atualiza o Dataset do Botão

                botaoAdicionarProduto.attr("data-total-produtos", totalProdutos);

        })

    // Controla as Funcionalidades de Alterar e Incluir Registro

        $(document).on('click', 'button[name="button-crud"]', (evento)=>{
            
            // Define as Variaveis

                var botaoCrud = $(evento.currentTarget);
                var funcao = botaoCrud.attr("data-funcao");

            // Checar qual função será executada

                switch(funcao){
                    case "cadastrar": case "alterar":
                        break;
                    case "selecionar":
                        break;
                    case "excluir":
                        break;
                }

        })

})