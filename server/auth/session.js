import session from 'express-session';

import * as config from './config.js';

export interface ISession {
    token: string;
    user: IUserSession;
    expires_in: number;
    getOBOToken: (audience: string) => Promise<string | null>;
}

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

export async function getValidSession(req: NextApiRequest): Promise<ISession | null> {
    const token = tokenProvider.getToken(req);
    if (!token) return null;
    const {payload} = await tokenProvider.verifyToken(token);
    if (!payload?.pid) return null;
    return {
        token,
        user: {
            sub: payload?.sub,
            fnr: payload?.pid,
        },
        expires_in: expiresIn(payload.exp),
        getOBOToken: await oboToken(tokenProvider, token)
    };
}

function expiresIn(timestamp: number): number {
    return timestamp - Math.round(Date.now() / 1000);
}
