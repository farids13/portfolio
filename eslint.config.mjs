import pluginNext from '@next/eslint-plugin-next';
import tseslint from '@typescript-eslint/eslint-plugin';
import parserTs from '@typescript-eslint/parser';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';

export default [
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    ignores: ['node_modules', '.next', 'out', 'dist', 'build'],
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      '@next/next': pluginNext,
      '@typescript-eslint': tseslint,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
      'unused-imports': unusedImports,
    },
    rules: {
      /* 🧹 Clean Code & Readability */
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'curly': ['error', 'all'],
      'eqeqeq': ['error', 'always'],
      'prefer-const': 'error',
      'no-var': 'error',
      'no-unused-expressions': 'error',

      /* ⚙️ Imports & Architecture */
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',  // node modules
            'external', // npm deps
            'internal', // aliases (like @/lib)
            ['parent', 'sibling'],
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/no-default-export': 'off', // optional: enforce named exports
      'import/no-cycle': ['error', { maxDepth: 1 }],

      /* 🧠 TypeScript */
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',

      /* ⚡ Performance & Core Web Vitals */
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@next/next/no-img-element': 'error',
      '@next/next/no-document-import-in-page': 'error',
      '@next/next/no-page-custom-font': 'error',

      /* 🧩 Unused Imports */
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
      ],

      /* ♿ Accessibility */
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/anchor-is-valid': 'warn',
      'jsx-a11y/no-autofocus': 'warn',
    },
    settings: {
      next: { rootDir: ['apps/*/', './'] },
      react: { version: 'detect' },
      'import/resolver': { node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] } },
    },
  },
];
