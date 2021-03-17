import { injectDecoratorServerSide } from '@navikt/nav-dekoratoren-moduler/ssr/index.js';

console.log('process.env.ENV');
console.log(process.env.ENV);

export const getHtmlWithDekorator = (filePath) =>
    injectDecoratorServerSide({
        env: process.env.ENV,
        filePath: filePath,
        level: 'Level4',
        redirectToApp: true,
    });
