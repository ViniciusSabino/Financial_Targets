import request from 'supertest';

import ErrorType from '../utils/enums/errorType';
import { createdBalanceResult, currentBalancesMock, currentBalancesResponse, userMock } from './mocks/balances-mock';

const findUserByIdFn = jest.fn();
const getCurrentBalancesFn = jest.fn();

const createFn = jest.fn();

jest.mock('../services/common/user/queries', () => ({
    findUserById: findUserByIdFn,
}));

jest.mock('../services/balances/service', () => ({
    getCurrentBalances: getCurrentBalancesFn,
    create: createFn,
}));

import { createApp } from '../app';
import { BalanceInput } from '../services/balances/service';
import { Months } from '../utils/enums/date';

const app = createApp();

const API_BASE_URL = '/api/private/balances/';

describe('Controller/Balances', () => {
    describe('Current', () => {
        test('Success GET: 200', async () => {
            findUserByIdFn.mockResolvedValue(userMock);
            getCurrentBalancesFn.mockResolvedValue(currentBalancesMock);

            const response: request.Response = await request(app.callback()).get(`${API_BASE_URL}current`).set({
                userId: '62019c68cfdad112f35788e4',
            });

            expect(getCurrentBalancesFn).toHaveBeenCalledWith('62019c68cfdad112f35788e4');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(currentBalancesResponse);
        });

        test('Internal Server Error GET: 500', async () => {
            findUserByIdFn.mockResolvedValue(userMock);
            getCurrentBalancesFn.mockRejectedValue('ERROR INTERNAL');

            const response: request.Response = await request(app.callback()).get('/api/private/balances/current').set({
                userId: '62019c68cfdad112f35788e4',
            });

            expect(getCurrentBalancesFn).toHaveBeenCalledWith('62019c68cfdad112f35788e4');
            expect(response.status).toBe(500);
            expect(response.body).toEqual({
                name: 'ApiError',
                type: ErrorType.INTERNAL_ERROR,
                message: 'There was an unexpected error. Please try again',
            });
        });
    });

    describe('Create', () => {
        test('Success POST: 200', async () => {
            const balanceEntries: BalanceInput = {
                accountId: '6201ab50b6ca16e5f08ad33f',
                month: Months.JANUARY,
                year: 2023,
                value: 293.0,
            };

            createFn.mockResolvedValue(createdBalanceResult);

            const response: request.Response = await request(app.callback())
                .post(`${API_BASE_URL}create`)
                .set({
                    userId: '62019c68cfdad112f35788e4',
                })
                .send(balanceEntries);

            expect(createFn).toHaveBeenCalledWith(balanceEntries);
            expect(response.body).toEqual(createdBalanceResult);
        });

        test('Internal Server Error POST: 500', async () => {
            const balanceEntries: BalanceInput = {
                accountId: '6201ab50b6ca16e5f08ad33f',
                month: Months.JANUARY,
                year: 2023,
                value: 293.0,
            };

            createFn.mockRejectedValue('ERROR INTERNAL');

            const response: request.Response = await request(app.callback())
                .post(`${API_BASE_URL}create`)
                .set({
                    userId: '62019c68cfdad112f35788e4',
                })
                .send(balanceEntries);

            expect(createFn).toHaveBeenCalledWith(balanceEntries);
            expect(response.body).toEqual({
                name: 'ApiError',
                type: ErrorType.INTERNAL_ERROR,
                message: 'There was an unexpected error. Please try again',
            });
        });
    });
});
