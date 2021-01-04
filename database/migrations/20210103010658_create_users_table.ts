import { table } from "console";
import * as Knex from "knex";

const tableName = 'users';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(tableName, table => {
        table.bigIncrements('id').primary();
        table.enum('account', ['personal', 'company']).defaultTo('personal').notNullable();
        table.string('tax_number').notNullable().unique();
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.timestamps();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(tableName);
}
