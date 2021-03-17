import { injectDecoratorServerSide } from '@navikt/nav-dekoratoren-moduler/ssr';

export const getHtmlWithDekorator = (filePath) =>
    injectDecoratorServerSide({
        env: process.env.ENV,
        filePath: filePath,
        level: 'Level4',
        redirectToApp: true,
    });
