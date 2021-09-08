module.exports = {
  setupFilesAfterEnv: [
    'given2/setup',
    'jest-plugin-context/setup',
  ],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
};
