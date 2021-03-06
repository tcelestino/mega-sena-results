module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  env: {
    browser: true,
    node: true,
  },
  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.ts'] },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.js']
    }
  },
  rules: {
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': ['error'],
    '@typescript-eslint/ban-ts-ignore': ['off'],
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/no-non-null-assertion': ['off'],
    '@typescript-eslint/no-unused-vars': 'error',
    'max-len': ['error', { code: 120, ignoreUrls: true, ignoreStrings: true }],
    'object-curly-newline': ['error', { consistent: true }],
    'spaced-comment': ['error', 'always', { markers: ['/'] }],
    'import/no-extraneous-dependencies': ['off', { devDependencies: ['**/*.test.ts', '**/*.spec.ts'] }],
    'import/extensions': ['error', 'ignorePackages', { js: 'never', ts: 'never' }],
  },
  overrides: [
    {
      files: ['*.test.ts'],
      rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
      },
    },
  ],
}
