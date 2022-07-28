module.exports = {
    bail: true,
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{ts,tsx}', '!**/node_modules/**'],
    coverageDirectory: '__tests__/coverage',
    coveragePathIgnorePatterns: ['/node_modules', '/__tests__', 'src/config', 'src/database', 'src/routes'],
    coverageThreshold: {
        global: {
            statements: 100,
            branches: 100,
            functions: 100,
            lines: 100,
        },
    },
    displayName: {
        name: '@financial-targets/accounts',
        color: 'red',
    },
    moduleFileExtensions: ['ts', 'js'],
    name: '@financial-targets/accounts',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/node_modules', '__tests__'],
    testMatch: ['**/src/**/*+(spec|test).[jt]s?(x)'],
    preset: 'ts-jest',
    verbose: true,
};
