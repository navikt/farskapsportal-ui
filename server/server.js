import 'dotenv/config.js';
import express from 'express';
import cookieParser from 'cookie-parser';
import fetch from 'node-fetch';
import compression from 'compression';
import { getHtmlWithDekorator } from './dekorator.js';

const buildPath = '../build';
const apiUrl = `${process.env.FARSKAPSPORTAL_API_URL}/api/v1/farskapsportal`;
const tokenName = 'selvbetjening-idtoken';
const app = express();

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
app.get('/', (req, res) => res.redirect(`${process.env.ENONIC_BOKMAAL}`));
app.get('/nb', (req, res) => res.redirect(`${process.env.ENONIC_BOKMAAL}`));
app.get('/nn', (req, res) => res.redirect(`${process.env.ENONIC_NYNORSK}`));
app.get('/en', (req, res) => res.redirect(`${process.env.ENONIC_ENGELSK}`));

app.get('/',(req, res) => res.redirect('/nb/oversikt'));
app.get('/nb',(req, res) => res.redirect('/nb/oversikt'));
app.get('/nn',(req, res) => res.redirect('/nn/oversikt'));
app.get('/nb',(req, res) => res.redirect('/en/oversikt'));


// Nais functions
app.get('/internal/isAlive|isReady', (req, res) => res.sendStatus(200));

// Api calls
app.get('/api/brukerinformasjon', async (req, res) => {
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

app.post('/api/personopplysninger/far', async (req, res) => {
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

app.post('/api/farskapserklaering/ny', async (req, res) => {
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

app.put('/api/farskapserklaering/redirect', async (req, res) => {
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

app.post('/api/redirect-url/ny', async (req, res) => {
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

app.put('/api/farskapserklaering/oppdatere', async (req, res) => {
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

app.get('/api/farskapserklaering/:erklaeringId/dokument', async (req, res) => {
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
