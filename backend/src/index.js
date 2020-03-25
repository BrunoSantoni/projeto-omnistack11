const express = require('express') //Importando framework express
const cors = require('cors')
const routes = require('./routes')

const app = express() //Instaciando a aplicação

app.use(cors())
app.use(express.json())
app.use(routes)



app.listen(3333) //Configura para acessar a aplicação na porta 3333, ou seja: localhost:3333
//Não é recomendável rodar direto na porta 80, é bom separar.

//node index.js executa a aplicação