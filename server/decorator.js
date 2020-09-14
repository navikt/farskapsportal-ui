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

const decoratorUrl = `${process.env.DEKORATOREN_URL}/?redirectToApp=true&level=4`;

const getDecorator = () =>
    new Promise((resolve, reject) => {
        const decorator = cache.get('main-cache');
        if (decorator) {
            resolve(decorator);
        } else {
            request(decoratorUrl, (error, response, body) => {
                console.error('error:');
                console.error(error);
                console.error('response');
                console.error(response);
                console.error('body');
                console.error(body);
                if (
                    !error &&
                    response.statusCode >= 200 &&
                    response.statusCode < 400
                ) {
                    const { document } = new JSDOM(body).window;
                    const prop = 'innerHTML';
                    const data = {
                        HEADER: document.getElementById('header-withmenu')[
                            prop
                        ],
                        STYLES: document.getElementById('styles')[prop],
                        FOOTER: document.getElementById('footer-withmenu')[
                            prop
                        ],
                        SCRIPTS: document.getElementById('scripts')[prop],
                    };
                    cache.set('main-cache', data);
                    console.log('Creating cache');
                    resolve(data);
                } else {
                    reject(new Error(error));
                }
            });
        }
    });

module.exports = getDecorator;
