import bcrypt from 'bcryptjs';
import request from 'supertest';
import app from './../../../server';
import faker from 'faker';
import User from '../../../src/Models/Core/User';

const server = request(app);
let user: User;

beforeEach(async () => {
    user = await User.create({
        tax_number: faker.random.number(99999999999).toString(),
        email: faker.internet.email().toLowerCase(),
        name: faker.name.findName(),
        account: faker.random.arrayElement(['personal', 'company']),
        password: bcrypt.hashSync('password', 8)
    })
})

describe('AuthController', () => {
    test('Authenticate with success', async (done) => {
        await server
            .post('/auth/login')
            .send({
                grant_type: 'password',
                email: user.email,
                password: 'password'
            })
            .then((response) => {
                expect(response.status).toBe(201);
                done();
            });
    });
});
