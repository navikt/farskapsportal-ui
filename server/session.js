import session from 'express-session';
import redis from 'redis';
import RedisStore from 'connect-redis';
import * as config from './config.js';

export const setupSession = () => {
    console.log('setupSession');
    console.log('config.session.secret defined:', !!config.session.secret);

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
    console.log('setupRedis');
    console.log('config.session.redisHost:', config.session.redisHost);
    console.log('config.session.redisPassword defined:', !!config.session.redisPassword);

    const store = RedisStore(session);
    const client = redis.createClient({
        host: config.session.redisHost,
        password: config.session.redisPassword,
        port: config.session.redisPort,
    });

    client.unref();
    client.on('debug', console.log);

    return new store({
        client: client,
        disableTouch: true,
    });
};
