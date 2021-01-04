import request from 'supertest';
import app from '../../server';
import faker from 'faker';

const server = request(app);
const taxNumber = faker.random.number(99999999999).toString();
const email = faker.internet.email().toLowerCase();
const body = {
    tax_number: taxNumber,
    email,
    name: faker.name.findName(),
    account: faker.random.arrayElement(['personal', 'company']),
    password: faker.internet.password(8)
};

describe('UserController', () => {
    test('Create a new user with success', async (done) => {
        await server
            .post('/users')
            .send(body)
            .then((response) => {
                expect(response.status).toBe(201);
                expect(response.body).toEqual({
                    id: response.body.id,
                    tax_number: body.tax_number,
                    account: body.account,
                    name: body.name,
                    email: body.email
                });
                done();
            });
    });

    test('Email data conflict found', async (done) => {
        body.tax_number = faker.random.number(20).toString();
        await server
            .post('/users')
            .send(body)
            .then((response) => {
                expect(response.status).toBe(400);
                done();
            });
    });

    test('Tax number data conflict found', async (done) => {
        body.tax_number = taxNumber;
        body.email = faker.internet.email().toLowerCase();
        await server
            .post('/users')
            .send(body)
            .then((response) => {
                expect(response.status).toBe(400);
                done();
            });
    });

    test('Invalid body', async (done) => {
        await server
            .post('/users')
            .send({
                taxnumber: taxNumber,
                name: faker.name.findName(),
                account: faker.random.arrayElement(['pizza', 'day']),
                grant_type: faker.internet.password(8)
            })
            .then((response) => {
                expect(response.status).toBe(400);
                done();
            });
    });
});
