import { TransactionType } from './../../src/Enums/TypeTransaction';
import * as Knex from "knex";

const tableName = 'withdraws';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(tableName, table => {
        table.bigIncrements('id').primary();

        table.bigInteger('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users');

        table.decimal('amount', 24, 8).notNullable();
        table.decimal('fee', 24, 8).defaultTo(0);

        table.enum('type', [TransactionType.TRANSFER, TransactionType.WITHDRAW])
            .notNullable()
            .defaultTo(TransactionType.WITHDRAW);

        table.string('txid').notNullable();
        table.timestamps();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(tableName);
}
