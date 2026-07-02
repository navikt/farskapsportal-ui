import { getToken, validateIdportenToken, requestTokenxOboToken } from '@navikt/oasis';
import { logger } from '../logger.js';

export const validateAccessToken = async (req, res, next) => {
    const token = getToken(req);
    if (!token) {
        return res.status(401).end();
    }
    const validation = await validateIdportenToken(token);
    if (!validation.ok) {
        logger.error('Token validation failed:', validation.error.message);
        return res.status(401).end();
    }
    req.auth = { token };
    next();
};

export const exchangeToken = async (token) => {
    const obo = await requestTokenxOboToken(token, process.env.FARSKAPSPORTAL_API_AUDIENCE);
    if (!obo.ok) {
        logger.error('Token exchange failed:', obo.error.message);
        throw obo.error;
    }
    return obo.token;
};
