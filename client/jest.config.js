module.exports = {
    verbose: true,
    testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
    collectCoverage: true,
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
    collectCoverageFrom: ['src/**/*.js'],
    coverageDirectory: 'coverage',
    coverageThreshold: {
      global: {
        statements: 0,
        branches: 0,
        functions: 0,
        lines: 0,
      },
    },
    coveragePathIgnorePatterns: [
      "test/",
      "node_modules/",
      "src/components/",
      "src/assets/",
      "src/App.js",
      "src/pages/Login.js",
      "src/pages/Register.js",
      "src/pages/adminViews",
      "src/pages/Dashboard.js",
      "src/pages/Teams.js",
      "stateManagement/",
      "src/pages/Home",
      "src/pages/Competitions",
      "src/pages/CompetitionsAdmin",
      "src/pages/ProfilePage.js",
      "src/routes/"

  

    ],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
    },
  };