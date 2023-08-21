module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  coverageReporters: ["html"],
  coverageThreshold: {
    global: {
      lines: 85,
    },
  },
};
