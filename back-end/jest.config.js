const { createDefaultPreset } = require("ts-jest");

/** @type {import("jest").Config} */
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {
      tsconfig: "./tsconfig.json",
    }],
  },
  testMatch: ["**/tests/**/*.test.ts"],
  clearMocks: true,
};