    
    // Função para Criar a Estrutura do Banco de Dados

        function criaBancoDados(opcoes = {}){

            return new Promise((resolve, reject)=>{

                // Inicio das Validações das Opções para Criação do Banco de Dados
                
                    if(!opcoes.hasOwnProperty("bdNome")){
                        reject(console.error("O objeto Opções não contem o Nome do Banco de Dados, verifique e tente novamente!"));
                    }
                    
                    if(!opcoes.hasOwnProperty("bdVersao")){
                        reject(console.error("O objeto Opções não contem a Versão do Banco de Dados, verifique e tente novamente!"));
                    }
    
                    if(!opcoes.hasOwnProperty("bdTabelas")){
                        reject(console.error("O objeto Opções não contem a(s) Tabela(s) do Banco de Dados, verifique e tente novamente!"));
                    } else {
                        if(opcoes.bdTabelas.length <= 0){
                            reject(console.error("O objeto Tabelas precisa ter pelomenos 1 registro, verifique e tente novamente!"));
                        } else {
                            for(var i in opcoes.bdTabelas){
                                var tabela = opcoes.bdTabelas[i];
    
                                if(!tabela.hasOwnProperty("nome")){
                                    reject(console.error("A Tabela não possui um nome válido, verifique e tente novamente!"));
                                }
    
                                if(!tabela.hasOwnProperty("parametros")){
                                    reject(console.error("A Tabela não possui nenhum parametro válido, verifique e tente novamente!"));
                                } else {
                                    if(!tabela.parametros.hasOwnProperty("keyPath")){
                                        reject(console.error("A Tabela não possui um keyPath válido, verifique e tente novamente!"));
                                    }
    
                                    if(!tabela.parametros.hasOwnProperty("autoIncrement")){
                                        reject(console.error("A Tabela não possui um autoIncrement válido, verifique e tente novamente!"));
                                    }
                                }
    
                                if(!tabela.hasOwnProperty("index")){
                                    reject(console.error("A Tabela não possui um Index Válido, verifique e tente novamente!"));
                                } else {
                                    if(tabela.index.length <= 0){
                                        reject(console.error("A Tabela precisa ter pelomenos 1 index, verifique e tente novamente!"));
                                    } else {
                                        for(var j in tabela.index){
                                            var index = tabela.index[j];
    
                                            if(!index.hasOwnProperty("nome")){
                                                reject(console.error("O Index precisa ter um nome válido, verifique e tente novamente!"));
                                            }
    
                                            if(!index.hasOwnProperty("campo")){
                                                reject(console.error("O Index precisa ter um campo válido, verifique e tente novamente!"));
                                            }
    
                                            if(!index.hasOwnProperty("opcoes")){
                                                reject(console.error("O Index precisa ter um opções válidas, verifique e tente novamente!"));
                                            }
                                        }
                                    }
                                }
    
                            }
                        }
                    }
    
                // Cria o Banco de Dados (IndexedDB)
    
                    var bd = indexedDB.open(opcoes.bdNome, opcoes.bdVersao);
    
                // Cria os Estados da Conexão

                    bd.onsuccess = (evento)=>{
                        resolve(evento.target);
                    }
    
                    bd.onerror = (evento)=>{
                        console.error("O Banco de Dados ["+opcoes.bdNome+"] retornou o seguinte erro: " + evento.target.errorCode);
                    }
    
                    bd.onupgradeneeded = (event)=>{
                        var request = event.target.result;
                        for(var i in opcoes.bdTabelas){
                            var tabela = opcoes.bdTabelas[i];
                            var objetoTabela = request.createObjectStore(tabela.nome, tabela.parametros);
    
                            for(var j in tabela.index){
                                var index = tabela.index[j];
                                objetoTabela.createIndex(index.nome, index.campo, index.opcoes);
                            }
                        }
                    };

            })
                
        }

    // Função para Inserir Registros no Banco de Dados

        function insereRegistroBD(tabela, bd, dados){
            return new Promise((resolve, reject)=>{
                if(typeof tabela != "string"){
                    reject(console.error("O Nome da Tabela é inválido ou não existente"));
                }
    
                if(typeof bd != "object"){
                    reject(console.error("O Objeto bd é inválido ou não existente"));
                }
    
                if(typeof dados != "object"){
                    reject(console.error("Os Dados são inválidos ou não existentes"));
                } else {
                    if(dados.length <= 0){
                        reject(console.error("Insira pelomenos 1 dado"));
                    }
                }
    
                var request = bd.result.transaction(tabela, "readwrite").objectStore(tabela);
                var promessas = [];
                
                for(var i in dados){
                    promessas[i] = new Promise((resolve2, reject2)=>{
                        var registro = dados[i];
                        var requestAdd = request.add(registro);

                        requestAdd.onerror = (evento)=>{
                            reject2(console.error("Houve um erro ao tentar cadastrar o registro: "+evento.target.errorCode));
                        }

                        requestAdd.onsuccess = (evento)=>{
                            resolve2({
                                mensagem: "Registro cadastrado com sucesso."
                            });
                        }
                    })
                }

                resolve(promessas);
            })
        }

    // Função para Pesquisa no Banco de Dados por Código
        
        function PesquisaRegistroBD(bd, tabela, codigo = 0, ordenacao = "asc", paginacao = {}){
            return new Promise((resolve, reject)=>{
                if(typeof bd != "object"){
                    reject(console.error("O Objeto bd é inválido ou não existente"));
                }

                if(typeof tabela != "string"){
                    reject(console.error("O Nome da Tabela é inválido ou não existente"));
                }

                if(typeof codigo != "number"){
                    reject(console.error("O Codigo do Registro da Tabela é inválido ou não existente"));
                }
                
                var objBDStore = bd.result.transaction(tabela).objectStore(tabela);
                
                if(codigo <= 0){
                    var objBDCursor = objBDStore.index("codigo").openCursor(null, ordenacao == "asc" ? "next" : "prev");
                } else {
                    var objBDCursor = objBDStore.index("codigo").openCursor(codigo, ordenacao == "asc" ? "next" : "prev");
                }

                var data = [];

                if(Object.keys(paginacao) <= 0){
                    objBDCursor.onsuccess = (evento)=>{
                        var cursor = evento.target.result;
                        if(cursor){
                            data.push(cursor.value);
                            cursor.continue();
                        } else {
                            resolve(data);
                        }
                    }
                } else {
                    var count = 0;
                    objBDCursor.onsuccess = (evento)=>{
                        var cursor = evento.target.result;
                        if(cursor){
                            if(count >= (paginacao.paginaAtual-1) * paginacao.registrosPorPagina && count < paginacao.paginaAtual * paginacao.registrosPorPagina){
                                data.push(cursor.value);
                            }
                            cursor.continue();
                            count++;
                        } else {
                            resolve(data);
                        }
                    }
                }

            })
        }

    // Função para Pesquisa no Banco de Dados com LIKE, Ordenação e Paginação
        
        function PesquisaRegistroBDIndex(bd, tabela, index, valor, ordenacao = "asc", paginacao = {}){
            return new Promise((resolve, reject)=>{
                if(typeof bd != "object"){
                    reject(console.error("O Objeto bd é inválido ou não existente"));
                }

                if(typeof tabela != "string"){
                    reject(console.error("O Nome da Tabela é inválido ou não existente"));
                }

                if(typeof index != "object"){
                    reject(console.error("O objeto index é inválido ou não existente"));
                }

                if(typeof valor != "string"){
                    reject(console.error("O objeto valor é inválido ou não existente"));
                }

                if(typeof ordenacao != "string"){
                    reject(console.error("A ordenacao é inválida ou não existente"));
                }

                if(typeof paginacao != "object"){
                    reject(console.error("O objeto paginacao é inválido ou não existente"));
                }

                var objBDStore = bd.result.transaction(tabela).objectStore(tabela);
                var objBDCursor = objBDStore.index(index).openCursor(IDBKeyRange.bound(valor, valor+"\uffff"), ordenacao == "asc" ? "next" : "prev");
                var data = [];

                if(Object.keys(paginacao) <= 0){
                    objBDCursor.onsuccess = (evento)=>{
                        var cursor = evento.target.result;
                        if(cursor){
                            data.push(cursor.value);
                            cursor.continue();
                        } else {
                            resolve(data);
                        }
                    }
                } else {
                    var count = 0;
                    objBDCursor.onsuccess = (evento)=>{
                        var cursor = evento.target.result;
                        if(cursor){
                            if(count >= (paginacao.paginaAtual-1) * paginacao.registrosPorPagina && count < paginacao.paginaAtual * paginacao.registrosPorPagina){
                                data.push(cursor.value);
                            }
                            cursor.continue();
                            count++;
                        } else {
                            resolve(data);
                        }
                    }
                }

            })
        }

    // Função para Pesquisa no Banco de Dados por Código
        
        function TotalRegistrosTabela(bd, tabela){
            return new Promise((resolve, reject)=>{
                if(typeof bd != "object"){
                    reject(console.error("O Objeto bd é inválido ou não existente"));
                }

                if(typeof tabela != "string"){
                    reject(console.error("O Nome da Tabela é inválido ou não existente"));
                }
                
                var objBDStore = bd.result.transaction(tabela).objectStore(tabela);
                var objBDCursor = objBDStore.getAll();

                objBDCursor.onsuccess = (evento)=>{
                    resolve(evento.target.result.length);
                }
            })
        }

    // Função para Atualizar o Registro no Banco de Dados

        function atualizaRegistroBD(bd, tabela, codigo, dados){
            return new Promise((resolve, reject)=>{
                if(typeof bd != "object"){
                    reject(console.error("O Objeto bd é inválido ou não existente"));
                }
    
                if(typeof tabela != "string"){
                    reject(console.error("O Nome da Tabela é inválido ou não existente"));
                }
    
                if(typeof codigo != "number"){
                    reject(console.error("O Codigo do Registro da Tabela é inválido ou não existente"));
                }
    
                if(typeof dados != "object"){
                    reject(console.error("Os Dados da Tabela são inválidos ou não existentes"));
                }
    
                var objetoTabela = bd.result.transaction([tabela], "readwrite").objectStore(tabela);
                var requisicao = objetoTabela.get(codigo);
    
                requisicao.onerror = (evento)=>{
                    reject(console.error("Houve um erro na transação: "+evento.target.errorCode));
                };
    
                requisicao.onsuccess = (evento)=>{
                    var registro = requisicao.result;
                    var campos = Object.keys(dados);
    
                    for(var i in campos){
                        var campo = campos[i];
                        registro[campo] = dados[campo];
                    }
    
                    var objetoRegistro = objetoTabela.put(registro);
    
                    objetoRegistro.onerror = function(evento) {
                        reject(console.error("Houve um erro na atualização do registro: "+evento.target.errorCode));
                    };
    
                    objetoRegistro.onsuccess = function(evento) {
                        resolve(console.log("Registro Atualizado com Sucesso"));
                    };
                }
            })
        }
    
    // Função para Excluir o Registro no Banco de Dados

        function excluiRegistroBD(bd, tabela, codigo){
            return new Promise((resolve, reject)=>{
                if(typeof bd != "object"){
                    reject(console.error("O Objeto bd é inválido ou não existente"));
                }
    
                if(typeof tabela != "string"){
                    reject(console.error("O Nome da Tabela é inválido ou não existente"));
                }
    
                if(typeof codigo != "number"){
                    reject(console.error("O Codigo do Registro da Tabela é inválido ou não existente"));
                }
    
                var requisicao = bd.result.transaction([tabela], "readwrite").objectStore(tabela).delete(codigo);
    
                requisicao.onerror = (evento)=>{
                    reject(console.error("Houve um erro na exclusão: "+evento.target.errorCode));
                };
    
                requisicao.onsuccess = (evento)=>{
                    resolve(console.log("Registro Excluído com Sucesso"));
                }
            })
        }
    
    // Função para Fechar o Banco de Dados

        function fechaBD(bd){
            if(typeof bd != "object"){
                reject(console.error("O Objeto bd é inválido ou não existente"));
            }

            bd.result.close();
        }
