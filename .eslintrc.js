module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-param-reassign': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    'no-restricted-globals': 'off',
    'class-methods-use-this': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-plusplus': 'off',
    'no-continue': 'off',
    'no-tabs': 'off',
    'no-bitwise': 'off',
    'no-debugger': 'off',
    'no-alert': 'off',
    '@typescript-eslint/no-explicit-any': 0,
    'no-useless-escape': 'off',
    'max-len': 0,
    'radix': 0,
    'linebreak-style': 0,
    'indent': 'off',
    'no-eval': 'off',
    'no-loop-func': 'off',
    'no-restricted-syntax': 'off',
    'guard-for-in': 'off',
    'import/prefer-default-export': 'off',
    eqeqeq: 'off',
    // "import/extensions": 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        vue: 'always',
      }
    ],
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
