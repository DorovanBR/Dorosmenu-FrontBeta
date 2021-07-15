//------------------------------------
// Funções Customizadas
//------------------------------------

    // Função para Consultar os Registros de Pedido

        function ConsultaRegistrosPedido(){

            // Define as Variaveis

                var TabelaRegistrosPedido = $("#table-tbody-registrosPedido");

            // Limpa os Registros da Tabela

                TabelaRegistrosPedido.html("");

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
                                var status = registro.hasOwnProperty("status") ? registro.status : "-";
                                var data_cadastro = registro.hasOwnProperty("data_cadastro") ? registro.data_cadastro : "-";
                                var horario_cadastro = registro.hasOwnProperty("horario_cadastro") ? registro.horario_cadastro : "-";
                                var data_atualizacao = registro.hasOwnProperty("data_atualizacao") ? registro.data_atualizacao : "-";
                                var horario_atualizacao = registro.hasOwnProperty("horario_atualizacao") ? registro.horario_atualizacao : "-";
                                var cod_situacao = registro.hasOwnProperty("cod_situacao") ? registro.cod_situacao : "-";

                            // Verifica se o registro está com a flag de Cadastrado
                            
                                if(parseInt(cod_situacao) == 1){
                                    registrosHtml += "<tr>";
                                    registrosHtml += "<th class='text-center' scope='row'>"+codigo+"</th>";
                                    registrosHtml += "<td class='text-center'>"+mesa+"</td>";
                                    registrosHtml += "<td class='text-center'>"+status+"</td>";
                                    registrosHtml += "<td class='text-center'>"+data_cadastro+" "+horario_cadastro+"</td>";
                                    registrosHtml += "<td class='text-center'>"+data_atualizacao+" "+horario_atualizacao+"</td>";
                                    registrosHtml += "<td class='text-center'>";
                                    registrosHtml += "<button type='button' class='btn btn-info' name='button-crud' id='button-crud' data-registro-dados='"+JSON.stringify(registro)+"' data-funcao='selecionar'><i class='far fa-edit'></i></button>";
                                    registrosHtml += "<button type='button' class='btn btn-danger' name='button-crud' id='button-crud' data-registro-dados='"+JSON.stringify(registro)+"' data-funcao='excluir'><i class='far fa-trash-alt'></i></button>";
                                    registrosHtml += "</td>";
                                    registrosHtml += "</tr>";
                                }
                        }

                    // Verifica se tem algum registro para exibir na tela

                        if(registrosHtml.length > 0){
                            $("#table-pedido").show();
                            $("#div-alerta-pedido").hide();
                            TabelaRegistrosPedido.html(registrosHtml);
                        } else {
                            $("#table-pedido").hide();
                            $("#div-alerta-pedido").show();
                        }
                    

                })
        }

    // Função para Consultar os Registros de Produto

        function ConsultaRegistrosProduto(campo, parametros = {}){

            // Define as Variaveis

                var selectProduto = $(campo);
                var idProduto = selectProduto.attr("data-produto-id");
                var inputQuantidade = $("input[name='input-quantidade'][data-produto-id='"+idProduto+"']");
                var inputValorTotalProduto = $("input[name='input-valor-total-produto'][data-produto-id='"+idProduto+"']");

            // Limpa os Registros do Select

                selectProduto.empty();
            
            // Insere o Registro Padrão

                selectProduto.append($('<option>', {
                    value: 0,
                    text: "Selecione um Produto"
                }));

            // Pesquisar os Registros no banco de dados

                PesquisaRegistroBD(bancoDados, "Estoque").then((data)=>{
                    for(var i in data){
                        // Define as Variaveis
                            var registro = data[i];
                            var cod_situacao = registro.hasOwnProperty("cod_situacao") ? registro.cod_situacao : "-";

                        // Verifica se o registro está com a flag de Cadastrado
                            if(parseInt(cod_situacao) == 1){
                                selectProduto.append($('<option>', {
                                    value: registro.codigo,
                                    text: registro.produto,
                                    "data-valor-compra": registro.valor_compra,
                                    "data-valor-venda": registro.valor_venda,
                                    "data-quantidade": registro.quantidade,
                                }));
                            }
                    }
                    if(parametros.hasOwnProperty("cod_produto")){
                        selectProduto.val(parametros.cod_produto);
                    }
                    if(parametros.hasOwnProperty("quantidade")){
                        inputQuantidade.val(parametros.quantidade);
                    }
                    if(parametros.hasOwnProperty("valor_total_produto")){
                        inputValorTotalProduto.val(parametros.valor_total_produto);
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

    // Função para Calcular o Valor Total do Pedido

        function CalculaValorTotal(){

            // Define as Variaveis

                var inputValorTotal = $("input[name='input-valor-total']");
                var valorTotal = 0;

            // Faz um laço de repetição para calcular o valor de todos os produtos lançados

                for(var i in $("div[id='div-produto']")){

                    if(i == "length"){
                        break;
                    }

                    var divProduto = $($("div[id='div-produto']")[i]);

                    var inputValorTotalProduto = divProduto.find("input[name='input-valor-total-produto']");
                    
                    valorTotal += parseFloat(inputValorTotalProduto.val() == "" ? 0 : inputValorTotalProduto.val());
                    
                }

            // Seta o Valor do Total do Pedido

                inputValorTotal.val(valorTotal.toLocaleString().replace(/[.]/g, ","));
        }

//------------------------------------
// Processos com jQuery
//------------------------------------

jQuery(document).ready(($)=>{

    // Executa os processos ao finalizar o carregamento da pagina

        $(document).ready(()=>{
            criaBancoDados(EstruturaBD).then((data)=>{
                bancoDados = data;
                $("input[name='input-mesa']").mask('000.000.000.000.000', {reverse: true})
                $("input[name='input-valor-total']").mask('000.000.000.000.000,00', {reverse: true})
                $("input[name='input-valor-pago']").mask('000.000.000.000.000,00', {reverse: true})
                $("input[name='input-valor-troco']").mask('000.000.000.000.000,00', {reverse: true})
                ConsultaRegistrosProduto();
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

    // Valida o Campo Dinâmico de Produto do Pedido

        $(document).on('change', 'select[name="select-produto"]', (evento)=>{

            // Define as Variaveis

                var idInput = evento.currentTarget.id;
                var selectProduto = $(evento.currentTarget);
                var idProduto = selectProduto.attr("data-produto-id");
                var mensagemValida = selectProduto.attr("data-mensagem-valido");
                var mensagemInvalida = selectProduto.attr("data-mensagem-invalido");

                var divMensagem = $("#"+idInput+"-div-mensagem[data-produto-id='"+idProduto+"']");

            // Remover a Classe e Limpar a Mensagem da divMensagem

                divMensagem.html("");
                divMensagem.removeClass("invalid-feedback");
                divMensagem.removeClass("valid-feedback");

            // Remove as Classes de Validação do Campo

                selectProduto.removeClass("is-invalid");
                selectProduto.removeClass("is-valid");

            // Define as Regras de Validação

                var validacao = [];
                    validacao[0] = selectProduto.val() != undefined;
                    validacao[1] = selectProduto.val() != null;
                    validacao[2] = parseInt(selectProduto.val()) > 0;

                var checaValidacao = validacao[0] && validacao[1] && validacao[2];

            // Zera a Quantidade do Produto
  
                $("input[name='input-quantidade'][data-produto-id='"+idProduto+"']").val("");

            // Realiza a condição das validações para tratar o campo

                if(checaValidacao){
                    divMensagem.html(mensagemValida);
                    divMensagem.addClass("valid-feedback");
                    selectProduto.addClass("is-valid");
                } else {
                    divMensagem.html(mensagemInvalida);
                    divMensagem.addClass("invalid-feedback");
                    selectProduto.addClass("is-invalid");
                }

        })

    // Valida o Campo Dinâmico de Quantidade do Produto do Pedido

        $(document).on('keyup', 'input[name="input-quantidade"]', (evento)=>{

            // Define as Variaveis

                var idInput = evento.currentTarget.id;
                var inputQuantidade = $(evento.currentTarget);
                var idProduto = inputQuantidade.attr("data-produto-id");
                var mensagemValida = inputQuantidade.attr("data-mensagem-valido");
                var mensagemInvalida = inputQuantidade.attr("data-mensagem-invalido");

                var divMensagem = $("#"+idInput+"-div-mensagem[data-produto-id='"+idProduto+"']");

                var optionProduto = $("select[name='select-produto'][data-produto-id='"+idProduto+"'] option:selected");
                var valorProduto = parseFloat(optionProduto.attr("data-valor-venda").replace(/[.]/g, "").replace(/[,]/g, "."));
                var quantidadeMaximaProduto = parseInt(optionProduto.attr("data-quantidade").replace(/[,]/g, "."));

                var inputValorTotalProduto = $("input[name='input-valor-total-produto'][data-produto-id='"+idProduto+"']");

                var valorTotal = (valorProduto*parseInt(inputQuantidade.val().replace(/[.]/g, "")));

            // Remover a Classe e Limpar a Mensagem da divMensagem

                divMensagem.html("");
                divMensagem.removeClass("invalid-feedback");
                divMensagem.removeClass("valid-feedback");

            // Remove as Classes de Validação do Campo

                inputQuantidade.removeClass("is-invalid");
                inputQuantidade.removeClass("is-valid");

            // Define as Regras de Validação

                var validacao = [];
                    validacao[0] = inputQuantidade.val() != undefined;
                    validacao[1] = inputQuantidade.val() != null;
                    validacao[2] = parseInt(inputQuantidade.val().replace(/[.]/g, "")) > 0;
                    validacao[3] = inputQuantidade.val() == "" ? false : parseInt(inputQuantidade.val().replace(/[.]/g, "")) <= quantidadeMaximaProduto;

                var checaValidacao = validacao[0] && validacao[1] && validacao[2] && validacao[3];

            // Realiza a condição das validações para tratar o campo

                if(checaValidacao){
                    inputValorTotalProduto.val(valorTotal);
                    divMensagem.html(mensagemValida);
                    divMensagem.addClass("valid-feedback");
                    inputQuantidade.addClass("is-valid");
                } else {
                    inputValorTotalProduto.val(0);
                    divMensagem.html(mensagemInvalida);
                    divMensagem.addClass("invalid-feedback");
                    inputQuantidade.addClass("is-invalid");
                }

        })

    // Executa o Calculo do Valor Total do Pedido ao Sair do Campo quantidade

        $(document).on('blur', 'input[name="input-quantidade"]', (evento)=>{
            CalculaValorTotal();
        })

    // Valida o Campo de Valor Pago do Pedido

        $(document).on('keyup', 'input[name="input-valor-pago"]', (evento)=>{

            // Define as Variaveis

                var idInput = evento.currentTarget.id;
                var inputValorPago = $(evento.currentTarget);
                var inputValorTotal = $("input[name='input-valor-total']");
                var inputValorTroco = $("input[name='input-valor-troco']");
                var mensagemValida = inputValorPago.attr("data-mensagem-valido");
                var mensagemInvalida = inputValorPago.attr("data-mensagem-invalido");

                var divMensagem = $("#"+idInput+"-div-mensagem");

            // Remover a Classe e Limpar a Mensagem da divMensagem

                divMensagem.html("");
                divMensagem.removeClass("invalid-feedback");
                divMensagem.removeClass("valid-feedback");

            // Remove as Classes de Validação do Campo

                inputValorPago.removeClass("is-invalid");
                inputValorPago.removeClass("is-valid");

            // Define as Regras de Validação

                var validacao = [];
                    validacao[0] = inputValorPago.val() != undefined;
                    validacao[1] = inputValorPago.val() != null;
                    validacao[2] = parseFloat(inputValorPago.val().replace(/[.]/g, "").replace(/[,]/g, ".")) > 0;
                    validacao[3] = parseFloat(inputValorPago.val().replace(/[.]/g, "").replace(/[,]/g, ".")) >= parseFloat(inputValorTotal.val().replace(/[.]/g, "").replace(/[,]/g, "."));

                var checaValidacao = validacao[0] && validacao[1] && validacao[2] && validacao[3];

            // Realiza a condição das validações para tratar o campo

                if(checaValidacao){
                    divMensagem.html(mensagemValida);
                    divMensagem.addClass("valid-feedback");
                    inputValorPago.addClass("is-valid");
                } else {
                    divMensagem.html(mensagemInvalida);
                    divMensagem.addClass("invalid-feedback");
                    inputValorPago.addClass("is-invalid");
                }

        })

    // Desativa o Submit do Formulário realizando os processos de cadasrtro e alteração conforme a funcionalidade ativa

        $("form[name='form-pedido']").submit((evento)=>{
            if($("button[name='button-crud'][data-funcao='cadastrar']").is(":visible")){
                $("button[name='button-crud'][data-funcao='cadastrar']").trigger("click")
            } else if($("button[name='button-crud'][data-funcao='alterar']").is(":visible")){
                $("button[name='button-crud'][data-funcao='alterar']").trigger("click")
            }
            evento.preventDefault();
        })

    // Controla as Funcionalidades de Alterar e Incluir Registro

        $(document).on('click', 'button[name="button-crud"]', (evento)=>{
            
            // Define as Variaveis

                var botaoCrud = $(evento.currentTarget);
                var funcao = botaoCrud.attr("data-funcao");

            // Checar qual função será executada

                switch(funcao){
                    case "cadastrar": case "alterar":

                        // Define a variavel do Formulario

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
                                produtos: [],
                                quantidades: [],
                                valor_total_produto: [],
                            }
        
                        // Limpar as Classes de Validação do Formulário

                            form.mesa.input.removeClass("is-invalid");
                            form.mesa.input.removeClass("is-valid");
        
                            form.valor_total.input.removeClass("is-invalid");
                            form.valor_total.input.removeClass("is-valid");

                            form.valor_pago.input.removeClass("is-invalid");
                            form.valor_pago.input.removeClass("is-valid");

                            form.valor_troco.input.removeClass("is-invalid");
                            form.valor_troco.input.removeClass("is-valid");
        
                        // Estrutura a Validação dos Campos
        
                            var validacao = [];
                                validacao[0] = form.mesa.input.val() != undefined && form.mesa.input.val() != null && parseInt(form.mesa.input.val()) > 0;
                                validacao[1] = (funcao == "alterar" ? (form.codigo.input.val() != undefined && parseInt(form.codigo.input.val()) > 0) : true);
                        
                        // Estrutura a Validação dos Campos Dinâmicos

                            var validacaoDinamicaProdutos = [];
                            var validacaoDinamicaQuantidade = [];

                        // Pega todos os Campos de Produto e Quantidade e Insere no form

                            for(var i in $("div[id='div-produto']")){

                                if(i == "length"){
                                    break;
                                }

                                var divProduto = $($("div[id='div-produto']")[i]);

                                var selectProduto = divProduto.find("select[name='select-produto']");
                                var divMensagemProduto = divProduto.find("#select-produto-div-mensagem");
                                var selectProdutoMensagemValida = selectProduto.attr("data-mensagem-valido");
                                var selectProdutoMensagemInvalida = selectProduto.attr("data-mensagem-invalido");

                                var inputQuantidade = divProduto.find("input[name='input-quantidade']");
                                var divMensagemQuantidade = divProduto.find("#input-quantidade-div-mensagem");
                                var inputQuantidadeMensagemValida = inputQuantidade.attr("data-mensagem-valido");
                                var inputQuantidadeMensagemInvalida = inputQuantidade.attr("data-mensagem-invalido");
                                
                                var inputValorTotalProduto = divProduto.find("input[name='input-valor-total-produto']");

                                var objetoProduto = {
                                    input: selectProduto,
                                    option: selectProduto.find("option:selected"),
                                    divMensagem: divMensagemProduto,
                                    mensagemValida: selectProdutoMensagemValida,
                                    mensagemInvalida: selectProdutoMensagemInvalida
                                }

                                var objetoQuantidade = {
                                    input: inputQuantidade,
                                    divMensagem: divMensagemQuantidade,
                                    mensagemValida: inputQuantidadeMensagemValida,
                                    mensagemInvalida: inputQuantidadeMensagemInvalida
                                }

                                var objetoValorTotalProduto = {
                                    input: inputValorTotalProduto
                                }

                                form.produtos.push(objetoProduto);
                                form.quantidades.push(objetoQuantidade);
                                form.valor_total_produto.push(objetoValorTotalProduto);

                                var validacaoProduto = objetoProduto.input.val() != undefined && objetoProduto.input.val() != null && parseInt(objetoProduto.input.val()) > 0;
                                validacaoDinamicaProdutos.push(validacaoProduto)

                                var validacaoQuantidade = objetoQuantidade.input.val() != undefined && objetoQuantidade.input.val() != null && parseInt(objetoQuantidade.input.val()) > 0;
                                validacaoDinamicaQuantidade.push(validacaoQuantidade)
                                
                            }

                        // Cria um Laço de Repetição para Checar todas as Validações

                            var checaValidacao = validacao[0] && validacao[1];

                            for(var i in validacaoDinamicaProdutos){
                                checaValidacao = checaValidacao && validacaoDinamicaProdutos[i];
                            }

                            for(var i in validacaoDinamicaQuantidade){
                                checaValidacao = checaValidacao && validacaoDinamicaQuantidade[i];
                            }
        
                        // Realiza a Validação dos Campos para Prosseguir com a Função a ser executada
        
                            if(checaValidacao){
                                
                                // Verifica qual funcao será realizada

                                    if(funcao == "cadastrar"){

                                        // Define o Objeto Produtos a ser inserido no banco de dados

                                            var objetoProdutos = [];

                                        // Realiza um laço de repetição para criar a Estrutura Dinamica nos Dados

                                            for(var i in form.produtos){
                                                var registroProduto = form.produtos[i];
                                                var registroQuantidade = form.quantidades[i];
                                                var registroValorTotalProduto = form.valor_total_produto[i];
                                                
                                                objetoProdutos.push({
                                                    cod_produto: registroProduto.input.val(),
                                                    produto: registroProduto.option.text(),
                                                    quantidade: registroQuantidade.input.val(),
                                                    valor_total_produto: registroValorTotalProduto.input.val()
                                                });
                                            }
        
                                        // Cria a Estrutura dos Dados a Serem Inseridos ou Alterados
                
                                            var dados = {
                                                mesa: form.mesa.input.val(),
                                                valor_total: form.valor_total.input.val(),
                                                valor_pago: form.valor_pago.input.val(),
                                                valor_troco: form.valor_troco.input.val(),
                                                data_cadastro: (new Date).toLocaleDateString(),
                                                horario_cadastro: (new Date).toLocaleTimeString(),
                                                produtos: objetoProdutos,
                                                cod_status: 1,
                                                status: "Pedido Realizado",
                                                cod_situacao: 1
                                            }

                                        // Registros Inseridos com Sucesso

                                            insereRegistroBD("Pedidos", bancoDados, [dados]).then((data)=>{
                                                Promise.all(data).then((data2)=>{
                                                    Swal.fire({
                                                        icon: 'success',
                                                        title: 'Sucesso',
                                                        text: 'Pedido cadastrado com sucesso.',
                                                        allowOutsideClick: false
                                                    }).then((data)=>{
                                                        // Limpa os Campos do Formulário
                                                            form.mesa.input.val("");
                                                            form.valor_total.input.val("");
                                                            form.valor_pago.input.val("");
                                                            form.valor_troco.input.val("");
                                                        // Limpa os Campos Dinâmicos
                                                            $("#div-pedido-produtos").html("");
                                                        // Zera o Contador do Botão de Adidicionar Produtos
                                                            $("button[name='button-adicionar-produto']").attr("data-total-produtos", 0);
                                                        // Consultar todos os Registros no Banco de Dados
                                                            ConsultaRegistrosPedido();
                                                    })

                                                });
                                            });
                                    } else if(funcao == "alterar"){

                                        // Define o Objeto Produtos a ser inserido no banco de dados

                                            var objetoProdutos = [];

                                        // Realiza um laço de repetição para criar a Estrutura Dinamica nos Dados

                                            for(var i in form.produtos){
                                                var registroProduto = form.produtos[i];
                                                var registroQuantidade = form.quantidades[i];
                                                var registroValorTotalProduto = form.valor_total_produto[i];
                                                
                                                objetoProdutos.push({
                                                    cod_produto: registroProduto.input.val(),
                                                    produto: registroProduto.option.text(),
                                                    quantidade: registroQuantidade.input.val(),
                                                    valor_total_produto: registroValorTotalProduto.input.val()
                                                });
                                            }
        
                                        // Cria a Estrutura dos Dados a Serem Inseridos ou Alterados
                
                                            var dados = {
                                                mesa: form.mesa.input.val(),
                                                valor_total: form.valor_total.input.val(),
                                                valor_pago: form.valor_pago.input.val(),
                                                valor_troco: form.valor_troco.input.val(),
                                                data_atualizacao: (new Date).toLocaleDateString(),
                                                horario_atualizacao: (new Date).toLocaleTimeString(),
                                                produtos: objetoProdutos
                                            }

                                        // Altera o Registro no banco de dados

                                            atualizaRegistroBD(bancoDados, "Pedidos", parseInt(form.codigo.input.val()), dados).then((data)=>{
                                                Swal.fire({
                                                    icon: 'success',
                                                    title: 'Sucesso',
                                                    text: 'Pedido alterado com sucesso.',
                                                    allowOutsideClick: false
                                                }).then((data)=>{
                                                    // Limpa os Campos do Formulário
                                                        form.mesa.input.val("");
                                                        form.valor_total.input.val("");
                                                        form.valor_pago.input.val("");
                                                        form.valor_troco.input.val("");
                                                    // Limpa os Campos Dinâmicos
                                                        $("#div-pedido-produtos").html("");
                                                    // Zera o Contador do Botão de Adidicionar Produtos
                                                        $("button[name='button-adicionar-produto']").attr("data-total-produtos", 0);
                                                    // Consultar todos os Registros no Banco de Dados
                                                        ConsultaRegistrosPedido();
                                                    // Troca o Botão Alterar pelo Cadastrar
                                                        $("button[name='button-crud'][data-funcao='alterar']").hide();
                                                        $("button[name='button-crud'][data-funcao='cadastrar']").show();
                                                })
                                            });
                                    }
        
                            } else {
        
                                // Checa quais Campos serão notificados com erro
        
                                    if(!validacao[0]){
                                        form.mesa.divMensagem.html(form.mesa.mensagemInvalida);
                                        form.mesa.divMensagem.addClass("invalid-feedback");
                                        form.mesa.input.addClass("is-invalid");
                                    } else {
                                        form.mesa.divMensagem.html(form.mesa.mensagemValida);
                                        form.mesa.divMensagem.addClass("valid-feedback");
                                        form.mesa.input.addClass("is-valid");
                                    }
                                
                                // Checa quais Campos Dinamicos de Produtos serão notificados com erro

                                    for(var i in validacaoDinamicaProdutos){
                                        var formProduto = form.produtos[i];
                                        if(!validacaoDinamicaProdutos[i]){
                                            formProduto.divMensagem.html(formProduto.mensagemInvalida);
                                            formProduto.divMensagem.addClass("invalid-feedback");
                                            formProduto.input.addClass("is-invalid");
                                        } else {
                                            formProduto.divMensagem.html(formProduto.mensagemValida);
                                            formProduto.divMensagem.addClass("valid-feedback");
                                            formProduto.input.addClass("is-valid");
                                        }
                                    }
                                
                                // Checa quais Campos Dinamicos de Quantidade serão notificados com erro

                                    for(var i in validacaoDinamicaQuantidade){
                                        var formQuantidade = form.quantidades[i];
                                        if(!validacaoDinamicaQuantidade[i]){
                                            formQuantidade.divMensagem.html(formQuantidade.mensagemInvalida);
                                            formQuantidade.divMensagem.addClass("invalid-feedback");
                                            formQuantidade.input.addClass("is-invalid");
                                        } else {
                                            formQuantidade.divMensagem.html(formQuantidade.mensagemValida);
                                            formQuantidade.divMensagem.addClass("valid-feedback");
                                            formQuantidade.input.addClass("is-valid");
                                        }
                                    }
                            }
                        break;
                    case "selecionar":
                        var dados = JSON.parse(botaoCrud.attr("data-registro-dados"));
                        selecionaRegistroPedido(dados);
                        break;
                    case "excluir":
                        var dados = JSON.parse(botaoCrud.attr("data-registro-dados"));
                        excluirRegistroPedido(dados, false);
                        break;
                }

        })

})