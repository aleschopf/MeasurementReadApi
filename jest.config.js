module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'fetch': fetch,
  },
  testMatch: ['**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  setupFiles: ['<rootDir>/jest.setup.js'],
};
