module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/code/test'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
};
