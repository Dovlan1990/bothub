module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    requireConfigFile: false,
    ecmaVersion: 8,
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'import'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 0 }],
    'prettier/prettier': ['error'],
    '@typescript-eslint/no-unused-vars': 'error',
    'object-shorthand': ['error', 'always'],
    'no-return-await': 'error',
    'require-await': 'warn',
    'no-param-reassign': 'warn', // needs to be discussed, should be warn
    '@typescript-eslint/no-use-before-define': 'error',
    'class-methods-use-this': 'off', // needs to be discussed
    '@typescript-eslint/no-shadow': 'error',
    'import/no-cycle': 'warn', // needs to be discussed, should be warn
    'guard-for-in': 'error',
    'no-useless-escape': 'error',
    'no-promise-executor-return': 'warn', // needs to be discussed
    '@typescript-eslint/no-var-requires': 'error',
    'import/prefer-default-export': 'off', // should be off
    'prefer-destructuring': 'error',
    '@typescript-eslint/dot-notation': 'off', // should be off
    'import/no-extraneous-dependencies': 'error',
    'no-underscore-dangle': 'off', // should be off
    'no-restricted-syntax': 'error',
    'no-continue': 'off',
    'no-await-in-loop': 'warn', // needs to be discussed
    radix: 'error',
    'consistent-return': 'off', // not valid for typescript
    'no-restricted-globals': 'error',
    '@typescript-eslint/ban-types': ['error', { extendDefaults: true, types: { '{}': false } }],
    '@typescript-eslint/no-unused-expressions': 'warn', // suggest turning off error to allow concise ternary instead of if/else
    'import/extensions': 'off', // needs to be discussed
    'no-unused-expressions': 'error',
    'no-unused-private-class-members': 'error',
    'no-console': 'error', // TODO should be error
  },
};
