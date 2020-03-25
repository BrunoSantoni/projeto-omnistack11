const conexao = require('../database/conexao')

module.exports = {
    async index(request, response) {
        const { pagina = 1 } = request.query

        const [contador] = await conexao('casos').count()

        const casos = await conexao('casos').join('ongs', 'ongs.id', '=', 'casos.ong_id')
        .limit(5).offset((pagina - 1) * 5).select(['casos.*', 'ongs.nome', 'ongs.email',
        'ongs.whatsapp', 'ongs.cidade', 'ongs.estado'])
        //Select com join para mostrar os dados da ONG
        //limitando em 5 registros, pulando 5 registros por página
        //offset determina em qual índice começará a pegar os registros, como vamos querer
        //que a cada página ele pegue os próximos 5, precisaremos dessa lógica de (pagina - 1) x 5
        //pg 1: (1 - 1) * 5 = irá do registro 0-4
        //pg 2: (2 - 1) * 5 = irá do registro 5-9
        //pg 3: (3 - 1) * 5 = irá do registro 10-14 e assim por diante

        response.header('X-Total-Count', contador['count(*)'])
        return response.json(casos)
    },

    async create(request, response) {
        const { titulo, descricao, valor } = request.body
        const ong_id = request.headers.autorizacao //Busca os dados da ONG que está logada

        //Os colchetes serve para pegar apenas a primeira posição que receber em id ao invés de pegar o array todo.
        const [id] = await conexao('casos').insert({ 
            titulo,
            descricao,
            valor,
            ong_id,
        })

        return response.json({
            id
        })
    },

    async delete(request, response) {
        const { id } = request.params
        const ong_id = request.headers.autorizacao
        //Precisa saber se o caso a ser deletado é da ONG que está logada

        const caso = await conexao('casos').where('id', id).select('ong_id').first()
        //Buscou na tabela casos o campo ong_id do caso passado como request params
        //Mesma coisa que: SELECT ong_id FROM casos WHERE id = (Parâmetro recebido em request.params)

        if(ong_id !== caso.ong_id) {
            return response.status(401).json({ error: 'Operação não permitida' })
            //Troca o Status do código HTTP. Código de sucesso é 200, e 401 é não autorizado,
            //Ou seja, a Ong não está autorizada a deletar esse caso
        }

        await conexao('casos').where('id', id).delete()
        //Caso não tenha caído na condição do IF, quer dizer que a ONG tem permissão para deletar
        //Mesma coisa que: DELETE FROM casos WHERE id = (Parâmetro recebido em request.params)

        return response.status(204).send()
        //Status 204 indica uma resposta que teve sucesso, mas não tem nenhum conteúdo para retornar.
    }
}