import session from 'express-session';

import * as config from '../config.js';

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
    }

    return session(options);
};
