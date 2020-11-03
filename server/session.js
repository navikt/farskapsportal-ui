import session from 'express-session';
import redis from 'redis';
import RedisStore from 'connect-redis';

import * as config from './config.js';
import { logger } from './logger.js';

export const setupSession = () => {
    const options = {
        cookie: {
            maxAge: config.session.maxAgeMs,
            sameSite: 'lax',
            httpOnly: true,
        },
        secret: config.session.secret,
        name: 'farskapsportal-ui',
        resave: false,
        saveUninitialized: false,
        unset: 'destroy',
    };

    if (process.env.NODE_ENV !== 'development') {
        options.cookie.secure = true;
        options.store = setupRedis();
    }

    return session(options);
};

const setupRedis = () => {
    const store = RedisStore(session);
    const client = redis.createClient({
        host: config.session.redisHost,
        password: config.session.redisPassword,
        port: config.session.redisPort,
    });

    client.unref();
    client.on('debug', logger.debug);
    client.on('error', logger.error);

    return new store({
        client: client,
        disableTouch: true,
    });
};
