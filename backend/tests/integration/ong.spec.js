const request = require('supertest')
const app = require('../../src/app')
const conexao = require('../../src/database/conexao')

describe('ONG', () => {
  beforeEach(async () => { //Antes de cada teste
    await conexao.migrate.rollback()
    await conexao.migrate.latest()
  })

  afterAll(async () => { //Depois de todos os testes
    await conexao.destroy()
  })


  it('Deve ser capaz de criar uma nova ONG', async () => {
    const response = await request(app).post('/ongs').send({
      nome: "Alo teste",
      email: "teste@teste.com",
      whatsapp: "15996632122",
      cidade: "Itapetininga",
      estado: "SP"
    })

    expect(response.body).toHaveProperty('id')
    expect(response.body.id).toHaveLength(8)
  })
})