const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['**/*.spec.ts', '**/*.spec.tsx'],
  moduleNameMapper: {
    'react-markdown': '<rootDir>/node_modules/react-markdown/index.js',
  },
  testPathIgnorePatterns: ['<rootDir>/__tests__/fixtures/'],
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\](?!(bail|ccount|character-entities|comma-separated-tokens|decode-named-*|escape-string-regexp|hast-util-*|is-plain-obj|markdown*|mdast-util-*|micromark*|property-information|react-markdown|remark-*|space-separated-*|trim-lines|trough|unified*|unist-util-*|vfile))',
  ],
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: ['<rootDir>/src/lib/constants.ts', '<rootDir>/src/interfaces/'],
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
