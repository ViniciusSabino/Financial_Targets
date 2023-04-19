module.exports = {
    bail: true,
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{ts,tsx}', '!**/node_modules/**'],
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: ['/node_modules', 'src/app.ts', 'src/server.ts'],
    coverageThreshold: {
        global: {
            statements: 90,
            branches: 80,
            functions: 90,
            lines: 90,
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
    setupFiles: ['<rootDir>/.jest/setEnvVars.ts'],
};
