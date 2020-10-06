const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const getDecorator = require('./decorator');
const buildPath = path.resolve(__dirname, '../build');
/* TODO */ const basePath = '';
const server = express();

server.set('views', `${__dirname}/../build`);
server.set('view engine', 'mustache');
server.set('X-Frame-Options', 'SAMEORIGIN');
server.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
server.set('X-Content-Type-Options', 'nosniff');
server.set('X-XSS-Protection', '1; mode=block');
server.engine('html', mustacheExpress());

// Parse application/json
server.use(express.json());
server.use((req, res, next) => {
    res.removeHeader('X-Powered-By');
    next();
});

// Static files
server.use(basePath, express.static(buildPath, { index: false }));

// Nais functions
server.get(`${basePath}/internal/isAlive|isReady`, (req, res) => res.sendStatus(200));

// Match everything except internal og static
server.use(/^(?!.*\/(internal|static)\/).*$/, (req, res) =>
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
server.listen(port, () => console.log(`App listening on port: ${port}`));

process.on('SIGTERM', () => setTimeout(() => console.log('Har sovet i 30 sekunder'), 30000));
