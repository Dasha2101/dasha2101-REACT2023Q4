/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'prettier/prettier': ['error'],
    '@typescript-eslint/no-explicit-any': 'error',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react-compiler/react-compiler': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
};