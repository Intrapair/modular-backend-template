import { describe, it, expect, jest, test, afterAll } from '@jest/globals';
import { faker } from '@faker-js/faker';
import app from '../app';
import request from 'supertest';
import assert from 'assert';

describe('GET /v1/user', () => {
    test('should create new user account', async () => {
        return request(app)
            .post('/v1/user/signup')
            .set('Content-Type', 'application/json')
            .send({
                email: faker.internet.email(),
                password: faker.internet.password(),
            })
            .expect(201)
            .expect(function (res) {
                assert(res.body.hasOwnProperty('success'));
                assert(res.body.hasOwnProperty('message'));
            });
    });

    test('should return 404 Not Found', async () => {
        return request(app)
            .get('/v1/users/all')
            .expect('Content-Type', /json/)
            .expect(404)
            .expect(function (res) {
                assert(res.body.hasOwnProperty('success'));
                assert(res.body.hasOwnProperty('message'));
            });
    });
});

afterAll(() => {
    // TODO: close db connection
});

process.once('SIGTERM', () => {
    // TODO: close db connection
});
