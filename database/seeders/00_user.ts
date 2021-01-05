import * as Knex from "knex";
import bcrypt from 'bcryptjs';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        {
            id: 1,
            name: 'Test',
            account: 'personal',
            tax_number: '00000000000',
            email: 'test@test.com',
            password: bcrypt.hashSync('password', 8)
        },
        {
            id: 2,
            name: 'Test Company',
            account: 'company',
            tax_number: '00000000000000',
            email: 'test-company@test.com',
            password: bcrypt.hashSync('password', 8)
        }
    ]);
};
