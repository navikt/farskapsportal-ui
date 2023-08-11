import {auth} from 'express-oauth2-jwt-bearer';
import 'dotenv/config.js';

export const validateAccessToken = auth({
    issuerBaseURL: process.env.IDPORTEN_WELL_KNOWN_URL,
    audience: process.env.IDPORTEN_AUDIENCE,
});


export const exchangeToken = async (idportenToken) => {
    const now = Math.floor(Date.now() / 1000);
    // additional claims not set by openid-client
    const additionalClaims = {
        clientAssertionPayload: {
            nbf: now,
        },
    };

    return tokenxClient
        .grant(
            {
                grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
                client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
                subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
                audience: appConfig.targetAudience,
                subject_token: idportenToken,
            },
            additionalClaims
        )
        .then((tokenSet) => Promise.resolve(tokenSet.access_token))
        .catch((error) => {
            logger.error('Error while exchanging token:', error);
            return Promise.reject(error);
        });
};
