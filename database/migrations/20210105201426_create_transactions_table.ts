import { TransactionType } from './../../src/Enums/TypeTransaction';
import * as Knex from "knex";
import { string } from "mathjs";

const tableName = 'transactions';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(tableName, table => {
        table.bigIncrements('id').primary();

        table.bigInteger('deposit_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('deposits');

        table.bigInteger('withdraw_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('withdraws');

        table.enum('type', [TransactionType.DEPOSIT, TransactionType.TRANSFER, TransactionType.WITHDRAW])
            .defaultTo(TransactionType.DEPOSIT)
            .notNullable();

        table.decimal('amount', 24, 8).notNullable();
        table.string('txid').notNullable();
        table.timestamps();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(tableName);
}

