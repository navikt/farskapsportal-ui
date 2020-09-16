const jsdom = require('jsdom');
const request = require('request');
const NodeCache = require('node-cache');
const { JSDOM } = jsdom;

const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * 60;

// Refresh cache every hour
const cache = new NodeCache({
    stdTTL: SECONDS_PER_HOUR,
    checkperiod: SECONDS_PER_MINUTE,
});

const requestDecorator = (callback) => {
    const decoratorUrl = `${process.env.DEKORATOREN_URL}/?redirectToApp=true&Level=4`;
    return request(decoratorUrl, callback);
};

const getDecorator = () =>
    new Promise((resolve) => {
        const decorator = cache.get('main-cache');

        if (decorator) {
            resolve(decorator);
        } else {
            const callback = (error, response, body) => {
                if (!error && response.statusCode >= 200 && response.statusCode < 400) {
                    const { document } = new JSDOM(body).window;
                    const prop = 'innerHTML';
                    const data = {
                        STYLES: document.getElementById('styles')[prop],
                        HEADER: document.getElementById('header-withmenu')[prop],
                        FOOTER: document.getElementById('footer-withmenu')[prop],
                        SCRIPTS: document.getElementById('scripts')[prop],
                    };

                    cache.set('main-cache', data);
                    console.log('Creating cache');
                    resolve(data);
                } else {
                    console.error('Failed to get decorator. Exiting node.', error);
                    process.exit(1);
                }
            };

            requestDecorator(callback);
        }
    });

module.exports = getDecorator;
