import * as Knex from "knex";

const tableName = 'deposits';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(tableName, table => {
        table.bigIncrements('id').primary();

        table.bigInteger('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users');

        table.double('amount', 24, 8).notNullable();
        table.double('fee', 24, 8).defaultTo(0);
        table.enum('type', ['transfer', 'deposit']).notNullable().defaultTo('deposit');

        table.timestamps();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(tableName);
}
