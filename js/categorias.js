//------------------------------------
// Funções Customizadas
//------------------------------------

    // Função para Consultar os Registros de Categoria

        function ConsultaRegistrosCategoria(){

            // Define as Variaveis

                var TabelaRegistrosCategoria = $("#table-tbody-registrosCategoria");

            // Limpa os Registros da Tabela

                TabelaRegistrosCategoria.html("");

            // Pesquisar os Registros no banco de dados

                PesquisaRegistroBD(bancoDados, "Categorias").then((data)=>{
                    
                    // Define as Variaveis
                        
                        var registrosHtml = ""

                    // Faz um laço de repetição para adicionar os registros em formato HTML

                        for(var i in data){

                            // Define as Variaveis

                                var registro = data[i];
                                var codigo = registro.hasOwnProperty("codigo") ? registro.codigo : "-";
                                var descricao = registro.hasOwnProperty("descricao") ? registro.descricao : "-";
                                var data_cadastro = registro.hasOwnProperty("data_cadastro") ? registro.data_cadastro : "-";
                                var horario_cadastro = registro.hasOwnProperty("horario_cadastro") ? registro.horario_cadastro : "-";
                                var data_atualizacao = registro.hasOwnProperty("data_atualizacao") ? registro.data_atualizacao : "-";
                                var horario_atualizacao = registro.hasOwnProperty("horario_atualizacao") ? registro.horario_atualizacao : "-";
                                var cod_situacao = registro.hasOwnProperty("cod_situacao") ? registro.cod_situacao : "-";

                            // Verifica se o registro está com a flag de Cadastrado
                            
                                if(parseInt(cod_situacao) == 1){
                                    registrosHtml += "<tr>";
                                    registrosHtml += "<th class='text-center' scope='row'>"+codigo+"</th>";
                                    registrosHtml += "<td class='text-center'>"+descricao+"</td>";
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
                            $("#table-categoria").show();
                            $("#div-alerta-categoria").hide();
                            TabelaRegistrosCategoria.html(registrosHtml);
                        } else {
                            $("#table-categoria").hide();
                            $("#div-alerta-categoria").show();
                        }
                    

                })
        }

    // Função para Preencher os Dados no Formulario de Alteração

        function selecionaRegistroCategoria(dados){

            // Define as Variaveis

                var form = {
                    codigo: {
                        input: $("input[name='input-codigo']")
                    },
                    descricao: {
                        input: $("input[name='input-descricao']"),
                        divMensagem: $("#input-descricao-div-mensagem"),
                        mensagemValida: $("input[name='input-descricao']").attr("data-mensagem-valido"),
                        mensagemInvalida: $("input[name='input-descricao']").attr("data-mensagem-invalido")
                    }
                }
            
            // Aplica o valor do Dado no Campo

                form.codigo.input.val(dados.codigo);
                form.descricao.input.val(dados.descricao);
            
            // Exibir o Botão de Alterar

                $("button[name='button-crud'][data-funcao='alterar']").show();
                $("button[name='button-crud'][data-funcao='cadastrar']").hide();
        }

    // Função para Excluir o Registro do Banco de Dados

        function excluirRegistroCategoria(dados, excluirDefinitivo){
            
            // Verifica se o registro será excluido do banco ou flegado como excluido

                if(excluirDefinitivo){
                    excluiRegistroBD(bancoDados, "Categorias", dados.codigo).then((data)=>{
                        Swal.fire({
                            icon: 'success',
                            title: 'Sucesso',
                            text: 'Categoria excluida com sucesso.',
                            allowOutsideClick: false
                        }).then((data)=>{
                            ConsultaRegistrosCategoria();
                        })
                    })
                } else {

                    var novosDados = {
                        cod_situacao: 2,
                        data_atualizacao: (new Date).toLocaleDateString(),
                        horario_atualizacao: (new Date).toLocaleTimeString()
                    };

                    atualizaRegistroBD(bancoDados, "Categorias", dados.codigo, novosDados).then((data)=>{
                        Swal.fire({
                            icon: 'success',
                            title: 'Sucesso',
                            text: 'Categoria excluida com sucesso.',
                            allowOutsideClick: false
                        }).then((data)=>{
                            // Consultar todos os Registros no Banco de Dados
                                ConsultaRegistrosCategoria();
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
                    ConsultaRegistrosCategoria();
                })
            })

        // Valida o Campo de Descrição da Categoria

            $(document).on('keyup', 'input[name="input-descricao"]', (evento)=>{

                // Define as Variaveis

                    var idInput = evento.currentTarget.id;
                    var inputDescricao = $(evento.currentTarget);
                    var mensagemValida = inputDescricao.attr("data-mensagem-valido");
                    var mensagemInvalida = inputDescricao.attr("data-mensagem-invalido");

                    var divMensagem = $("#"+idInput+"-div-mensagem");

                // Remover a Classe e Limpar a Mensagem da divMensagem

                    divMensagem.html("");
                    divMensagem.removeClass("invalid-feedback");
                    divMensagem.removeClass("valid-feedback");

                // Remove as Classes de Validação do Campo

                    inputDescricao.removeClass("is-invalid");
                    inputDescricao.removeClass("is-valid");

                // Define as Regras de Validação

                    var validacao = [];
                        validacao[0] = inputDescricao.val() != undefined;
                        validacao[1] = inputDescricao.val() != null;
                        validacao[2] = inputDescricao.val().trim().length > 0;

                    var checaValidacao = validacao[0] && validacao[1] && validacao[2];

                // Realiza a condição das validações para tratar o campo

                    if(checaValidacao){
                        divMensagem.html(mensagemValida);
                        divMensagem.addClass("valid-feedback");
                        inputDescricao.addClass("is-valid");
                    } else {
                        divMensagem.html(mensagemInvalida);
                        divMensagem.addClass("invalid-feedback");
                        inputDescricao.addClass("is-invalid");
                    }

            })

        // Desativa o Submit do Formulário realizando os processos de cadasrtro e alteração conforme a funcionalidade ativa

            $("form[name='form-categoria']").submit((evento)=>{
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
                                    descricao: {
                                        input: $("input[name='input-descricao']"),
                                        divMensagem: $("#input-descricao-div-mensagem"),
                                        mensagemValida: $("input[name='input-descricao']").attr("data-mensagem-valido"),
                                        mensagemInvalida: $("input[name='input-descricao']").attr("data-mensagem-invalido")
                                    }
                                }
            
                            // Limpar as Classes de Validação do Formulário
            
                                form.descricao.input.removeClass("is-invalid");
                                form.descricao.input.removeClass("is-valid");
            
                            // Estrutura a Validação dos Campos
            
                                var validacao = [];
                                    validacao[0] = form.descricao.input.val() != undefined && form.descricao.input.val() != null && form.descricao.input.val().trim().length > 0;
                                    validacao[1] = (funcao == "alterar" ? (form.codigo.input.val() != undefined && parseInt(form.codigo.input.val()) > 0) : true);
                                var checaValidacao = validacao[0] && validacao[1];
            
                            // Realiza a Validação dos Campos para Prosseguir com a Função a ser executada
            
                                if(checaValidacao){
                                    
                                    // Verifica qual funcao será realizada

                                        if(funcao == "cadastrar"){
            
                                            // Cria a Estrutura dos Dados a Serem Inseridos ou Alterados
                    
                                                var dados = [{
                                                    descricao: form.descricao.input.val(),
                                                    data_cadastro: (new Date).toLocaleDateString(),
                                                    horario_cadastro: (new Date).toLocaleTimeString(),
                                                    cod_situacao: 1
                                                }]

                                            // Registros Inseridos com Sucesso

                                                insereRegistroBD("Categorias", bancoDados, dados).then((data)=>{
                                                    Promise.all(data).then((data2)=>{
                                                        Swal.fire({
                                                            icon: 'success',
                                                            title: 'Sucesso',
                                                            text: 'Categoria cadastrada com sucesso.',
                                                            allowOutsideClick: false
                                                        }).then((data)=>{
                                                            // Limpa os Campos do Formulário
                                                                form.descricao.input.val("");
                                                            // Consultar todos os Registros no Banco de Dados
                                                                ConsultaRegistrosCategoria();
                                                        })

                                                    });
                                                });
                                        } else if(funcao == "alterar"){
            
                                            // Cria a Estrutura dos Dados a Serem Inseridos ou Alterados
                    
                                                var dados = {
                                                    descricao: form.descricao.input.val(),
                                                    data_atualizacao: (new Date).toLocaleDateString(),
                                                    horario_atualizacao: (new Date).toLocaleTimeString()
                                                }

                                            // Altera o Registro no banco de dados

                                                atualizaRegistroBD(bancoDados, "Categorias", parseInt(form.codigo.input.val()), dados).then((data)=>{
                                                    Swal.fire({
                                                        icon: 'success',
                                                        title: 'Sucesso',
                                                        text: 'Categoria alterada com sucesso.',
                                                        allowOutsideClick: false
                                                    }).then((data)=>{
                                                        // Limpa os Campos do Formulário
                                                            form.descricao.input.val("");
                                                        // Consultar todos os Registros no Banco de Dados
                                                            ConsultaRegistrosCategoria();
                                                        // Troca o Botão Alterar pelo Cadastrar
                                                            $("button[name='button-crud'][data-funcao='alterar']").hide();
                                                            $("button[name='button-crud'][data-funcao='cadastrar']").show();
                                                    })
                                                });
                                        }
            
                                } else {
            
                                    // Checa quais Campos serão notificados com erro
            
                                        if(!validacao[0]){
                                            form.descricao.divMensagem.html(form.descricao.mensagemInvalida);
                                            form.descricao.divMensagem.addClass("invalid-feedback");
                                            form.descricao.input.addClass("is-invalid");
                                        } else {
                                            form.descricao.divMensagem.html(form.descricao.mensagemValida);
                                            form.descricao.divMensagem.addClass("valid-feedback");
                                            form.descricao.input.addClass("is-valid");
                                        }
                                }
                            break;
                        case "selecionar":
                            var dados = JSON.parse(botaoCrud.attr("data-registro-dados"));
                            selecionaRegistroCategoria(dados);
                            break;
                        case "excluir":
                            var dados = JSON.parse(botaoCrud.attr("data-registro-dados"));
                            excluirRegistroCategoria(dados, false);
                            break;
                    }

            })

    })