module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  coverageReporters: ["html", "lcov", "json-summary", "text"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 50,
      lines: 80,
      statements: 80,
    },
  },
};
