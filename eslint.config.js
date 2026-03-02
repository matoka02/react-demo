import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import testingLibraryPlugin from 'eslint-plugin-testing-library';
import jestDomPlugin from 'eslint-plugin-jest-dom';
import importPlugin from 'eslint-plugin-import';

export default [
  {
    files: [
      'src/**/*.{ts,tsx,js,jsx}',
      'pages/**/*.{ts,tsx,js,jsx}',
      'components/**/*.{ts,tsx,js,jsx}',
      // '**/*.spec.{js,jsx,ts,tsx}',
    ],
    ignores: [
      'node_modules/**',
      '.next/**',
      'storybook-static/**',
      'docker-compose.yml',
      'pnpm-lock.yaml',
      '.github/**',
      'artillery/**',
    ],
    languageOptions: {
      // parser: '@typescript-eslint/parser',
      parser: tsParser,
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module', ecmaFeatures: { jsx: true } },
      globals: {
        NodeJS: true,
        browser: true,
        jest: true,
      },
    },
    plugins: {
      // '@typescript-eslint': typescriptPlugin,
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      'testing-library': testingLibraryPlugin,
      'jest-dom': jestDomPlugin,
      import: importPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      'linebreak-style': ['error', 'unix'],
      'react/prop-types': 'off',

      'import/extensions': ['error', 'ignorePackages', { tsx: 'never', ts: 'never' }],

      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: ['**/*.stories.*', '**/.storybook/**/*', '**/*.test.*'],
        },
      ],

      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      // 'no-restricted-imports': ['error', { patterns: ['@/features/*/*'] }],
      'import/default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-named-as-default': 'off',

      'react/react-in-jsx-scope': 'off',
      'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],

      'jsx-a11y/anchor-is-valid': 'off',

      '@typescript-eslint/no-unused-vars': ['error'],

      '@typescript-eslint/explicit-function-return-type': ['off'],
      '@typescript-eslint/explicit-module-boundary-types': ['off'],
      '@typescript-eslint/no-empty-function': ['off'],
      '@typescript-eslint/no-explicit-any': ['off'],
      '@typescript-eslint/no-var-requires': ['off'],
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        node: { extensions: ['.ts', '.tsx', '.js', '.jsx'] },
        typescript: {},
      },
    },
  },
];
