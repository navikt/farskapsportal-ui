import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import jsdom from 'jsdom';
import mustacheExpress from 'mustache-express';
import { generators, TokenSet } from 'openid-client';

// import * as api from './api.js';
import * as auth from './auth.js';
import * as config from './config.js';
import { getDecorator } from './decorator.js';
import * as headers from './headers.js';
import { logger } from './logger.js';
// import { limit } from './ratelimit.js';
import { setupSession } from './session.js';

const { JSDOM } = jsdom;
const buildPath = '../build';
const apiUrl = `${process.env.FARSKAPSPORTAL_API_URL}/api/v1/farskapsportal`;

const frontendloggerScript = () => {
    const scriptTag = `<div id="frontendlogger"><script type="application/javascript" src="${process.env.FRONTENDLOGGER_BASE_URL}/logger.js"></script></div>`;
    const { document } = new JSDOM(scriptTag).window;
    return document.getElementById('frontendlogger')['innerHTML'];
};

const app = express();

let authEndpoint = null;
auth.setup(config.idporten, config.tokenx, config.app)
    .then((endpoint) => {
        authEndpoint = endpoint;
    })
    .catch((error) => {
        logger.error('Error while setting up auth:', error);
        process.exit(1);
    });

app.set('views', buildPath);
app.set('view engine', 'mustache');
app.engine('html', mustacheExpress());

app.use(bodyParser.text());
headers.setup(app);
// api.init(config.app.apiUrl);

// app.use(limit);

app.set('trust proxy', 1);
app.use(setupSession());

app.use(express.static(buildPath, { index: false }));

app.get('/internal/isAlive|isReady', (req, res) => res.sendStatus(200));

// const login = (req, res) => {
//     const session = req.session;
//     session.nonce = generators.nonce();
//     session.state = generators.state();
//     res.redirect(auth.authUrl(session));
// };

// app.get('/login', (req, res) => {
//     const session = req.session;
//     session.nonce = generators.nonce();
//     session.state = generators.state();
//     res.redirect(auth.authUrl(session));
// });

app.get('/login', async (req, res) => {
    // const currentTokens = req.session.tokens;
    //
    // if (!currentTokens) {
    const session = req.session;
    session.nonce = generators.nonce();
    session.state = generators.state();
    res.redirect(auth.authUrl(session));
    // } else {
    //     let tokenSet = new TokenSet(currentTokens);
    //
    //     if (tokenSet.expired()) {
    //         logger.debug('Refreshing token');
    //         tokenSet = new TokenSet(await auth.refresh(currentTokens));
    //         req.session.tokens = tokenSet;
    //     }
    // }
});

app.get('/oauth2/callback', (req, res) => {
    const session = req.session;
    auth.validateOidcCallback(req)
        .then((tokens) => {
            session.tokens = tokens;
            session.state = null;
            session.nonce = null;
            res.cookie('dings-id', `${tokens.id_token}`, {
                secure: config.app.useSecureCookies,
                sameSite: 'lax',
                maxAge: config.session.maxAgeMs,
            });
            res.redirect(303, '/');
        })
        .catch((error) => {
            logger.error('Error while validating OIDC callback:', error);
            session.destroy(() => {});
            res.sendStatus(403);
        });
});

const renderApp = (req, res) =>
    getDecorator()
        .then((fragments) => {
            res.render('index.html', {
                ...fragments,
                LOGIN_URL: process.env.LOGINSERVICE_URL,
                FRONTEND_LOGGER_SCRIPT: frontendloggerScript(),
            });
        })
        .catch((error) => {
            logger.error('Error while rendering app:', error);
            res.sendStatus(500);
        });

// const authMiddleware = async (req, res, next) => {
//     let currentTokens = req.session.tokens;
//
//     if (!currentTokens) {
//         res.redirect('/login');
//     } else {
//         let tokenSet = new TokenSet(currentTokens);
//
//         if (tokenSet.expired()) {
//             logger.debug('Refreshing token');
//             tokenSet = new TokenSet(await auth.refresh(currentTokens));
//             req.session.tokens = tokenSet;
//         }
//
//         return next();
//     }
// };

const checkAuth = async (req, res, next) => {
    const currentTokens = req.session.tokens;

    if (!currentTokens) {
        res.sendStatus(401);
    } else {
        let tokenSet = new TokenSet(currentTokens);

        if (tokenSet.expired()) {
            logger.debug('Refreshing token');
            tokenSet = new TokenSet(await auth.refresh(currentTokens));
            req.session.tokens = tokenSet;
        }

        return next();
    }
};

// check auth
// app.use(async (req, res, next) => {
//     let currentTokens = req.session.tokens;
//     if (!currentTokens) {
//         res.redirect('/login');
//     } else {
//         let tokenSet = new TokenSet(currentTokens);
//         if (tokenSet.expired()) {
//             logger.debug('refreshing token');
//             tokenSet = new TokenSet(await auth.refresh(currentTokens));
//             req.session.tokens = tokenSet;
//         }
//         return next();
//     }
// });

// app.use(
//     /^(?!.*\/(internal|static)\/).*$/,
//     async (req, res, next) => {
//         if (req.path === '/') {
//             return next();
//         }
//         await authMiddleware(req, res, next);
//         next();
//     },
//     renderApp
// );

// check auth
// app.use(authMiddleware);

// authenticated routes below
app.get('/api/kjoenn', checkAuth, async (req, res) => {
    try {
        const accessToken = await auth.exchangeToken(req.session.tokens.id_token);
        const response = await fetch(`${apiUrl}/kjoenn`, {
            method: 'get',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const json = await response.json();
        res.status(response.status).send(json);
    } catch (error) {
        logger.error('Error while calling api:', error);
        res.sendStatus(500);
    }
});

// app.use(
//     /^(?!.*\/(internal|static)\/).*$/,
//     async (req, res, next) => {
//         if (req.path === '/') {
//             return next();
//         }
//         await authMiddleware(req, res, next);
//         next();
//     },
//     renderApp
// );

app.use(/^(?!.*\/(internal|static)\/).*$/, renderApp);

// app.use(/^(?!.*\/(internal|static)\/).*$/, (req, res) =>
//     getDecorator()
//         .then((fragments) => {
//             res.render('index.html', {
//                 ...fragments,
//                 LOGIN_URL: process.env.LOGINSERVICE_URL,
//                 FRONTEND_LOGGER_SCRIPT: frontendloggerScript(),
//             });
//         })
//         .catch((e) => {
//             const error = `Failed to get decorator: ${e}`;
//             logger.error(error);
//             res.status(500).send(error);
//         })
// );

app.listen(config.app.port, () => {
    logger.info(`farskapsportal-ui listening at port ${config.app.port}`);
});

process.on('SIGTERM', () =>
    setTimeout(() => logger.info('SIGTERM, has slept for 30 seconds'), 30000)
);