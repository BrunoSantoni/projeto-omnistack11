const knex = require('knex')
const config = require('../../knexfile') //Importando a configuração do banco

const conexao = knex(config.development) //Usando a conexão de desenvolvimento

module.exports = conexao