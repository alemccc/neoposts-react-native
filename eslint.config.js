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
      'comma-dangle': ['error', 'always-multiline'],
      'no-trailing-spaces': [
        'error',
        { skipBlankLines: false, ignoreComments: false },
      ],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
      'eol-last': ['error', 'always'],
      'arrow-parens': ['error', 'always'],
      'object-curly-spacing': ['error', 'always'],
      'max-len': 'off',
      'operator-linebreak': 'off',
      'no-multi-spaces': ['error', { ignoreEOLComments: false }],

      'implicit-arrow-linebreak': 'off',
      'function-paren-newline': 'off',
      'object-property-newline': 'off',
      'array-bracket-newline': 'off',
      'array-element-newline': 'off',
      'object-curly-newline': 'off',
      'newline-per-chained-call': 'off',

      curly: ['error', 'all'],
      'no-var': 'error',
      'prefer-const': 'error',
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
            {
              pattern: '@/components/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/constants/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/store/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/assets/**',
              group: 'internal',
              position: 'after',
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

      // React/JSX specific rules
      'react/jsx-indent': ['error', 2],
      'react/jsx-indent-props': ['error', 2],
      'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
    },
  },
];
