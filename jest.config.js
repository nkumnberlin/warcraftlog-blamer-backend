module.exports = {
    testEnvironment: 'node',
    roots: ['<rootDir>/code/test'],
    testMatch: ['**/*.test.ts'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    transformIgnorePatterns: ["<rootDir>/node_modules/(?!dateformat)"]
};
