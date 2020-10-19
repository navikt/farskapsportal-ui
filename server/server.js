import express from 'express';
import mustacheExpress from 'mustache-express';
import cookieParser from 'cookie-parser';
import fetch from 'node-fetch';
import { getDecorator } from './decorator.js';

const buildPath = '../build';
const apiUrl = `${process.env.FARSKAPSPORTAL_API_URL}/api/v1/farskapsportal`;
const tokenName = 'selvbetjening-idtoken';
const app = express();

app.set('views', buildPath);
app.set('view engine', 'mustache');
app.set('X-Frame-Options', 'SAMEORIGIN');
app.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
app.set('X-Content-Type-Options', 'nosniff');
app.set('X-XSS-Protection', '1; mode=block');
app.engine('html', mustacheExpress());

app.use(cookieParser());

// Parse application/json
app.use(express.json());
app.use((req, res, next) => {
    res.removeHeader('X-Powered-By');
    next();
});

// Static files
app.use(express.static(buildPath, { index: false }));

// Nais functions
app.get('/internal/isAlive|isReady', (req, res) => res.sendStatus(200));

// Api calls
app.get('/api/kjoenn', async (req, res) => {
    try {
        const token = req.cookies[tokenName];
        const response = await fetch(`${apiUrl}/kjoenn`, {
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

// Match everything except internal og static
app.use(/^(?!.*\/(internal|static)\/).*$/, (req, res) =>
    getDecorator()
        .then((fragments) => {
            res.render('index.html', fragments);
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
