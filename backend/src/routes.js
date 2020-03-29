const express = require('express') //Importando framework express
const { celebrate, Segments, Joi } = require('celebrate')

const OngController = require('./controllers/OngController')
const CasosController = require('./controllers/CasosController')
const PerfilController = require('./controllers/PerfilController')
const SessaoController = require('./controllers/SessaoController')

const routes = express.Router()

routes.post('/login', celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required(),
  })
}), SessaoController.create) //post pois cria uma sessão

routes.get('/ongs', OngController.index) //Rota do tipo post pois quer listar algo
routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    nome: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(13),
    cidade: Joi.string().required(),
    estado: Joi.string().required().length(2),
  })
}), OngController.create) //Rota do tipo post pois quer inserir algo, acessando o método create do controlador.

routes.get('/perfil', celebrate({
  [Segments.HEADERS]: Joi.object({
    autorizacao: Joi.string().required(),
  }).unknown()
}),PerfilController.index)

routes.get('/casos', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    pagina: Joi.number(),
  })
}), CasosController.index)

routes.post('/casos', celebrate({
  [Segments.HEADERS]: Joi.object({
    autorizacao: Joi.string().required()
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    titulo: Joi.string().required(),
    descricao: Joi.string().required(),
    valor: Joi.number().required().min(1).max(10000000),
  })
}),CasosController.create)

routes.delete('/casos/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}), CasosController.delete)

module.exports = routes