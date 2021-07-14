//------------------------------------
// Funções Customizadas
//------------------------------------

    // Função para Consultar os Registros de Produto

        function ConsultaRegistrosProduto(){

            // Define as Variaveis

                var TabelaRegistrosProduto = $("#table-tbody-registrosProduto");

            // Limpa os Registros da Tabela

                TabelaRegistrosProduto.html("");

            // Pesquisar os Registros no banco de dados

                PesquisaRegistroBD(bancoDados, "Produtos").then((data)=>{
                    
                    // Define as Variaveis
                        
                        var registrosHtml = ""

                    // Faz um laço de repetição para adicionar os registros em formato HTML

                        for(var i in data){

                            // Define as Variaveis

                                var registro = data[i];
                                var codigo = registro.hasOwnProperty("codigo") ? registro.codigo : "-";
                                var nome = registro.hasOwnProperty("nome") ? registro.nome : "-";
                                var descricao = registro.hasOwnProperty("descricao") ? registro.descricao : "-";
                                var categoria = registro.hasOwnProperty("categoria") ? registro.categoria : "-";
                                var data_cadastro = registro.hasOwnProperty("data_cadastro") ? registro.data_cadastro : "-";
                                var horario_cadastro = registro.hasOwnProperty("horario_cadastro") ? registro.horario_cadastro : "-";
                                var data_atualizacao = registro.hasOwnProperty("data_atualizacao") ? registro.data_atualizacao : "-";
                                var horario_atualizacao = registro.hasOwnProperty("horario_atualizacao") ? registro.horario_atualizacao : "-";
                                var cod_situacao = registro.hasOwnProperty("cod_situacao") ? registro.cod_situacao : "-";

                            // Verifica se o registro está com a flag de Cadastrado
                            
                                if(parseInt(cod_situacao) == 1){
                                    registrosHtml += "<tr>";
                                    registrosHtml += "<th class='text-center' scope='row'>"+codigo+"</th>";
                                    registrosHtml += "<td class='text-center'>"+nome+"</td>";
                                    registrosHtml += "<td class='text-center'>"+descricao+"</td>";
                                    registrosHtml += "<td class='text-center'>"+categoria+"</td>";
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
                            $("#table-produto").show();
                            $("#div-alerta-produto").hide();
                            TabelaRegistrosProduto.html(registrosHtml);
                        } else {
                            $("#table-produto").hide();
                            $("#div-alerta-produto").show();
                        }
                    

                })
        }
    
    // Função para Consultar os Registros de Categoria

        function ConsultaRegistrosCategoria(){

            // Define as Variaveis

                var selectCategoria = $("select[name='select-categoria']");

            // Limpa os Registros do Select

                selectCategoria.empty();
            
            // Insere o Registro Padrão
    
                selectCategoria.append($('<option>', {
                    value: 0,
                    text: "Selecione uma Categoria"
                }));

            // Pesquisar os Registros no banco de dados

                PesquisaRegistroBD(bancoDados, "Categorias").then((data)=>{
                    for(var i in data){
                        var registro = data[i];

                        selectCategoria.append($('<option>', {
                            value: registro.codigo,
                            text: registro.descricao
                        }));
                    }
                })
        }

    // Função para Preencher os Dados no Formulario de Alteração

        function selecionaRegistroProduto(dados){

            // Define as Variaveis

                var form = {
                    codigo: {
                        input: $("input[name='input-codigo']")
                    },
                    nome: {
                        input: $("input[name='input-nome']"),
                        divMensagem: $("#input-nome-div-mensagem"),
                        mensagemValida: $("input[name='input-nome']").attr("data-mensagem-valido"),
                        mensagemInvalida: $("input[name='input-nome']").attr("data-mensagem-invalido")
                    },
                    descricao: {
                        input: $("input[name='input-descricao']"),
                        divMensagem: $("#input-descricao-div-mensagem"),
                        mensagemValida: $("input[name='input-descricao']").attr("data-mensagem-valido"),
                        mensagemInvalida: $("input[name='input-descricao']").attr("data-mensagem-invalido")
                    },
                    categoria: {
                        input: $("select[name='select-categoria']"),
                        divMensagem: $("#select-categoria-div-mensagem"),
                        mensagemValida: $("select[name='select-categoria']").attr("data-mensagem-valido"),
                        mensagemInvalida: $("select[name='select-categoria']").attr("data-mensagem-invalido")
                    }
                }
            
            // Aplica o valor do Dado no Campo

                form.codigo.input.val(dados.codigo);
                form.nome.input.val(dados.nome);
                form.descricao.input.val(dados.descricao);
                form.categoria.input.val(dados.cod_categoria);
            
            // Exibir o Botão de Alterar

                $("button[name='button-crud'][data-funcao='alterar']").show();
                $("button[name='button-crud'][data-funcao='cadastrar']").hide();
        }

    // Função para Excluir o Registro do Banco de Dados

        function excluirRegistroProduto(dados, excluirDefinitivo){
            
            // Verifica se o registro será excluido do banco ou flegado como excluido

                if(excluirDefinitivo){
                    excluiRegistroBD(bancoDados, "Produtos", dados.codigo).then((data)=>{
                        Swal.fire({
                            icon: 'success',
                            title: 'Sucesso',
                            text: 'Produto excluido com sucesso.',
                            allowOutsideClick: false
                        }).then((data)=>{
                            ConsultaRegistrosProduto();
                        })
                    })
                } else {

                    var novosDados = {
                        cod_situacao: 2,
                        data_atualizacao: (new Date).toLocaleDateString(),
                        horario_atualizacao: (new Date).toLocaleTimeString()
                    };

                    atualizaRegistroBD(bancoDados, "Produtos", dados.codigo, novosDados).then((data)=>{
                        Swal.fire({
                            icon: 'success',
                            title: 'Sucesso',
                            text: 'Produto excluido com sucesso.',
                            allowOutsideClick: false
                        }).then((data)=>{
                            // Consultar todos os Registros no Banco de Dados
                                ConsultaRegistrosProduto();
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
                    ConsultaRegistrosProduto();
                })
            })

        // Valida o Campo de Nome do Produto

            $(document).on('keyup', 'input[name="input-nome"]', (evento)=>{

                // Define as Variaveis

                    var idInput = evento.currentTarget.id;
                    var inputNome = $(evento.currentTarget);
                    var mensagemValida = inputNome.attr("data-mensagem-valido");
                    var mensagemInvalida = inputNome.attr("data-mensagem-invalido");

                    var divMensagem = $("#"+idInput+"-div-mensagem");

                // Remover a Classe e Limpar a Mensagem da divMensagem

                    divMensagem.html("");
                    divMensagem.removeClass("invalid-feedback");
                    divMensagem.removeClass("valid-feedback");

                // Remove as Classes de Validação do Campo

                    inputNome.removeClass("is-invalid");
                    inputNome.removeClass("is-valid");

                // Define as Regras de Validação

                    var validacao = [];
                        validacao[0] = inputNome.val() != undefined;
                        validacao[1] = inputNome.val() != null;
                        validacao[2] = inputNome.val().trim().length > 0;

                    var checaValidacao = validacao[0] && validacao[1] && validacao[2];

                // Realiza a condição das validações para tratar o campo

                    if(checaValidacao){
                        divMensagem.html(mensagemValida);
                        divMensagem.addClass("valid-feedback");
                        inputNome.addClass("is-valid");
                    } else {
                        divMensagem.html(mensagemInvalida);
                        divMensagem.addClass("invalid-feedback");
                        inputNome.addClass("is-invalid");
                    }

            })

        // Valida o Campo de Descrição do Produto

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

        // Valida o Campo de Categoria do Produto

            $(document).on('change', 'select[name="select-categoria"]', (evento)=>{

                // Define as Variaveis

                    var idInput = evento.currentTarget.id;
                    var selectCategoria = $(evento.currentTarget);
                    var mensagemValida = selectCategoria.attr("data-mensagem-valido");
                    var mensagemInvalida = selectCategoria.attr("data-mensagem-invalido");

                    var divMensagem = $("#"+idInput+"-div-mensagem");

                // Remover a Classe e Limpar a Mensagem da divMensagem

                    divMensagem.html("");
                    divMensagem.removeClass("invalid-feedback");
                    divMensagem.removeClass("valid-feedback");

                // Remove as Classes de Validação do Campo

                    selectCategoria.removeClass("is-invalid");
                    selectCategoria.removeClass("is-valid");

                // Define as Regras de Validação

                    var validacao = [];
                        validacao[0] = selectCategoria.val() != undefined;
                        validacao[1] = selectCategoria.val() != null;
                        validacao[2] = parseInt(selectCategoria.val()) > 0;

                    var checaValidacao = validacao[0] && validacao[1] && validacao[2];

                // Realiza a condição das validações para tratar o campo

                    if(checaValidacao){
                        divMensagem.html(mensagemValida);
                        divMensagem.addClass("valid-feedback");
                        selectCategoria.addClass("is-valid");
                    } else {
                        divMensagem.html(mensagemInvalida);
                        divMensagem.addClass("invalid-feedback");
                        selectCategoria.addClass("is-invalid");
                    }

            })

        // Desativa o Submit do Formulário realizando os processos de cadasrtro e alteração conforme a funcionalidade ativa

            $("form[name='form-produto']").submit((evento)=>{
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
                                    nome: {
                                        input: $("input[name='input-nome']"),
                                        divMensagem: $("#input-nome-div-mensagem"),
                                        mensagemValida: $("input[name='input-nome']").attr("data-mensagem-valido"),
                                        mensagemInvalida: $("input[name='input-nome']").attr("data-mensagem-invalido")
                                    },
                                    descricao: {
                                        input: $("input[name='input-descricao']"),
                                        divMensagem: $("#input-descricao-div-mensagem"),
                                        mensagemValida: $("input[name='input-descricao']").attr("data-mensagem-valido"),
                                        mensagemInvalida: $("input[name='input-descricao']").attr("data-mensagem-invalido")
                                    },
                                    categoria: {
                                        input: $("select[name='select-categoria']"),
                                        option: $("select[name='select-categoria'] option:selected"),
                                        divMensagem: $("#select-categoria-div-mensagem"),
                                        mensagemValida: $("select[name='select-categoria']").attr("data-mensagem-valido"),
                                        mensagemInvalida: $("select[name='select-categoria']").attr("data-mensagem-invalido")
                                    }
                                }
            
                            // Limpar as Classes de Validação do Formulário
            
                                form.nome.input.removeClass("is-invalid");
                                form.nome.input.removeClass("is-valid");

                                form.descricao.input.removeClass("is-invalid");
                                form.descricao.input.removeClass("is-valid");

                                form.categoria.input.removeClass("is-invalid");
                                form.categoria.input.removeClass("is-valid");
            
                            // Estrutura a Validação dos Campos
            
                                var validacao = [];
                                    validacao[0] = form.nome.input.val() != undefined && form.nome.input.val() != null && form.nome.input.val().trim().length > 0;
                                    validacao[1] = form.descricao.input.val() != undefined && form.descricao.input.val() != null && form.descricao.input.val().trim().length > 0;
                                    validacao[2] = form.categoria.input.val() != undefined && form.categoria.input.val() != null && parseInt(form.categoria.input.val()) > 0;
                                    validacao[3] = (funcao == "alterar" ? (form.codigo.input.val() != undefined && parseInt(form.codigo.input.val()) > 0) : true);
                                var checaValidacao = validacao[0] && validacao[1] && validacao[2] && validacao[3];
            
                            // Realiza a Validação dos Campos para Prosseguir com a Função a ser executada
            
                                if(checaValidacao){
                                    
                                    // Verifica qual funcao será realizada

                                        if(funcao == "cadastrar"){
            
                                            // Cria a Estrutura dos Dados a Serem Inseridos ou Alterados
                    
                                                var dados = [{
                                                    nome: form.nome.input.val(),
                                                    descricao: form.descricao.input.val(),
                                                    cod_categoria: form.categoria.input.val(),
                                                    categoria: form.categoria.option.text(),
                                                    data_cadastro: (new Date).toLocaleDateString(),
                                                    horario_cadastro: (new Date).toLocaleTimeString(),
                                                    cod_situacao: 1
                                                }]

                                            // Registros Inseridos com Sucesso

                                                insereRegistroBD("Produtos", bancoDados, dados).then((data)=>{
                                                    Promise.all(data).then((data2)=>{
                                                        Swal.fire({
                                                            icon: 'success',
                                                            title: 'Sucesso',
                                                            text: 'Produto cadastrado com sucesso.',
                                                            allowOutsideClick: false
                                                        }).then((data)=>{
                                                            // Limpa os Campos do Formulário
                                                                form.nome.input.val("");
                                                                form.descricao.input.val("");
                                                                form.categoria.input.val("0");
                                                            // Consultar todos os Registros no Banco de Dados
                                                                ConsultaRegistrosProduto();
                                                        })

                                                    });
                                                });
                                        } else if(funcao == "alterar"){
            
                                            // Cria a Estrutura dos Dados a Serem Inseridos ou Alterados
                    
                                                var dados = {
                                                    nome: form.nome.input.val(),
                                                    descricao: form.descricao.input.val(),
                                                    cod_categoria: form.categoria.input.val(),
                                                    categoria: form.categoria.option.text(),
                                                    data_atualizacao: (new Date).toLocaleDateString(),
                                                    horario_atualizacao: (new Date).toLocaleTimeString()
                                                }

                                            // Altera o Registro no banco de dados

                                                atualizaRegistroBD(bancoDados, "Produtos", parseInt(form.codigo.input.val()), dados).then((data)=>{
                                                    Swal.fire({
                                                        icon: 'success',
                                                        title: 'Sucesso',
                                                        text: 'Produto alterado com sucesso.',
                                                        allowOutsideClick: false
                                                    }).then((data)=>{
                                                        // Limpa os Campos do Formulário
                                                            form.nome.input.val("");
                                                            form.descricao.input.val("");
                                                            form.categoria.input.val("0");
                                                        // Consultar todos os Registros no Banco de Dados
                                                            ConsultaRegistrosProduto();
                                                        // Troca o Botão Alterar pelo Cadastrar
                                                            $("button[name='button-crud'][data-funcao='alterar']").hide();
                                                            $("button[name='button-crud'][data-funcao='cadastrar']").show();
                                                    })
                                                });
                                        }
            
                                } else {
            
                                    // Checa quais Campos serão notificados com erro
            
                                        if(!validacao[0]){
                                            form.nome.divMensagem.html(form.nome.mensagemInvalida);
                                            form.nome.divMensagem.addClass("invalid-feedback");
                                            form.nome.input.addClass("is-invalid");
                                        } else {
                                            form.nome.divMensagem.html(form.nome.mensagemValida);
                                            form.nome.divMensagem.addClass("valid-feedback");
                                            form.nome.input.addClass("is-valid");
                                        }
            
                                        if(!validacao[1]){
                                            form.descricao.divMensagem.html(form.descricao.mensagemInvalida);
                                            form.descricao.divMensagem.addClass("invalid-feedback");
                                            form.descricao.input.addClass("is-invalid");
                                        } else {
                                            form.descricao.divMensagem.html(form.descricao.mensagemValida);
                                            form.descricao.divMensagem.addClass("valid-feedback");
                                            form.descricao.input.addClass("is-valid");
                                        }
            
                                        if(!validacao[2]){
                                            form.categoria.divMensagem.html(form.categoria.mensagemInvalida);
                                            form.categoria.divMensagem.addClass("invalid-feedback");
                                            form.categoria.input.addClass("is-invalid");
                                        } else {
                                            form.categoria.divMensagem.html(form.categoria.mensagemValida);
                                            form.categoria.divMensagem.addClass("valid-feedback");
                                            form.categoria.input.addClass("is-valid");
                                        }
                                }
                            break;
                        case "selecionar":
                            var dados = JSON.parse(botaoCrud.attr("data-registro-dados"));
                            selecionaRegistroProduto(dados);
                            break;
                        case "excluir":
                            var dados = JSON.parse(botaoCrud.attr("data-registro-dados"));
                            excluirRegistroProduto(dados, false);
                            break;
                    }

            })

    })