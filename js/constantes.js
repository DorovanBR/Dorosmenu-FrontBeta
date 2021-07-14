    // Define a Constante com a Estrutura do Banco de Dados

        const EstruturaBD = {
            bdNome: "dbDorosmenu",
            bdVersao: 3,
            bdTabelas: [{
                nome: "Categorias",
                parametros: {
                    keyPath: "codigo",
                    autoIncrement: true
                },
                index: [{
                    nome: "codigo",
                    campo: "codigo",
                    opcoes: {
                        unique: true
                    }
                }]
            },{
                nome: "Produtos",
                parametros: {
                    keyPath: "codigo",
                    autoIncrement: true
                },
                index: [{
                    nome: "codigo",
                    campo: "codigo",
                    opcoes: {
                        unique: true
                    }
                }]
            },{
                nome: "Estoque",
                parametros: {
                    keyPath: "codigo",
                    autoIncrement: true
                },
                index: [{
                    nome: "codigo",
                    campo: "codigo",
                    opcoes: {
                        unique: true
                    }
                }]
            },{
                nome: "Pedidos",
                parametros: {
                    keyPath: "codigo",
                    autoIncrement: true
                },
                index: [{
                    nome: "codigo",
                    campo: "codigo",
                    opcoes: {
                        unique: true
                    }
                }]
            },{
                nome: "Pedidos_Produtos",
                parametros: {
                    keyPath: "codigo",
                    autoIncrement: true
                },
                index: [{
                    nome: "codigo",
                    campo: "codigo",
                    opcoes: {
                        unique: true
                    }
                }]
            }]
        };

    // Define a Constante da Instância do Banco de Dados
        
        var bancoDados = null