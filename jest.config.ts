/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  clearMocks: true, // automatically clear mock calls, instances and results before every test
  collectCoverage: true, // indicates whether the coverage information should be collected while executing the test
  coverageDirectory: 'coverage', // the directory where Jest should output its coverage files
  testEnvironment: 'jsdom', // the test environment that will be used for testing
  testResultsProcessor: undefined,
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  transform: { '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest' },
};
