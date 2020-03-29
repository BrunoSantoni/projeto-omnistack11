const generateUniqueId = require('../../src/utils/generateUniqueId')

describe('Gerar ID único', () => {
  it('Deve gerar um ID único', () => { //Define o que a função deve fazer
    const id = generateUniqueId()
    expect(id).toHaveLength(8) //O que espera-se da função
  })
})