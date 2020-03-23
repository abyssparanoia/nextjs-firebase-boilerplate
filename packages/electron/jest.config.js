module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  clearMocks: true,
  moduleNameMapper: {
    '^src/(.+)': '<rootDir>/src/$1',
    '^@renderer/(.+)': '<rootDir>/src/renderer/$1',
    '\\.(css|less)$': 'identity-obj-proxy'
  }
}
