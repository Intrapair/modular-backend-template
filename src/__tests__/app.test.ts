import { describe, it, expect, jest, test } from '@jest/globals';
import app from '../app';
import request from 'supertest';

describe('GET /', () => {
    test('should return 200 OK', () => {
        return request(app).get('/').expect(200);
    });
});

describe('GET /404', () => {
    test('should return 404 Not Found', () => {
        return request(app).get('/404').expect(404);
    });
});
