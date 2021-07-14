//------------------------------------
// Funções Customizadas
//------------------------------------

    // Função para Consultar os Registros de Estoque

        function ConsultaRegistrosEstoque(){

            // Define as Variaveis

                var TabelaRegistrosEstoque = $("#table-tbody-registrosEstoque");

            // Limpa os Registros da Tabela

                TabelaRegistrosEstoque.html("");

            // Pesquisar os Registros no banco de dados

                PesquisaRegistroBD(bancoDados, "Estoque").then((data)=>{
                    
                    // Define as Variaveis
                        
                        var registrosHtml = ""

                    // Faz um laço de repetição para adicionar os registros em formato HTML

                        for(var i in data){

                            // Define as Variaveis

                                var registro = data[i];
                                var codigo = registro.hasOwnProperty("codigo") ? registro.codigo : "-";
                                var produto = registro.hasOwnProperty("produto") ? registro.produto : "-";
                                var quantidade = registro.hasOwnProperty("quantidade") ? registro.quantidade : "-";
                                var valor_compra = registro.hasOwnProperty("valor_compra") ? registro.valor_compra : "-";
                                var valor_venda = registro.hasOwnProperty("valor_venda") ? registro.valor_venda : "-";
                                var data_cadastro = registro.hasOwnProperty("data_cadastro") ? registro.data_cadastro : "-";
                                var horario_cadastro = registro.hasOwnProperty("horario_cadastro") ? registro.horario_cadastro : "-";
                                var data_atualizacao = registro.hasOwnProperty("data_atualizacao") ? registro.data_atualizacao : "-";
                                var horario_atualizacao = registro.hasOwnProperty("horario_atualizacao") ? registro.horario_atualizacao : "-";
                                var cod_situacao = registro.hasOwnProperty("cod_situacao") ? registro.cod_situacao : "-";

                            // Verifica se o registro está com a flag de Cadastrado
                            
                                if(parseInt(cod_situacao) == 1){
                                    registrosHtml += "<tr>";
                                    registrosHtml += "<th class='text-center' scope='row'>"+codigo+"</th>";
                                    registrosHtml += "<td class='text-center'>"+produto+"</td>";
                                    registrosHtml += "<td class='text-center'>"+quantidade+"</td>";
                                    registrosHtml += "<td class='text-center'>"+valor_compra+"</td>";
                                    registrosHtml += "<td class='text-center'>"+valor_venda+"</td>";
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
                            $("#table-estoque").show();
                            $("#div-alerta-estoque").hide();
                            TabelaRegistrosEstoque.html(registrosHtml);
                        } else {
                            $("#table-estoque").hide();
                            $("#div-alerta-estoque").show();
                        }
                    

                })
        }

    // Função para Consultar os Registros de Produto

        function ConsultaRegistrosProduto(){

            // Define as Variaveis

                var selectProduto = $("select[name='select-produto']");

            // Limpa os Registros do Select

                selectProduto.empty();
            
            // Insere o Registro Padrão

                selectProduto.append($('<option>', {
                    value: 0,
                    text: "Selecione uma Produto"
                }));

            // Pesquisar os Registros no banco de dados

                PesquisaRegistroBD(bancoDados, "Produtos").then((data)=>{
                    for(var i in data){
                        var registro = data[i];

                        selectProduto.append($('<option>', {
                            value: registro.codigo,
                            text: registro.nome
                        }));
                    }
                })
        }

    // Função para Preencher os Dados no Formulario de Alteração

        function selecionaRegistroEstoque(dados){

            // Define as Variaveis

                var form = {
                    codigo: {
                        input: $("input[name='input-codigo']")
                    },
                    produto: {
                        input: $("select[name='select-produto']"),
                        divMensagem: $("#select-produto-div-mensagem"),
                        mensagemValida: $("select[name='select-produto']").attr("data-mensagem-valido"),
                        mensagemInvalida: $("select[name='select-produto']").attr("data-mensagem-invalido")
                    },
                    quantidade: {
                        input: $("input[name='input-quantidade']"),
                        divMensagem: $("#input-quantidade-div-mensagem"),
                        mensagemValida: $("input[name='input-quantidade']").attr("data-mensagem-valido"),
                        mensagemInvalida: $("input[name='input-quantidade']").attr("data-mensagem-invalido")
                    },
                    valor_compra: {
                        input: $("input[name='input-valor-compra']"),
                        divMensagem: $("#input-valor-compra-div-mensagem"),
                        mensagemValida: $("input[name='input-valor-compra']").attr("data-mensagem-valido"),
                        mensagemInvalida: $("input[name='input-valor-compra']").attr("data-mensagem-invalido")
                    },
                    valor_venda: {
                        input: $("input[name='input-valor-venda']"),
                        divMensagem: $("#input-valor-venda-div-mensagem"),
                        mensagemValida: $("input[name='input-valor-venda']").attr("data-mensagem-valido"),
                        mensagemInvalida: $("input[name='input-valor-venda']").attr("data-mensagem-invalido")
                    }
                }
            
            // Aplica o valor do Dado no Campo

                form.codigo.input.val(dados.codigo);
                form.produto.input.val(dados.cod_produto);
                form.quantidade.input.val(dados.quantidade);
                form.valor_compra.input.val(dados.valor_compra);
                form.valor_venda.input.val(dados.valor_venda);
            
            // Exibir o Botão de Alterar

                $("button[name='button-crud'][data-funcao='alterar']").show();
                $("button[name='button-crud'][data-funcao='cadastrar']").hide();
        }

    // Função para Excluir o Registro do Banco de Dados

        function excluirRegistroEstoque(dados, excluirDefinitivo){
            
            // Verifica se o registro será excluido do banco ou flegado como excluido

                if(excluirDefinitivo){
                    excluiRegistroBD(bancoDados, "Estoque", dados.codigo).then((data)=>{
                        Swal.fire({
                            icon: 'success',
                            title: 'Sucesso',
                            text: 'Estoque excluido com sucesso.',
                            allowOutsideClick: false
                        }).then((data)=>{
                            ConsultaRegistrosEstoque();
                        })
                    })
                } else {

                    var novosDados = {
                        cod_situacao: 2,
                        data_atualizacao: (new Date).toLocaleDateString(),
                        horario_atualizacao: (new Date).toLocaleTimeString()
                    };

                    atualizaRegistroBD(bancoDados, "Estoque", dados.codigo, novosDados).then((data)=>{
                        Swal.fire({
                            icon: 'success',
                            title: 'Sucesso',
                            text: 'Estoque excluido com sucesso.',
                            allowOutsideClick: false
                        }).then((data)=>{
                            // Consultar todos os Registros no Banco de Dados
                                ConsultaRegistrosEstoque();
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
                $("input[name='input-quantidade']").mask('000.000.000.000.000', {reverse: true})
                $("input[name='input-valor-compra']").mask('000.000.000.000.000,00', {reverse: true})
                $("input[name='input-valor-venda']").mask('000.000.000.000.000,00', {reverse: true})
                ConsultaRegistrosProduto();
                ConsultaRegistrosEstoque();
            })
        })

    // Valida o Campo de Produto do Estoque

        $(document).on('change', 'select[name="select-produto"]', (evento)=>{

            // Define as Variaveis

                var idInput = evento.currentTarget.id;
                var selectProduto = $(evento.currentTarget);
                var mensagemValida = selectProduto.attr("data-mensagem-valido");
                var mensagemInvalida = selectProduto.attr("data-mensagem-invalido");

                var divMensagem = $("#"+idInput+"-div-mensagem");

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

    // Valida o Campo de Quantidade do Produto do Estoque

        $(document).on('keyup', 'input[name="input-quantidade"]', (evento)=>{

            // Define as Variaveis

                var idInput = evento.currentTarget.id;
                var inputQuantidade = $(evento.currentTarget);
                var mensagemValida = inputQuantidade.attr("data-mensagem-valido");
                var mensagemInvalida = inputQuantidade.attr("data-mensagem-invalido");

                var divMensagem = $("#"+idInput+"-div-mensagem");

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

                var checaValidacao = validacao[0] && validacao[1] && validacao[2];

            // Realiza a condição das validações para tratar o campo

                if(checaValidacao){
                    divMensagem.html(mensagemValida);
                    divMensagem.addClass("valid-feedback");
                    inputQuantidade.addClass("is-valid");
                } else {
                    divMensagem.html(mensagemInvalida);
                    divMensagem.addClass("invalid-feedback");
                    inputQuantidade.addClass("is-invalid");
                }

        })

    // Valida o Campo de Valor de Compra do Produto do Estoque

        $(document).on('keyup', 'input[name="input-valor-compra"]', (evento)=>{

            // Define as Variaveis

                var idInput = evento.currentTarget.id;
                var inputValorCompra = $(evento.currentTarget);
                var mensagemValida = inputValorCompra.attr("data-mensagem-valido");
                var mensagemInvalida = inputValorCompra.attr("data-mensagem-invalido");

                var divMensagem = $("#"+idInput+"-div-mensagem");

            // Remover a Classe e Limpar a Mensagem da divMensagem

                divMensagem.html("");
                divMensagem.removeClass("invalid-feedback");
                divMensagem.removeClass("valid-feedback");

            // Remove as Classes de Validação do Campo

                inputValorCompra.removeClass("is-invalid");
                inputValorCompra.removeClass("is-valid");

            // Define as Regras de Validação

                var validacao = [];
                    validacao[0] = inputValorCompra.val() != undefined;
                    validacao[1] = inputValorCompra.val() != null;
                    validacao[2] = parseFloat(inputValorCompra.val().replace(/[.]/g, "").replace(/[,]/g, ".")) > 0;

                var checaValidacao = validacao[0] && validacao[1] && validacao[2];

            // Realiza a condição das validações para tratar o campo

                if(checaValidacao){
                    divMensagem.html(mensagemValida);
                    divMensagem.addClass("valid-feedback");
                    inputValorCompra.addClass("is-valid");
                } else {
                    divMensagem.html(mensagemInvalida);
                    divMensagem.addClass("invalid-feedback");
                    inputValorCompra.addClass("is-invalid");
                }

        })

    // Valida o Campo de Valor de Venda do Produto do Estoque

        $(document).on('keyup', 'input[name="input-valor-venda"]', (evento)=>{

            // Define as Variaveis

                var idInput = evento.currentTarget.id;
                var inputValorVenda = $(evento.currentTarget);
                var mensagemValida = inputValorVenda.attr("data-mensagem-valido");
                var mensagemInvalida = inputValorVenda.attr("data-mensagem-invalido");

                var divMensagem = $("#"+idInput+"-div-mensagem");

            // Remover a Classe e Limpar a Mensagem da divMensagem

                divMensagem.html("");
                divMensagem.removeClass("invalid-feedback");
                divMensagem.removeClass("valid-feedback");

            // Remove as Classes de Validação do Campo

                inputValorVenda.removeClass("is-invalid");
                inputValorVenda.removeClass("is-valid");

            // Define as Regras de Validação

                var validacao = [];
                    validacao[0] = inputValorVenda.val() != undefined;
                    validacao[1] = inputValorVenda.val() != null;
                    validacao[2] = parseFloat(inputValorVenda.val().replace(/[.]/g, "").replace(/[,]/g, ".")) > 0;

                var checaValidacao = validacao[0] && validacao[1] && validacao[2];

            // Realiza a condição das validações para tratar o campo

                if(checaValidacao){
                    divMensagem.html(mensagemValida);
                    divMensagem.addClass("valid-feedback");
                    inputValorVenda.addClass("is-valid");
                } else {
                    divMensagem.html(mensagemInvalida);
                    divMensagem.addClass("invalid-feedback");
                    inputValorVenda.addClass("is-invalid");
                }

        })

    // Desativa o Submit do Formulário realizando os processos de cadasrtro e alteração conforme a funcionalidade ativa

        $("form[name='form-estoque']").submit((evento)=>{
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
                                produto: {
                                    input: $("select[name='select-produto']"),
                                    option: $("select[name='select-produto'] option:selected"),
                                    divMensagem: $("#select-produto-div-mensagem"),
                                    mensagemValida: $("select[name='select-produto']").attr("data-mensagem-valido"),
                                    mensagemInvalida: $("select[name='select-produto']").attr("data-mensagem-invalido")
                                },
                                quantidade: {
                                    input: $("input[name='input-quantidade']"),
                                    divMensagem: $("#input-quantidade-div-mensagem"),
                                    mensagemValida: $("input[name='input-quantidade']").attr("data-mensagem-valido"),
                                    mensagemInvalida: $("input[name='input-quantidade']").attr("data-mensagem-invalido")
                                },
                                valor_compra: {
                                    input: $("input[name='input-valor-compra']"),
                                    divMensagem: $("#input-valor-compra-div-mensagem"),
                                    mensagemValida: $("input[name='input-valor-compra']").attr("data-mensagem-valido"),
                                    mensagemInvalida: $("input[name='input-valor-compra']").attr("data-mensagem-invalido")
                                },
                                valor_venda: {
                                    input: $("input[name='input-valor-venda']"),
                                    divMensagem: $("#input-valor-venda-div-mensagem"),
                                    mensagemValida: $("input[name='input-valor-venda']").attr("data-mensagem-valido"),
                                    mensagemInvalida: $("input[name='input-valor-venda']").attr("data-mensagem-invalido")
                                }
                            }
        
                        // Limpar as Classes de Validação do Formulário

                            form.produto.input.removeClass("is-invalid");
                            form.produto.input.removeClass("is-valid");
        
                            form.quantidade.input.removeClass("is-invalid");
                            form.quantidade.input.removeClass("is-valid");

                            form.valor_compra.input.removeClass("is-invalid");
                            form.valor_compra.input.removeClass("is-valid");

                            form.valor_venda.input.removeClass("is-invalid");
                            form.valor_venda.input.removeClass("is-valid");
        
                        // Estrutura a Validação dos Campos
        
                            var validacao = [];
                                validacao[0] = form.produto.input.val() != undefined && form.produto.input.val() != null && parseInt(form.produto.input.val()) > 0;
                                validacao[1] = form.quantidade.input.val() != undefined && form.quantidade.input.val() != null && parseInt(form.quantidade.input.val().replace(/[.]/g, "")) > 0;
                                validacao[2] = form.valor_compra.input.val() != undefined && form.valor_compra.input.val() != null && parseFloat(form.valor_compra.input.val().replace(/[.]/g, "").replace(/[,]/g, ".")) > 0;
                                validacao[3] = form.valor_venda.input.val() != undefined && form.valor_venda.input.val() != null && parseFloat(form.valor_venda.input.val().replace(/[.]/g, "").replace(/[,]/g, ".")) > 0;
                                validacao[4] = (funcao == "alterar" ? (form.codigo.input.val() != undefined && parseInt(form.codigo.input.val()) > 0) : true);
                            var checaValidacao = validacao[0] && validacao[1] && validacao[2] && validacao[3] && validacao[4];
        
                        // Realiza a Validação dos Campos para Prosseguir com a Função a ser executada
        
                            if(checaValidacao){
                                
                                // Verifica qual funcao será realizada

                                    if(funcao == "cadastrar"){
        
                                        // Cria a Estrutura dos Dados a Serem Inseridos ou Alterados
                
                                            var dados = [{
                                                cod_produto: form.produto.input.val(),
                                                produto: form.produto.option.text(),
                                                quantidade: form.quantidade.input.val(),
                                                valor_compra: form.valor_compra.input.val(),
                                                valor_venda: form.valor_venda.input.val(),
                                                data_cadastro: (new Date).toLocaleDateString(),
                                                horario_cadastro: (new Date).toLocaleTimeString(),
                                                cod_situacao: 1
                                            }]

                                        // Registros Inseridos com Sucesso

                                            insereRegistroBD("Estoque", bancoDados, dados).then((data)=>{
                                                Promise.all(data).then((data2)=>{
                                                    Swal.fire({
                                                        icon: 'success',
                                                        title: 'Sucesso',
                                                        text: 'Estoque cadastrado com sucesso.',
                                                        allowOutsideClick: false
                                                    }).then((data)=>{
                                                        // Limpa os Campos do Formulário
                                                            form.produto.input.val("0");
                                                            form.quantidade.input.val("");
                                                            form.valor_compra.input.val("");
                                                            form.valor_venda.input.val("");
                                                        // Consultar todos os Registros no Banco de Dados
                                                            ConsultaRegistrosEstoque();
                                                    })

                                                });
                                            });
                                    } else if(funcao == "alterar"){
        
                                        // Cria a Estrutura dos Dados a Serem Inseridos ou Alterados
                
                                            var dados = {
                                                cod_produto: form.produto.input.val(),
                                                produto: form.produto.option.text(),
                                                quantidade: form.quantidade.input.val(),
                                                valor_compra: form.valor_compra.input.val(),
                                                valor_venda: form.valor_venda.input.val(),
                                                data_atualizacao: (new Date).toLocaleDateString(),
                                                horario_atualizacao: (new Date).toLocaleTimeString()
                                            }

                                        // Altera o Registro no banco de dados

                                            atualizaRegistroBD(bancoDados, "Estoque", parseInt(form.codigo.input.val()), dados).then((data)=>{
                                                Swal.fire({
                                                    icon: 'success',
                                                    title: 'Sucesso',
                                                    text: 'Estoque alterado com sucesso.',
                                                    allowOutsideClick: false
                                                }).then((data)=>{
                                                    // Limpa os Campos do Formulário
                                                        form.produto.input.val("0");
                                                        form.quantidade.input.val("");
                                                        form.valor_compra.input.val("");
                                                        form.valor_venda.input.val("");
                                                    // Consultar todos os Registros no Banco de Dados
                                                        ConsultaRegistrosEstoque();
                                                    // Troca o Botão Alterar pelo Cadastrar
                                                        $("button[name='button-crud'][data-funcao='alterar']").hide();
                                                        $("button[name='button-crud'][data-funcao='cadastrar']").show();
                                                })
                                            });
                                    }
        
                            } else {
        
                                // Checa quais Campos serão notificados com erro
        
                                    if(!validacao[0]){
                                        form.produto.divMensagem.html(form.produto.mensagemInvalida);
                                        form.produto.divMensagem.addClass("invalid-feedback");
                                        form.produto.input.addClass("is-invalid");
                                    } else {
                                        form.produto.divMensagem.html(form.produto.mensagemValida);
                                        form.produto.divMensagem.addClass("valid-feedback");
                                        form.produto.input.addClass("is-valid");
                                    }
        
                                    if(!validacao[1]){
                                        form.quantidade.divMensagem.html(form.quantidade.mensagemInvalida);
                                        form.quantidade.divMensagem.addClass("invalid-feedback");
                                        form.quantidade.input.addClass("is-invalid");
                                    } else {
                                        form.quantidade.divMensagem.html(form.quantidade.mensagemValida);
                                        form.quantidade.divMensagem.addClass("valid-feedback");
                                        form.quantidade.input.addClass("is-valid");
                                    }
        
                                    if(!validacao[2]){
                                        form.valor_compra.divMensagem.html(form.valor_compra.mensagemInvalida);
                                        form.valor_compra.divMensagem.addClass("invalid-feedback");
                                        form.valor_compra.input.addClass("is-invalid");
                                    } else {
                                        form.valor_compra.divMensagem.html(form.valor_compra.mensagemValida);
                                        form.valor_compra.divMensagem.addClass("valid-feedback");
                                        form.valor_compra.input.addClass("is-valid");
                                    }
        
                                    if(!validacao[3]){
                                        form.valor_venda.divMensagem.html(form.valor_venda.mensagemInvalida);
                                        form.valor_venda.divMensagem.addClass("invalid-feedback");
                                        form.valor_venda.input.addClass("is-invalid");
                                    } else {
                                        form.valor_venda.divMensagem.html(form.valor_venda.mensagemValida);
                                        form.valor_venda.divMensagem.addClass("valid-feedback");
                                        form.valor_venda.input.addClass("is-valid");
                                    }
                            }
                        break;
                    case "selecionar":
                        var dados = JSON.parse(botaoCrud.attr("data-registro-dados"));
                        selecionaRegistroEstoque(dados);
                        break;
                    case "excluir":
                        var dados = JSON.parse(botaoCrud.attr("data-registro-dados"));
                        excluirRegistroEstoque(dados, false);
                        break;
                }

        })

})