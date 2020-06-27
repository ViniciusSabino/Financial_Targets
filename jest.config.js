module.exports = {
    bail: true,
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx}', '!**/node_modules/**'],
    coverageDirectory: '__tests__/coverage',
    coveragePathIgnorePatterns: [
        '/node_modules',
        '/src/server.js',
        '/__tests__',
        '/src/database',
        '/src/config',
    ],
    coverageThreshold: {
        global: {
            statements: 10,
            branches: 10,
            functions: 10,
            lines: 10,
        },
    },
    displayName: {
        name: '@financial-targets/accounts',
        color: 'red',
    },
    moduleFileExtensions: ['js'],
    name: '@financial-targets/accounts',
    testEnvironment: 'node',
    testMatch: ['**/src/**/*+(spec|test).[jt]s?(x)'],
    transform: {
        '^.+\\.[t|j]sx?$': 'babel-jest',
    },
    verbose: true,
};
