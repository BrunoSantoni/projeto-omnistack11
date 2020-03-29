const knex = require('knex')
const configuracao = require('../../knexfile') //Importando a configuração do banco

const config = process.env.NODE_ENV === 'test' ? configuracao.test : configuracao.development
//Pegou o valor da variável ambiente

const conexao = knex(config) //Usando a conexão de desenvolvimento

module.exports = conexao