import config from '../../config';

const mockDb = {
    on: jest.fn(),
    once: jest.fn(),
};

const setFn = jest.fn();
const connectFn = jest.fn();

jest.mock('mongoose', () => ({
    set: setFn,
    connect: connectFn,
    connection: mockDb,
}));

import createConnection from '.';

describe('Database/Mongodb', () => {
    describe('createConnection', () => {
        afterEach(() => {
            jest.resetAllMocks();
            jest.clearAllMocks();
        });

        test('should run mongodb setup correctly', () => {
            createConnection();

            expect(setFn).toHaveBeenLastCalledWith('strictQuery', true);
            expect(connectFn).toHaveBeenCalledWith(config.mongodb.connection);
            expect(mockDb.on).toBeCalled();
            expect(mockDb.once).toBeCalled();
        });
    });
});
