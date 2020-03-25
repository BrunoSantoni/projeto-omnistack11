const conexao = require('../database/conexao')

module.exports = {
    async create(request,response) {
        const { id } = request.body

        const ong = await conexao('ongs').where('id', id).select('nome').first()
        //O first é utilizado para impedir que retorne um array, pois se existir, será apenas um resultado.
        //SELECT nome FROM ongs WHERE id = (Valor recebido no request.body)

        if(!ong) {
            return response.status(400).json({ error: 'Este ID não pertence a nenhuma ONG' })
            //status 400 = bad request
        }

        return response.json(ong)
    }
}