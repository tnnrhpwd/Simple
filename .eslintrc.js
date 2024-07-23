module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': ['error', {endOfLine: 'auto'}],
    'react/react-in-jsx-scope': 'off', // Not needed with React 17+
    'react/prop-types': 'off', // Disable prop-types as we use TypeScript for type checking
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};
