exports.up = function(knex) {
    return knex.schema.createTable('ongs', function(table){
        table.string('id').primary()
        table.string('nome').notNullable() //Campo não pode ser nulo
        table.string('email').notNullable()
        table.string('whatsapp').notNullable()
        table.string('cidade').notNullable()
        table.string('estado', 2).notNullable() //O 2 representa o tamanho máximo
    })
}

exports.down = function(knex) {
    return knex.dropSchema('ongs')  
}
