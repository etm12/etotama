module.exports = {
  "collectCoverageFrom": [
    "**/*.{js,jsx}",
    "!**/jest.config.js",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/coverage/**"
  ],
  // "moduleFileExtensions": [
  //   "js",
  //   "scss"
  // ],
  // "transform": {
  //   "^.+\\.scss$": "sass-jest"
  // },
  // "testRegex": "__tests__/.*\\.(js|scss)$",
  "testEnvironment": "node",
};
