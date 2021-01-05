import request from 'supertest';
import faker from 'faker';
import app from '../../../server';
import { User } from '../../../src/Models/Core/User';

const server = request(app);
let senderUser: User;
let receiverUser: User;
let token: string;

beforeEach(async () => {
    senderUser = await User.create({
        tax_number: faker.random.number(99999999999).toString(),
        email: faker.internet.email().toLowerCase(),
        name: faker.name.findName(),
        account: faker.random.arrayElement(['personal', 'company']),
        password: 'password'
    });

    receiverUser = await User.create({
        tax_number: faker.random.number(99999999999).toString(),
        email: faker.internet.email().toLowerCase(),
        name: faker.name.findName(),
        account: faker.random.arrayElement(['personal', 'company']),
        password: 'password'
    });

    await server
        .post('/auth/login')
        .send({
            grant_type: 'password',
            email: senderUser.email,
            password: 'password'
        })
        .then((response) => {
            token = response.body.token;
            console.log(token);
        });
});

afterEach(async () => {
    User.findByPk(senderUser.id).then((user) => {
        user?.destroy()
    });
    User.findByPk(receiverUser.id).then((user) => {
        user?.destroy()
    });
});

describe('TransferController', () => {
    test('Create a new transfer', async (done) => {
        await server
            .post('/transfers')
            .set('Authorization', token)
            .send({
                document: '',
                amount: ''
            })
            .then((response) => {
                expect(response.status).toBe(201);
            });

        done();
    });
});
