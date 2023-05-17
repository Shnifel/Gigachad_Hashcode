export default {
    verbose: true,
    testEnvironment: "node",
    transform: {
        '^.+\\.js?$': 'babel-jest',
    },
    "transformIgnorePatterns": [
        "/node_modules/(?!test-component).+\\.js$",
      ],
    testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
    moduleFileExtensions: ["js", "json", "node"],
    collectCoverage: true,
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
    collectCoverageFrom: ['**/*.js'],
    coverageDirectory: 'coverage',
    coverageThreshold: {
      global: {
        statements: 0,
        branches: 0,
        functions: 0,
        lines: 0,
      },},
      coveragePathIgnorePatterns: [
        "test/",
        "node_modules/",
        "index.js",
        "database/",
        "coverage/",
        "routes/"
      ],
};
  