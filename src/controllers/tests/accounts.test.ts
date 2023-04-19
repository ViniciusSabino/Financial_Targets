/* eslint-disable max-lines */

import { ObjectId } from 'mongodb';
import request from 'supertest';

import config from '../../config';
import { User } from '../../database/models/User';
import { app } from '../../server';
import { AccountMapped } from '../../services/accounts/mapper';
import service from '../../services/accounts/service';
import { findUserById } from '../../services/common/user/queries';
import { AccountType } from '../../utils/enums/accounts';
import HttpStatus from '../../utils/enums/httpStatus';

jest.mock('../../database/mongodb');
jest.mock('../../services/accounts/service');
jest.mock('../../services/common/user/queries');

const createCheckingAccountFn = service.createCheckingAccount as jest.Mock;
const listAllAccountsFn = service.listAllAccounts as jest.Mock;
const findUserByIdFn = findUserById as jest.Mock;

const server = app.listen(config.port);

const API_BASE_URL = '/api/private/accounts';

const user: User = {
    _id: new ObjectId('62019c68cfdad112f35788e4'),
    name: 'User 1',
    email: 'email@test.com',
};

describe('Controller/Accounts', () => {
    afterAll(() => {
        server.close();
    });

    describe('createCheckingAccount', () => {
        afterEach(() => {
            jest.resetAllMocks();
            jest.clearAllMocks();
        });

        test('Success POST: 200', async () => {
            findUserByIdFn.mockResolvedValue(user);

            const accountMock: AccountMapped = {
                id: new ObjectId('642b271e4ac7dac0aa4ce3e9'),
                name: 'Account 1',
                type: AccountType.CHECKING_ACCOUNT,
                isMain: true,
                userId: new ObjectId('62019c68cfdad112f35788e4'),
            };

            createCheckingAccountFn.mockResolvedValue(accountMock);

            const response = await request(server)
                .post(`${API_BASE_URL}/checking/create`)
                .send({
                    name: 'Account 1',
                    isMain: true,
                })
                .set({
                    userId: '62019c68cfdad112f35788e4',
                });

            expect(createCheckingAccountFn).toHaveBeenCalledWith(
                { isMain: true, name: 'Account 1', type: AccountType.CHECKING_ACCOUNT },
                '62019c68cfdad112f35788e4'
            );
            expect(response.status).toBe(HttpStatus.OK);
            expect(response.body).toEqual({
                id: '642b271e4ac7dac0aa4ce3e9',
                name: 'Account 1',
                type: AccountType.CHECKING_ACCOUNT,
                isMain: true,
                userId: '62019c68cfdad112f35788e4',
            });
        });
    });

    describe('listAllAccounts', () => {
        afterEach(() => {
            jest.resetAllMocks();
            jest.clearAllMocks();
        });

        test('Success POST: 200', async () => {
            findUserByIdFn.mockResolvedValue(user);

            const accountsMock: Array<AccountMapped> = [
                {
                    id: new ObjectId('642b271e4ac7dac0aa4ce3e9'),
                    name: 'Account 1',
                    type: AccountType.CHECKING_ACCOUNT,
                    isMain: true,
                    userId: new ObjectId('62019c68cfdad112f35788e4'),
                },
                {
                    id: new ObjectId('642b271e4ac7dac0aa4ce3e8'),
                    name: 'Account 2',
                    type: AccountType.CHECKING_ACCOUNT,
                    isMain: false,
                    userId: new ObjectId('62019c68cfdad112f35788e4'),
                },
            ];

            listAllAccountsFn.mockResolvedValue(accountsMock);

            const response = await request(server).get(`${API_BASE_URL}/all`).set({
                userId: '62019c68cfdad112f35788e4',
            });

            expect(listAllAccountsFn).toHaveBeenCalledWith('62019c68cfdad112f35788e4');
            expect(response.status).toBe(HttpStatus.OK);
            expect(response.body).toEqual([
                {
                    id: '642b271e4ac7dac0aa4ce3e9',
                    name: 'Account 1',
                    type: AccountType.CHECKING_ACCOUNT,
                    isMain: true,
                    userId: '62019c68cfdad112f35788e4',
                },
                {
                    id: '642b271e4ac7dac0aa4ce3e8',
                    name: 'Account 2',
                    type: AccountType.CHECKING_ACCOUNT,
                    isMain: false,
                    userId: '62019c68cfdad112f35788e4',
                },
            ]);
        });
    });
});
