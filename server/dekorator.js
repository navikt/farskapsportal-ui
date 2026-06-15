import { injectDecoratorServerSide } from '@navikt/nav-dekoratoren-moduler/ssr/index.js';

export const getHtmlWithDekorator = (filePath) => {
    const isLocalhost = process.env.ENV === 'localhost';
    return injectDecoratorServerSide({
        env: process.env.ENV,
        ...(isLocalhost && { localUrl: 'http://localhost:8100' }),
        filePath,
        params: {
            context: "privatperson",
            level: 'Level4',
            redirectToApp: true,
        },
    });
};
