const transformIgnorePatterns = [
  '/output/',
  'node_modules/[^/]+?/(?!(es|node_modules)/)'
]

module.exports = {
  setupFiles: [ '<rootDir>/jest.setup.js' ],
  moduleFileExtensions: [ 'ts', 'tsx', 'js', 'jsx' ],
  modulePathIgnorePatterns: [ '/_site/', '/output/' ],


  testPathIgnorePatterns: [
    '/node_modules/',
    '/output/',
    '__mocks__',
    'dekko',
    'node'
  ],
  transform: {
    '^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest'
  },

  collectCoverage: true, // 是否收集测试时的覆盖率信息
  collectCoverageFrom: ['<rootDir>/components/*.js'], // 哪些文件需要收集覆盖率信息
  coverageDirectory:"<rootDir>/coverage",
  transformIgnorePatterns
}
