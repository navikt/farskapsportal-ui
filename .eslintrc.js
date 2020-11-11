module.exports = {
    extends: [
        'react-app',
        'react-app/jest',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
        'plugin:jsx-a11y/recommended',
    ],
    rules: {
        'prettier/prettier': 'warn',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
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
