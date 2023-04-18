import request from 'supertest';
import { app } from '../../server';
import config from '../../config';
import HttpStatus from '../../utils/enums/httpStatus';
import { createCheckingAccountSchema } from './schemas';
import ErrorType from '../../utils/enums/errorType';
import service from '../../services/accounts/service';
import { AccountType } from '../../utils/enums/accounts';
import { findUserById } from '../../services/common/user/queries';
import { User } from '../../database/models/User';
import { ObjectId } from 'mongodb';

jest.mock('../../database/mongodb');
jest.mock('./schemas');
jest.mock('../../services/common/user/queries');
jest.mock('../../services/accounts/service');

const validateAsyncMock = createCheckingAccountSchema.validateAsync as jest.Mock;
const createCheckingAccountMock = service.createCheckingAccount as jest.Mock;
const findUserByIdMock = findUserById as jest.Mock;

const server = app.listen(config.port);

const user: User = {
    _id: new ObjectId('642af20b563a13c68d14b225'),
    name: 'User 1',
    email: 'email@test.com',
};

describe('Validators/Accounts', () => {
    afterAll(() => {
        server.close();
    });

    describe('Handler', () => {
        afterEach(() => {
            jest.resetAllMocks();
            jest.clearAllMocks();
        });

        test('should return a BAD_REQUEST error when trying to create an account without a required field', async () => {
            validateAsyncMock.mockRejectedValue(new Error('Missing isMain'));
            findUserByIdMock.mockResolvedValue(user);

            const response = await request(server)
                .post('/api/private/accounts/checking/create')
                .send({
                    name: 'Account 1',
                    //IsMain: true,
                })
                .set('userId', '642af20b563a13c68d14b225');

            expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
            expect(response.body).toEqual({ message: 'Missing isMain', type: ErrorType.VALIDATION_ERROR });
        });

        test('should return OK when trying to create an account with the correct data', async () => {
            validateAsyncMock.mockResolvedValue('Ok');
            findUserByIdMock.mockResolvedValue(user);
            createCheckingAccountMock.mockResolvedValue({
                id: '642b271e4ac7dac0aa4ce3e9',
                name: 'Account 1',
                type: AccountType.CHECKING_ACCOUNT,
                isMain: true,
                userId: '642af20b563a13c68d14b225',
            });

            const response = await request(server)
                .post('/api/private/accounts/checking/create')
                .send({
                    name: 'Account 1',
                    isMain: true,
                })
                .set('userId', '642af20b563a13c68d14b225');

            expect(response.status).toEqual(HttpStatus.OK);
            expect(response.body).toEqual({
                id: '642b271e4ac7dac0aa4ce3e9',
                name: 'Account 1',
                type: AccountType.CHECKING_ACCOUNT,
                isMain: true,
                userId: '642af20b563a13c68d14b225',
            });
        });
    });
});
