const express = require('express') //Importando framework express

const OngController = require('./controllers/OngController')
const CasosController = require('./controllers/CasosController')
const PerfilController = require('./controllers/PerfilController')
const SessaoController = require('./controllers/SessaoController')

const routes = express.Router()

routes.post('/login', SessaoController.create) //post pois cria uma sessão

routes.get('/ongs', OngController.index) //Rota do tipo post pois quer listar algo
routes.post('/ongs', OngController.create) //Rota do tipo post pois quer inserir algo, acessando o método create do controlador.

routes.get('/perfil', PerfilController.index)

routes.get('/casos', CasosController.index)
routes.post('/casos', CasosController.create)
routes.delete('/casos/:id', CasosController.delete)

module.exports = routes