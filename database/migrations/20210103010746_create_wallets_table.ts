import * as Knex from "knex";

const tableName = 'wallets';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(tableName, table => {
        table.bigIncrements('id').primary();

        table.bigInteger('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users');

        table.double('amount', 24, 8).notNullable();
        table.timestamps();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(tableName);
}
