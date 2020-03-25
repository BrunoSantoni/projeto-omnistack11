exports.up = function(knex) {
    return knex.schema.createTable('casos', function(table){
        table.increments()
        table.string('titulo').notNullable()
        table.string('descricao').notNullable()
        table.decimal('valor').notNullable()

        table.string('ong_id').notNullable() //FK do ID da ONG
        table.foreign('ong_id').references('id').inTable('ongs')
        //Chave estrangeira ong_id é uma refêrencia para id na tabela ongs
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('casos')
}