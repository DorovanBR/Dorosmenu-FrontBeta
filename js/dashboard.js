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
                                            cor_fundo: " bg-danger",
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
                                    registrosHtml += "<li class='list-group-item'>Ultima Atualização: "+data_atualizacao+" "+horario_atualizacao+"</li>";
                                    registrosHtml += "<li class='list-group-item text-right'>";
                                    registrosHtml += "<button type='button' class='btn btn-secondary' name='button-pedido' id='button-pedido' data-registro-dados='"+JSON.stringify(registro)+"' data-toggle='modal' data-target='#modal-informacao-pedido' data-funcao='informacao'><i class='fas fa-receipt'></i></button>";
                                    registrosHtml += "<button type='button' class='btn btn-primary' name='button-pedido' id='button-pedido' data-registro-dados='"+JSON.stringify(registro)+"' data-toggle='modal' data-target='#modal-alterar-status-pedido' data-funcao='alterar-status'><i class='fas fa-undo-alt'></i></button>";
                                    registrosHtml += "<button type='button' class='btn btn-success' name='button-pedido' id='button-pedido' data-registro-dados='"+JSON.stringify(registro)+"' data-toggle='modal' data-target='#modal-informacao-pedido' data-funcao='pagar'><i class='fas fa-hand-holding-usd'></i></button>";
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

        function selecionaRegistroPedido(dados, exibirCamposPagamento = false){

            // Define as Variaveis

                var tabelaPedidosProdutosRegistros = $("#table-pedido-produto-registros");
                var strongPedido = $("#strong-pedido");
                var strongStatus = $("#strong-status");
                var strongMesa = $("#strong-mesa");
                var strongDaraHorarioCadastro = $("#strong-data-horario-cadastro");
                var strongDaraHorarioAtualizacao = $("#strong-data-horario-atualizacao");

            // Preenche os Dados de Controle do Pedido

                strongPedido.html(dados.codigo);
                strongMesa.html(dados.mesa);
                strongStatus.html(dados.status);
                strongDaraHorarioCadastro.html(dados.data_cadastro + " " + dados.horario_cadastro);

            // Verifica se existe os campos de Data e Horario de Atualização do Pedido

                if(dados.hasOwnProperty("data_atualizacao") && dados.hasOwnProperty("horario_atualizacao")){
                    strongDaraHorarioAtualizacao.html(dados.data_atualizacao + " " + dados.horario_atualizacao);
                } else {
                    strongDaraHorarioAtualizacao.html("-");
                }

            // Limpar os registros da Tabela

                tabelaPedidosProdutosRegistros.html("");

            // Cria um Laço de Repetição para Exibir os Produtos do Pedido

                for(var i in dados.produtos){
                    var registro = dados.produtos[i];

                    var rowsProdutosPedido = "<tr>";
                        rowsProdutosPedido += "<td>"+registro.produto+"</td>";
                        rowsProdutosPedido += "<td>"+registro.quantidade+"</td>";
                        rowsProdutosPedido += "<td class='text-right' data-mask='000.000.000.000,00' data-mask-reverse='true'>"+parseFloat(registro.valor_total_produto).toFixed(2).replace(/[.]/g, ",")+"</td>";
                        rowsProdutosPedido += "</tr>";

                    tabelaPedidosProdutosRegistros.append(rowsProdutosPedido);

                }

            // Verifica se irá Listar o Controle de Pagamento
                
                if(exibirCamposPagamento){
                    // Lista o Campo de Valor Total
                        var rowsProdutosPedido = "<tr>";
                            rowsProdutosPedido += "<th></th>";
                            rowsProdutosPedido += "<th></th>";
                            rowsProdutosPedido += "<th>";
                            rowsProdutosPedido += "<div class='form-floating'>";
                            rowsProdutosPedido += "<input type='text' class='form-control' name='input-valor-total' id='input-valor-total' placeholder='Entre com o Valor Total' data-mensagem-valido='Sucesso!' data-mensagem-invalido='Valor Total inválido, tente novamente!' readonly>";
                            rowsProdutosPedido += "<label for='input-valor-total'>Total (R$)</label>";
                            rowsProdutosPedido += "<div id='input-valor-total-div-mensagem'></div>";
                            rowsProdutosPedido += "</div>";
                            rowsProdutosPedido += "</th>";
                            rowsProdutosPedido += "</tr>";

                        tabelaPedidosProdutosRegistros.append(rowsProdutosPedido);
                    // Lista o Campo de Pagamento
                        var rowsProdutosPedido = "<tr>";
                            rowsProdutosPedido += "<th></th>";
                            rowsProdutosPedido += "<th></th>";
                            rowsProdutosPedido += "<th>";
                            rowsProdutosPedido += "<div class='form-floating'>";
                            rowsProdutosPedido += "<input type='text' class='form-control' name='input-valor-pago' id='input-valor-pago' placeholder='Entre com o Valor Pago' data-mensagem-valido='Sucesso!' data-mensagem-invalido='Valor Pago inválido, tente novamente!' required>";
                            rowsProdutosPedido += "<label for='input-valor-pago'>Pago (R$)</label>";
                            rowsProdutosPedido += "<div id='input-valor-pago-div-mensagem'></div>";
                            rowsProdutosPedido += "</div>";
                            rowsProdutosPedido += "</th>";
                            rowsProdutosPedido += "</tr>";

                        tabelaPedidosProdutosRegistros.append(rowsProdutosPedido);
                    // Lista o Campo de Troco
                        var rowsProdutosPedido = "<tr>";
                            rowsProdutosPedido += "<th></th>";
                            rowsProdutosPedido += "<th></th>";
                            rowsProdutosPedido += "<th>";
                            rowsProdutosPedido += "<div class='form-floating'>";
                            rowsProdutosPedido += "<input type='text' class='form-control' name='input-valor-troco' id='input-valor-troco' placeholder='Entre com o Valor do Troco' data-mensagem-valido='Sucesso!' data-mensagem-invalido='Valor do Troco inválido, tente novamente!' readonly>";
                            rowsProdutosPedido += "<label for='input-valor-troco'>Troco (R$)</label>";
                            rowsProdutosPedido += "<div id='input-valor-troco-div-mensagem'></div>";
                            rowsProdutosPedido += "</div>";
                            rowsProdutosPedido += "</th>";
                            rowsProdutosPedido += "</tr>";

                        tabelaPedidosProdutosRegistros.append(rowsProdutosPedido);
                    // Lista o Botão para Lançar o Pagamento
                        var rowsProdutosPedido = "<tr>";
                            rowsProdutosPedido += "<th></th>";
                            rowsProdutosPedido += "<th></th>";
                            rowsProdutosPedido += "<th><button type='button' class='btn btn-success w-100' name='button-pagar' id='button-pagar' data-registro-dados='"+JSON.stringify(dados)+"'>Pagar</button></th>";
                            rowsProdutosPedido += "</tr>";

                        tabelaPedidosProdutosRegistros.append(rowsProdutosPedido);
                    // Aplica as Mascaras
                        $("input[name='input-valor-total']").mask('000.000.000.000.000,00', {reverse: true});
                        $("input[name='input-valor-pago']").mask('000.000.000.000.000,00', {reverse: true});
                        $("input[name='input-valor-troco']").mask('000.000.000.000.000,00', {reverse: true});
                    // Aplica os Valores dos Campos
                        $("input[name='input-valor-total']").val(dados.valor_total);
                        $("input[name='input-valor-pago']").val(dados.valor_pago);
                        $("input[name='input-valor-troco']").val(dados.valor_troco);
                } else {
                    // Lista o Total do Pedido na Tela
                        var rowsProdutosPedido = "<tr>";
                            rowsProdutosPedido += "<th></th>";
                            rowsProdutosPedido += "<th>Total (R$)</th>";
                            rowsProdutosPedido += "<th class='text-right' data-mask='000.000.000.000,00' data-mask-reverse='true'>"+dados.valor_total+"</th>";
                            rowsProdutosPedido += "</tr>";

                        tabelaPedidosProdutosRegistros.append(rowsProdutosPedido);
                    // Verifica se será exibido ou não o campo de Valor Pago
                        if(dados.valor_pago != ""){
                            // Lista o Valor Pago do Pedido na Tela
                                var rowsProdutosPedido = "<tr class='text-success'>";
                                    rowsProdutosPedido += "<th></th>";
                                    rowsProdutosPedido += "<th>Pago (R$)</th>";
                                    rowsProdutosPedido += "<th class='text-right' data-mask='000.000.000.000,00' data-mask-reverse='true'>"+dados.valor_pago+"</th>";
                                    rowsProdutosPedido += "</tr>";
        
                                tabelaPedidosProdutosRegistros.append(rowsProdutosPedido);
                        }
                    // Verifica se será exibido ou não o campo de Valor do Troco
                        if(dados.valor_troco != ""){
                            // Lista o Valor do Troco do Pedido na Tela
                                var rowsProdutosPedido = "<tr class='text-primary'>";
                                    rowsProdutosPedido += "<th></th>";
                                    rowsProdutosPedido += "<th>Troco (R$)</th>";
                                    rowsProdutosPedido += "<th class='text-right' data-mask='000.000.000.000,00' data-mask-reverse='true'>"+dados.valor_troco+"</th>";
                                    rowsProdutosPedido += "</tr>";

                                tabelaPedidosProdutosRegistros.append(rowsProdutosPedido);
                        }
                }

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
    
    // Função para Atualizar os Cards do Dashboard

        function AtualizaCardsDashboard(){

            return new Promise((resovle, reject)=>{
                // Define as Variaveis
    
                    var divCardPedidoRealizado = $("#div-card-status-1");
                    var divCardPedidoEmPreparo = $("#div-card-status-2");
                    var divCardPedidoAguardandoAtendente = $("#div-card-status-3");
                    var divCardPedidoFinalizado = $("#div-card-status-4");
    
                    var totalCardPedidoRealizado = 0;
                    var totalCardPedidoEmPreparo = 0;
                    var totalCardPedidoAguardandoAtendente = 0;
                    var totalCardPedidoFinalizado = 0;
    
                // Limpa os Registros da Tabela
    
                    divCardPedidoRealizado.html("");
                    divCardPedidoEmPreparo.html("");
                    divCardPedidoAguardandoAtendente.html("");
                    divCardPedidoFinalizado.html("");
    
                // Pesquisar os Registros no banco de dados
                    PesquisaRegistroBD(bancoDados, "Pedidos").then((data)=>{
                        // Define as Variaveis
                            var registrosHtml = ""
    
                        // Faz um laço de repetição para adicionar os registros em formato HTML
                            for(var i in data){
                                // Define as Variaveis
                                    var registro = data[i];
                                    var cod_status = registro.hasOwnProperty("cod_status") ? registro.cod_status : "-";
                                    var cod_situacao = registro.hasOwnProperty("cod_situacao") ? registro.cod_situacao : "-";
                                
                                // Verifica se o registro está com a flag de Cadastrado
                                    if(parseInt(cod_situacao) == 1){
                                        // Verifica Qual será o estilo do Card
                                            switch(parseInt(cod_status)){
                                                case 1:
                                                    totalCardPedidoRealizado++;
                                                    break;
                                                case 2:
                                                    totalCardPedidoEmPreparo++;
                                                    break;
                                                case 3:
                                                    totalCardPedidoAguardandoAtendente++;
                                                    break;
                                                case 4:
                                                    totalCardPedidoFinalizado++;
                                                    break;
                                            }
                                    }
                            }
    
                        // Atualiza os Valores dos Cards
                            divCardPedidoRealizado.html(totalCardPedidoRealizado);
                            divCardPedidoEmPreparo.html(totalCardPedidoEmPreparo);
                            divCardPedidoAguardandoAtendente.html(totalCardPedidoAguardandoAtendente);
                            divCardPedidoFinalizado.html(totalCardPedidoFinalizado);

                        // Retorna o Resolve
                            resovle({
                                Pedidos:{
                                    Realizados: totalCardPedidoRealizado,
                                    EmPreparo: totalCardPedidoEmPreparo,
                                    AguardandoAtendente: totalCardPedidoAguardandoAtendente,
                                    Finalizados: totalCardPedidoFinalizado
                                }
                            });
    
                    })
            })

        }


//------------------------------------
// Processos com jQuery
//------------------------------------

jQuery(document).ready(($)=>{

    // Executa os processos ao finalizar o carregamento da pagina

        $(document).ready(()=>{
            criaBancoDados(EstruturaBD).then((data)=>{
                bancoDados = data;
                AtualizaCardsDashboard().then((data)=>{
                    ConsultaRegistrosPedido();
                })
            })
        })

    // Executa o Processo de Exibir os Dados na Modal de Informações do Pedido

        $(document).on('click', 'button[name="button-pedido"]', (evento)=>{
            // Define as Variaveis
                var botaoPedido = $(evento.currentTarget);
                var funcao = botaoPedido.attr("data-funcao");
                var dadosPedido = JSON.parse(botaoPedido.attr("data-registro-dados"));
            // Cria um Switch para identificar qual funcionalidade será executada
                switch(funcao){
                    case "informacao":
                        // Alterar o Titulo da Modal
                            $("#modal-informacao-pedido").find(".modal-title").html("<strong>Informações do Pedido</strong>");
                        // Seleciona o Registro que será renderizado na Modal
                            selecionaRegistroPedido(dadosPedido);
                        break;
                    case "alterar-status":
                        // Ativa todos os botões
                            $('button[name="button-alterar-status"][data-alterar-status="1"]').prop("disabled", false);
                            $('button[name="button-alterar-status"][data-alterar-status="2"]').prop("disabled", false);
                            $('button[name="button-alterar-status"][data-alterar-status="3"]').prop("disabled", false);
                            $('button[name="button-alterar-status"][data-alterar-status="4"]').prop("disabled", false);
                        // Desativa o Botão Atual
                            $('button[name="button-alterar-status"][data-alterar-status="'+dadosPedido.cod_status+'"]').prop("disabled", true);
                        // Aplica os Dados no Dataset dos botões
                            $('button[name="button-alterar-status"][data-alterar-status="1"]').attr("data-registro-dados", JSON.stringify(dadosPedido));
                            $('button[name="button-alterar-status"][data-alterar-status="2"]').attr("data-registro-dados", JSON.stringify(dadosPedido));
                            $('button[name="button-alterar-status"][data-alterar-status="3"]').attr("data-registro-dados", JSON.stringify(dadosPedido));
                            $('button[name="button-alterar-status"][data-alterar-status="4"]').attr("data-registro-dados", JSON.stringify(dadosPedido));
                        break;
                    case "pagar":
                        // Alterar o Titulo da Modal
                            $("#modal-informacao-pedido").find(".modal-title").html("<strong>Informações do Pedido para Pagamento</strong>");
                        // Seleciona o Registro que será renderizado na Modal
                            selecionaRegistroPedido(dadosPedido, true);
                        break;
                }
        })

    // Executa o Processo de Exibir os Dados na Modal de Informações do Pedido

        $(document).on('click', 'button[name="button-alterar-status"]', (evento)=>{
            // Define as Variaveis
                var botaoPedido = $(evento.currentTarget);
                var alterarStatus = botaoPedido.attr("data-alterar-status");
                var status = botaoPedido.attr("data-status");
                var dadosPedido = JSON.parse(botaoPedido.attr("data-registro-dados"));
            // Cria a Estrutura dos Dados a Serem Inseridos ou Alterados
                var dados = {
                    cod_status: parseInt(alterarStatus),
                    status: status,
                    data_atualizacao: (new Date).toLocaleDateString(),
                    horario_atualizacao: (new Date).toLocaleTimeString()
                }
            // Altera o Registro no banco de dados
                atualizaRegistroBD(bancoDados, "Pedidos", parseInt(dadosPedido.codigo), dados).then((data)=>{
                    Swal.fire({
                        icon: 'success',
                        title: 'Sucesso',
                        text: 'Status do Pedido Alterado Com Sucesso.',
                        allowOutsideClick: false
                    }).then((data)=>{
                        // Fecha a Modal
                            $("#button-fecha-modal-status").trigger('click');
                        // Atualiza os Cards do Dashboard
                        AtualizaCardsDashboard().then((data)=>{
                            // Consultar todos os Registros no Banco de Dados
                                ConsultaRegistrosPedido();
                        })
                    })
                });
        })

    // Calcular o Valor Pago e Retornar o Troco

        $(document).on('keyup', 'input[name="input-valor-pago"]', (evento)=>{
            // Define as Variaveis 
                var idInput = evento.currentTarget.id;
                var inputValorPago = $(evento.currentTarget);
                var mensagemValida = inputValorPago.attr("data-mensagem-valido");
                var mensagemInvalida = inputValorPago.attr("data-mensagem-invalido");
                var divMensagem = $("#"+idInput+"-div-mensagem");

                var inputValorTotal = $("input[name='input-valor-total']");
                var inputValorTroco = $("input[name='input-valor-troco']");

            // Realiza a Validação
                var validacao = [];
                    validacao[0] = inputValorPago.val() != undefined;
                    validacao[1] = inputValorPago.val() != null;
                    validacao[2] = parseFloat((inputValorPago.val()).replace(/[.]/g, "").replace(/[,]/g, ".")) > 0;
                    validacao[3] = parseFloat((inputValorPago.val()).replace(/[.]/g, "").replace(/[,]/g, ".")) >= parseFloat((inputValorTotal.val()).replace(/[.]/g, "").replace(/[,]/g, "."));
                
                var checaValidacao = validacao[0] && validacao[1] && validacao[2] && validacao[3];

            // Remover a Classe e Limpar a Mensagem da divMensagem
                divMensagem.html("");
                divMensagem.removeClass("invalid-feedback");
                divMensagem.removeClass("valid-feedback");

            // Remove as Classes de Validação do Campo
                inputValorPago.removeClass("is-invalid");
                inputValorPago.removeClass("is-valid");

            // Aplica a Validação do Campo
                if(checaValidacao){
                    var valorTotal = parseFloat((inputValorPago.val()).replace(/[.]/g, "").replace(/[,]/g, "."))-parseFloat((inputValorTotal.val()).replace(/[.]/g, "").replace(/[,]/g, "."));
                    inputValorTroco.val(inputValorTroco.masked(valorTotal.toFixed(2).replace(/[.]/g, ",")));
                    divMensagem.html(mensagemValida);
                    divMensagem.addClass("valid-feedback");
                    inputValorPago.addClass("is-valid");
                } else {
                    inputValorTroco.val("");
                    divMensagem.html(mensagemInvalida);
                    divMensagem.addClass("invalid-feedback");
                    inputValorPago.addClass("is-invalid");
                }
        })

    // Executa o Processo de Exibir os Dados na Modal de Informações do Pedido

        $(document).on('click', 'button[name="button-pagar"]', (evento)=>{
            // Define as Variaveis
                var botaoPagar = $(evento.currentTarget);
                var status = botaoPagar.attr("data-status");
                var dadosPedido = JSON.parse(botaoPagar.attr("data-registro-dados"));
                var inputValorPago = $("input[name='input-valor-pago']");
                var inputValorTroco = $("input[name='input-valor-troco']");
            // Cria a Estrutura dos Dados a Serem Inseridos ou Alterados
                var dados = {
                    valor_pago: inputValorPago.val(),
                    valor_troco: inputValorTroco.val(),
                    data_atualizacao: (new Date).toLocaleDateString(),
                    horario_atualizacao: (new Date).toLocaleTimeString()
                }
            // Altera o Registro no banco de dados
                atualizaRegistroBD(bancoDados, "Pedidos", parseInt(dadosPedido.codigo), dados).then((data)=>{
                    Swal.fire({
                        icon: 'success',
                        title: 'Sucesso',
                        text: 'Pedido Pago Com Sucesso.',
                        allowOutsideClick: false
                    }).then((data)=>{
                        // Fecha a Modal
                            $("#button-fecha-modal-informacao").trigger('click');
                        // Consultar todos os Registros no Banco de Dados
                            ConsultaRegistrosPedido();
                    })
                });
        })

})