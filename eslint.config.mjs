import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
    globalIgnores([
        '**/node_modules/**',
        '.pnp/**',
        '.pnp.js',
        'coverage/**',
        'build/**',
        '**/.DS_Store',
        '.env.local',
        '.env.development.local',
        '.env.test.local',
        '.env.production.local',
        'npm-debug.log*',
        'yarn-debug.log*',
        'yarn-error.log*',
        '.idea/**',
        '.eslintcache',
    ]),
    {
        files: ['**/*.{js,mjs,cjs,ts,tsx}'],
        extends: [js.configs.recommended],
        rules: {
            'no-constant-binary-expression': 'off',
            'no-empty-static-block': 'off',
            'no-new-native-nonconstructor': 'off',
            'no-unused-private-class-members': 'off',
        },
    },
    {
        files: ['**/*.{ts,tsx}'],
        extends: [tseslint.configs.recommended],
        rules: {
            '@typescript-eslint/explicit-module-boundary-types': 'off',
        },
    },
    {
        files: ['src/**/*.{js,ts,tsx}'],
        extends: [react.configs.flat.recommended, jsxA11y.flatConfigs.recommended],
        languageOptions: {
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            'react/react-in-jsx-scope': 'off',
            'react/jsx-no-undef': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
        },
    },
    {
        files: ['src/**/__tests__/**/*.{ts,tsx}', 'src/**/*.{test,spec}.{ts,tsx}'],
        languageOptions: {
            globals: globals.vitest,
        },
    },
    {
        files: ['server/**/*.js', '*.{js,mjs,cjs,ts}'],
        languageOptions: {
            globals: globals.node,
        },
    },
    prettier,
    {
        rules: {
            'prettier/prettier': 'warn',
        },
    },
]);
