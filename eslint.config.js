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
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'no-var': 'error',
      'prefer-const': 'error',
      'no-trailing-spaces': 'error',
      'object-shorthand': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
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
