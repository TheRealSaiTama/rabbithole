export default [
  { ignores: ['node_modules/**'] },
  {
    files: ['**/*.mjs'],
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    rules: {
      'no-unused-vars': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      eqeqeq: 'error',
    },
  },
];
