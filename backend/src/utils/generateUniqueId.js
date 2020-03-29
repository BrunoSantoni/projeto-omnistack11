const crypto = require('crypto') //Pacote de criptografia

module.exports = function generateUniqueId() {
  return id = crypto.randomBytes(4).toString('HEX')
}