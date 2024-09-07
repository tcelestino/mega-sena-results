module.exports = {
  extends: ['airbnb-base', 'prettier', 'plugin:prettier/recommended'],
  env: {
    browser: false,
    node: true,
  },
  rules: {
    'no-unused-expressions': 'off',
    'no-undef': 'off',
    'no-plusplus': 'off',
    'no-console': 'off',
    'max-len': ['error', { code: 120, ignoreUrls: true, ignoreStrings: true }],
    'object-curly-newline': ['error', { consistent: true }],
    'spaced-comment': ['error', 'always', { markers: ['/'] }],
    'import/no-extraneous-dependencies': ['off', { devDependencies: ['**/*.test.js', '**/*.spec.js'] }],
    'import/extensions': ['error', 'ignorePackages', { js: 'never' }],
  },
  ignorePatterns: ['node_modules/*'],
  overrides: [
    {
      files: ['*.test.js'],
      rules: {
        'no-unused-expressions': 'off',
      },
    },
  ],
};
