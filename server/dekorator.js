import { injectDecoratorServerSide } from '@navikt/nav-dekoratoren-moduler/ssr/index.js';

export const getHtmlWithDekorator = (filePath) =>
    injectDecoratorServerSide({
        env: process.env.ENV,
        port: process.env.ENV === 'localhost' ? 8100 : undefined,
        filePath: filePath,
        level: 'Level4',
        redirectToApp: true,
    });
