import { ObjectId } from 'mongodb';

import { User } from '../../../database/models/User';

const leanFn = jest.fn();
const findByIdFn = jest.fn(() => ({ lean: leanFn }));

jest.mock('../../../database/models/User', () => ({
    findById: findByIdFn,
}));

import { findUserById } from './queries';

describe('Services/Common', () => {
    describe('Queries', () => {
        test('findUserById', async () => {
            const id = '63b9ccddded659502ab36160';

            const userMock: User = {
                _id: new ObjectId('62019c68cfdad112f35788e4'),
                name: 'Teste 1',
                email: 'teste1@teste',
            };

            leanFn.mockResolvedValue(userMock);

            const user = await findUserById(id);

            expect(findByIdFn).toHaveBeenCalledWith(id);
            expect(leanFn).toBeCalled();
            expect(user).toEqual(userMock);
        });
    });
});
