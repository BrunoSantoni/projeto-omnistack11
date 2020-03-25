const conexao = require('../database/conexao')

module.exports = {
    async index(request, response) {
        const ong_id = request.headers.autorizacao

        const casos = await conexao('casos').where('ong_id', ong_id).select('*')
        //SELECT * FROM casos WHERE ong_id = (parâmetro recebido em request.headers.autorizacao)

        return response.json(casos)
    }
}