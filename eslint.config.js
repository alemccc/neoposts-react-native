import js from '@eslint/js';
import expo from 'eslint-config-expo/flat.js';

export default [
  js.configs.recommended,
  ...expo,
  {
    ignores: ['dist', 'node_modules'],
    rules: {
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      indent: ['error', 2],
      'comma-dangle': ['error', 'always-multiline'],
      'no-trailing-spaces': 'error',
      'arrow-parens': ['error', 'always'],
      'object-curly-spacing': ['error', true],

      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'no-var': 'error',
      'prefer-const': 'error',
      'object-shorthand': 'error',
      'arrow-body-style': ['error', 'as-needed'],

      'object-curly-newline': [
        'error',
        {
          ImportDeclaration: { minProperties: 3, multiline: true },
          ExportDeclaration: { minProperties: 3, multiline: true },
        },
      ],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'react-native',
              group: 'external',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['react', 'react-native'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
];
