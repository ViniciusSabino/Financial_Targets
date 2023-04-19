/* eslint-disable max-lines */

import request from 'supertest';
import { ObjectId } from 'mongodb';

import config from '../../config';
import { app } from '../../server';
import service, { BalanceInput } from '../../services/balances/service';
import { Months } from '../../utils/enums/date';
import { User } from '../../database/models/User';
import { findUserById } from '../../services/common/user/queries';
import { CurrentBalanceTypes } from '../../utils/enums/balances';
import HttpStatus from '../../utils/enums/httpStatus';

jest.mock('../../database/mongodb');
jest.mock('../../services/balances/service');
jest.mock('../../services/common/user/queries');

const findUserByIdFn = findUserById as jest.Mock;
const getCurrentBalancesFn = service.getCurrentBalances as jest.Mock;
const createFn = service.create as jest.Mock;

const server = app.listen(config.port);

const API_BASE_URL = '/api/private/balances';

const user: User = {
    _id: new ObjectId('62019c68cfdad112f35788e4'),
    name: 'User 1',
    email: 'email@test.com',
};

describe('Controller/Balances', () => {
    afterAll(() => {
        server.close();
    });

    describe('Current', () => {
        afterEach(() => {
            jest.resetAllMocks();
            jest.clearAllMocks();
        });

        test('Success GET: 200', async () => {
            findUserByIdFn.mockResolvedValue(user);
            getCurrentBalancesFn.mockResolvedValue({
                month: Months.JANUARY,
                year: 2023,
                accounts: [
                    {
                        id: new ObjectId('63b9cc70705a4a72ced3f5d3'),
                        accountId: new ObjectId('63b9cc77f18245c1e38e9f13'),
                        name: 'Conta 1',
                        type: CurrentBalanceTypes.ACCOUNT,
                        value: 230.1,
                        isMain: true,
                    },
                ],
                investments: [],
            });

            const response: request.Response = await request(server).get(`${API_BASE_URL}/current`).set({
                userId: '62019c68cfdad112f35788e4',
            });

            expect(getCurrentBalancesFn).toHaveBeenCalledWith('62019c68cfdad112f35788e4');
            expect(response.status).toBe(HttpStatus.OK);
            expect(response.body).toEqual({
                month: Months.JANUARY,
                year: 2023,
                accounts: [
                    {
                        id: '63b9cc70705a4a72ced3f5d3',
                        accountId: '63b9cc77f18245c1e38e9f13',
                        name: 'Conta 1',
                        type: CurrentBalanceTypes.ACCOUNT,
                        value: 230.1,
                        isMain: true,
                    },
                ],
                investments: [],
            });
        });
    });

    describe('Create', () => {
        afterEach(() => {
            jest.resetAllMocks();
            jest.clearAllMocks();
        });

        test('Success POST: 200', async () => {
            findUserByIdFn.mockResolvedValue(user);

            const balanceEntries: BalanceInput = {
                accountId: '63b9cc77f18245c1e38e9f13',
                month: Months.JANUARY,
                year: 2023,
                value: 293.0,
            };

            createFn.mockResolvedValue({
                id: new ObjectId('63b9cc70705a4a72ced3f5d3'),
                accountId: new ObjectId('63b9cc77f18245c1e38e9f13'),
                month: Months.JANUARY,
                year: 2023,
                value: 293.0,
            });

            const response: request.Response = await request(server)
                .post(`${API_BASE_URL}/create`)
                .set({
                    userId: '62019c68cfdad112f35788e4',
                })
                .send(balanceEntries);

            expect(createFn).toHaveBeenCalledWith(balanceEntries);
            expect(response.status).toEqual(HttpStatus.OK);
            expect(response.body).toEqual({
                id: '63b9cc70705a4a72ced3f5d3',
                accountId: '63b9cc77f18245c1e38e9f13',
                month: Months.JANUARY,
                year: 2023,
                value: 293.0,
            });
        });
    });
});
