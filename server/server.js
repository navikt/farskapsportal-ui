import express from 'express';
import mustacheExpress from 'mustache-express';
import proxy from 'express-http-proxy';
import cookieParser from 'cookie-parser';
import { getDecorator } from './decorator.js';

const buildPath = '../build';
const apiBaseUrl = process.env.FARSKAPSPORTAL_API_URL;
const apiPath = '/api/v1/farskapsportal';
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

// Api proxy
app.use(
    '/api',
    proxy(apiBaseUrl, {
        proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
            const token = srcReq.cookies[tokenName];
            proxyReqOpts.headers.Authorization = `Bearer ${token}`;
            return proxyReqOpts;
        },
        proxyReqPathResolver: (req) => `${apiPath}${req.url}`,
        proxyErrorHandler: (err, res, next) => {
            console.log('proxyErrorHandler');
            console.log(err);
            next(err);
        },
    })
);

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
