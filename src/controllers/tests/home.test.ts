import request from 'supertest';

import config from '../../config';
import { app } from '../../server';
import HttpStatus from '../../utils/enums/httpStatus';

jest.mock('../../database/mongodb');

const server = app.listen(config.port);

const API_BASE_URL = '/api/public/home';

describe('Controller/Home', () => {
    afterAll(() => {
        server.close();
    });

    describe('Current', () => {
        afterEach(() => {
            jest.resetAllMocks();
            jest.clearAllMocks();
        });

        test('Success GET: 200', async () => {
            const response: request.Response = await request(server).get(API_BASE_URL);

            expect(response.status).toBe(HttpStatus.OK);
            expect(response.body).toEqual({
                name: 'Financial Targets - Accounts API',
                environment: 'test',
                port: 3333,
            });
        });
    });
});
