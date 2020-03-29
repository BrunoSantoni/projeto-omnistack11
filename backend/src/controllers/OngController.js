const conexao = require('../database/conexao')

const generateUniqueId = require('../utils/generateUniqueId')

module.exports = {
    async index(request, response) { 
        const ongs = await conexao('ongs').select('*') //Selecionou todas as ongs cadastradas
    
        return response.json(ongs)
    },

    async create (request, response) {
        const { nome, email, whatsapp, cidade, estado } = request.body

        const id = generateUniqueId()
        //Para o ID, geraremos 4 bytes de caracteres aleatórios e converteremos para Hex.
    
        await conexao('ongs').insert({
            id,
            nome,
            email,
            whatsapp,
            cidade,
            estado,
        })
        
        return response.json({
            id
        }) //Retornou apenas o ID, pois é como se fosse um CPF, uma chave, a ONG precisará dele para logar.
    }
}