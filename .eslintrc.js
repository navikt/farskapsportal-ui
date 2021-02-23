module.exports = {
    extends: [
        'react-app',
        'react-app/jest',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended',
    ],
    rules: {
        'prettier/prettier': 'warn',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-no-undef': 'off',
    },
    overrides: [
        {
            files: ['**/*.js'],
            rules: {
                '@typescript-eslint/no-var-requires': 'off',
            },
        },
    ],
    ignorePatterns: ['node_modules', '/build'],
};
