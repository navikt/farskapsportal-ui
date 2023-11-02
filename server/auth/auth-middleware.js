import {auth} from 'express-oauth2-jwt-bearer';
import { Issuer } from 'openid-client';
import { logger } from '../logger.js';

let appConfig = null;
let idportenConfig = null;
let idportenClient = null;
let tokenxConfig = null;
let tokenxClient = null;
let tokenxIssuer = null;

export const validateAccessToken = auth({
    issuerBaseURL: process.env.IDPORTEN_WELL_KNOWN_URL,
    audience: process.env.IDPORTEN_AUDIENCE,
});

export const setup = async (appConf, idpConfig, txConfig) => {
    appConfig = appConf;
    idportenConfig = idpConfig;
    tokenxConfig = txConfig;

    return init().then((clients) => {
        idportenClient = clients.idporten;
        tokenxClient = clients.tokenx;
    });
};

export const exchangeToken = async (idportenToken) => {
    const now = Math.floor(Date.now() / 1000);
    // additional claims not set by openid-client
    const additionalClaims = {
        clientAssertionPayload: {
            nbf: now,
            aud: process.env.TOKEN_X_TOKEN_ENDPOINT,
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

export const refresh = (oldTokenSet) =>
    idportenClient
        .refresh(oldTokenSet)
        .then((newTokenSet) => Promise.resolve(newTokenSet))
        .catch((error) => {
            logger.error('Error while refreshing token:', error);
            return Promise.reject(error);
        });

const init = async () => {
    tokenxIssuer = await Issuer.discover(tokenxConfig.discoveryUrl);
    logger.info(`discovered tokenx @ ${tokenxIssuer.issuer}`);

    try {
        const tokenxJwk = JSON.parse(tokenxConfig.privateJwk);
        const tokenx = new tokenxIssuer.Client(
            {
                client_id: tokenxConfig.clientID,
                token_endpoint_auth_method: 'private_key_jwt',
            },
            {
                keys: [tokenxJwk],
            }
        );

      //  return Promise.resolve({ idporten, tokenx });
        return Promise.resolve({ tokenx });
    } catch (error) {
        logger.error('Error while initializing auth:', error);
        return Promise.reject(error);
    }
};
