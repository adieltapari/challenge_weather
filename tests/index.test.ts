import request from 'supertest';
import { describe, expect, test } from '@jest/globals';

import app from '../src/app';

describe('GET /', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(app).get('/').send();
    expect(response.statusCode).toBe(200);
  });
});
