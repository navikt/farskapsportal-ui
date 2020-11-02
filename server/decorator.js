import jsdom from 'jsdom';
import fetch from 'node-fetch';
import NodeCache from 'node-cache';

import { logger } from './logger.js';

const { JSDOM } = jsdom;

const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * 60;
const CACHE_NAME = 'decorator-cache';

// Refresh cache every hour
const cache = new NodeCache({
    stdTTL: SECONDS_PER_HOUR,
    checkperiod: SECONDS_PER_MINUTE,
});

const decoratorUrl = `${process.env.DEKORATOREN_URL}/?redirectToApp=true&Level=4`;

export const getDecorator = async () => {
    const decorator = cache.get(CACHE_NAME);

    if (decorator) {
        return decorator;
    } else {
        try {
            const res = await fetch(decoratorUrl);

            if (res.status >= 200 && res.status < 400) {
                const body = await res.text();
                const { document } = new JSDOM(body).window;
                const prop = 'innerHTML';
                const data = {
                    STYLES: document.getElementById('styles')[prop],
                    HEADER: document.getElementById('header-withmenu')[prop],
                    FOOTER: document.getElementById('footer-withmenu')[prop],
                    SCRIPTS: document.getElementById('scripts')[prop],
                };

                cache.set(CACHE_NAME, data);
                logger.info('Creating cache');
                return data;
            }
        } catch (error) {
            logger.error('Failed to get decorator:', error);
            throw error;
        }
    }
};
