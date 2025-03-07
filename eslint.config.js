import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

export default [
  includeIgnoreFile(gitignorePath),
  // Base JavaScript configuration
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.es2020,
      },
    },
  },

  // Storybook configuration

  // Import plugin configuration
  {
    plugins: { import: importPlugin },
    settings: {
      'import/internal-regex': '^@example/',
    },
    rules: {
      'import/order': [
        'error',
        {
          named: true,
          'newlines-between': 'always',
          distinctGroup: true,
          warnOnUnassignedImports: true,
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'type'],
          pathGroups: [
            {
              pattern: '@example/**',
              group: 'internal',
              position: 'before',
            },
          ],
          alphabetize: {
            order: 'asc',
            orderImportKind: 'asc',
          },
        },
      ],
    },
  },

  // React and JSX accessibility configuration
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
    },
    settings: {
      react: { version: 'detect' },
      formComponents: ['Form'],
      linkComponents: [
        { name: 'Link', linkAttribute: 'to' },
        { name: 'NavLink', linkAttribute: 'to' },
      ],
      'import/resolver': {
        typescript: {},
      },
    },
  },

  // TypeScript-specific configuration
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { '@typescript-eslint': ts, import: importPlugin },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      'import/internal-regex': '^~/',
      'import/resolver': {
        node: { extensions: ['.ts', '.tsx'] },
        typescript: { alwaysTryTypes: true },
      },
    },
  },

  // Storybook-specific overrides
  {
    files: ['*.stories.*'],
    rules: {
      'import/order': [
        'error',
        {
          named: true,
          'newlines-between': 'always',
          distinctGroup: true,
          warnOnUnassignedImports: true,
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'type'],
          pathGroups: [
            {
              pattern: '@example/**',
              group: 'internal',
              position: 'before',
            },
          ],
          alphabetize: { orderImportKind: 'asc' },
        },
      ],
    },
  },
];
