import 'dotenv/config.js';
import express from 'express';
import cookieParser from 'cookie-parser';
import fetch from 'node-fetch';
import compression from 'compression';
import { getHtmlWithDekorator } from './dekorator.js';
import { generators, TokenSet } from 'openid-client';
import jsdom from 'jsdom';
import * as auth from './auth.js';
import * as config from './config.js';
import * as headers from './headers.js';
import { logger } from './logger.js';
import { setupSession } from './session.js';

const { JSDOM } = jsdom;
const buildPath = '../build';
const apiUrl = `${process.env.FARSKAPSPORTAL_API_URL}/api/v1/farskapsportal`;
const app = express();

auth.setup(config.app, config.idporten, config.tokenx).catch((error) => {
    logger.error('Error while setting up auth:', error);
    process.exit(1);
});

app.use(bodyParser.text());
headers.setup(app);

app.set('trust proxy', 1);
app.use(setupSession());

app.use(compression());
app.use(cookieParser());

// Parse application/json
app.use(express.json());
app.use((req, res, next) => {
    res.removeHeader('X-Powered-By');
    res.set('X-Frame-Options', 'SAMEORIGIN');
    res.set('X-XSS-Protection', '1; mode=block');
    res.set('X-Content-Type-Options', 'nosniff');
    res.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    next();
});

// Static files
app.use(express.static(buildPath, { index: false }));

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
            session.destroy();
            res.sendStatus(403);
        });
});

app.get('/login', (req, res) => {
    const session = req.session;
    session.nonce = generators.nonce();
    session.state = generators.state();
    res.redirect(auth.authUrl(session));
});

/*
app.get('/', (req, res) => res.redirect(`${process.env.ENONIC_BOKMAAL}`));
app.get('/nb', (req, res) => res.redirect(`${process.env.ENONIC_BOKMAAL}`));
app.get('/nn', (req, res) => res.redirect(`${process.env.ENONIC_NYNORSK}`));
app.get('/en', (req, res) => res.redirect(`${process.env.ENONIC_ENGELSK}`));
*/

app.get('/',(req, res) => res.redirect('/nb/oversikt'));
app.get('/nb',(req, res) => res.redirect('/nb/oversikt'));
app.get('/nn',(req, res) => res.redirect('/nn/oversikt'));
app.get('/nb',(req, res) => res.redirect('/en/oversikt'));


// Nais functions
app.get('/internal/isAlive|isReady', (req, res) => res.sendStatus(200));

// Api calls
app.get('/api/brukerinformasjon', checkAuth, async (req, res) => {
    try {
        const token = req.cookies[tokenName];
        const response = await fetch(`${apiUrl}/brukerinformasjon`, {
            method: 'get',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const json = await response.json();
        res.status(response.status).send(json);
    } catch (error) {
        console.log(`Error while calling api: ${error}`);
        res.sendStatus(500);
    }
});

app.post('/api/personopplysninger/far', checkAuth, async (req, res) => {
    try {
        const token = req.cookies[tokenName];
        const response = await fetch(`${apiUrl}/personopplysninger/far`, {
            method: 'post',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(req.body),
        });

        if (response.status === 200) {
            res.sendStatus(response.status);
        } else {
            const json = await response.json();
            res.status(response.status).send(json);
        }
    } catch (error) {
        console.log(`Error while calling api: ${error}`);
        res.sendStatus(500);
    }
});

app.post('/api/farskapserklaering/ny', checkAuth, async (req, res) => {
    try {
        const token = req.cookies[tokenName];
        const response = await fetch(`${apiUrl}/farskapserklaering/ny`, {
            method: 'post',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(req.body),
        });

        const json = await response.json();
        res.status(response.status).send(json);
    } catch (error) {
        console.log(`Error while calling api: ${error}`);
        res.sendStatus(500);
    }
});

app.put('/api/farskapserklaering/redirect',checkAuth, async (req, res) => {
    try {
        const token = req.cookies[tokenName];
        const response = await fetch(
            req.query.id_farskapserklaering
                ? `${apiUrl}/farskapserklaering/redirect?id_farskapserklaering=${req.query.id_farskapserklaering}&status_query_token=${req.query.status_query_token}`
                : `${apiUrl}/farskapserklaering/redirect?status_query_token=${req.query.status_query_token}`,
            {
                method: 'put',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const json = await response.json();
        res.status(response.status).send(json);
    } catch (error) {
        console.log(`Error while calling api: ${error}`);
        res.sendStatus(500);
    }
});

app.post('/api/redirect-url/ny', checkAuth, async (req, res) => {
    try {
        const token = req.cookies[tokenName];
        const response = await fetch(
            `${apiUrl}/redirect-url/ny?id_farskapserklaering=${req.query.id_farskapserklaering}`,
            {
                method: 'post',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const text = await response.text();
        res.status(response.status).send(text);
    } catch (error) {
        console.log(`Error while calling api: ${error}`);
        res.sendStatus(500);
    }
});

app.put('/api/farskapserklaering/oppdatere', checkAuth, async (req, res) => {
    try {
        const token = req.cookies[tokenName];
        const response = await fetch(`${apiUrl}/farskapserklaering/oppdatere`, {
            method: 'put',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(req.body),
        });

        const json = await response.json();
        res.status(response.status).send(json);
    } catch (error) {
        console.log(`Error while calling api: ${error}`);
        res.sendStatus(500);
    }
});

app.get('/api/farskapserklaering/:erklaeringId/dokument', checkAuth,  async (req, res) => {
    try {
        const token = req.cookies[tokenName];
        const response = await fetch(
            `${apiUrl}/farskapserklaering/${req.params.erklaeringId}/dokument`,
            {
                method: 'get',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const buffer = await response.buffer();
        res.contentType('application/pdf');
        res.status(response.status).send(buffer);
    } catch (error) {
        console.log(`Error while calling api: ${error}`);
        res.sendStatus(500);
    }
});

// Match everything except internal og static
app.use(/^(?!.*\/(internal|static)\/).*$/, (req, res) =>
    getHtmlWithDekorator(`${buildPath}/index.html`)
        .then((html) => {
            res.send(
                html
                    .replace('{{{APP_VERSION}}}', process.env.APP_VERSION)
            );
        })
        .catch((e) => {
            const error = `Failed to get decorator: ${e}`;
            console.error(error);
            res.status(500).send(error);
        })
);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`App listening on port: ${port}`));

process.on('SIGTERM', () => setTimeout(() => console.log('Har sovet i 30 sekunder'), 30000));
