import { Issuer } from 'openid-client';

import { logger } from './logger.js';

let tokenxConfig = null;
let tokenxClient = null;
let tokenxMetadata = null;
let idportenConfig = null;
let idportenClient = null;
let idportenMetadata = null;
let appConfig = null;

export const setup = async (idpConfig, txConfig, appConf) => {
    idportenConfig = idpConfig;
    tokenxConfig = txConfig;
    appConfig = appConf;

    return init().then((clients) => {
        idportenClient = clients.idporten;
        tokenxClient = clients.tokenx;
    });
};

export const authUrl = (session) =>
    idportenClient.authorizationUrl({
        scope: idportenConfig.scope,
        redirect_uri: idportenConfig.redirectUri,
        response_type: idportenConfig.responseType[0],
        response_mode: 'query',
        nonce: session.nonce,
        state: session.state,
    });

export const validateOidcCallback = async (req) => {
    const params = idportenClient.callbackParams(req);
    const nonce = req.session.nonce;
    const state = req.session.state;

    return idportenClient
        .callback(
            idportenConfig.redirectUri,
            params,
            { nonce, state },
            { clientAssertionPayload: { aud: idportenMetadata.metadata.issuer } }
        )
        .catch((error) => {
            logger.error('Error in OIDC callback:', error);
            Promise.reject(error);
        })
        .then(async (tokenSet) => tokenSet);
};

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

export const refresh = (oldTokenSet) =>
    idportenClient
        .refresh(oldTokenSet)
        .then((newTokenSet) => Promise.resolve(newTokenSet))
        .catch((error) => {
            logger.error('Error while refreshing token:', error);
            return Promise.reject(error);
        });

const init = async () => {
    const idporten = await Issuer.discover(idportenConfig.discoveryUrl);
    const tokenx = await Issuer.discover(tokenxConfig.discoveryUrl);
    idportenMetadata = idporten;
    tokenxMetadata = tokenx;
    logger.info(`discovered idporten @ ${idporten.issuer}`);
    logger.info(`discovered tokenx @ ${tokenx.issuer}`);

    try {
        const idportenJwk = JSON.parse(idportenConfig.clientJwk);
        const tokenxJwk = JSON.parse(tokenxConfig.privateJwk);

        idportenClient = new idporten.Client(
            {
                client_id: idportenConfig.clientID,
                token_endpoint_auth_method: 'private_key_jwt',
                token_endpoint_auth_signing_alg: 'RS256',
                redirect_uris: [idportenConfig.redirectUri, 'http://localhost:8080/callback'],
                response_types: ['code'],
            },
            {
                keys: [idportenJwk],
            }
        );

        tokenxClient = new tokenx.Client(
            {
                client_id: tokenxConfig.clientID,
                token_endpoint_auth_method: 'private_key_jwt',
            },
            {
                keys: [tokenxJwk],
            }
        );

        return Promise.resolve({ idporten: idportenClient, tokenx: tokenxClient });
    } catch (error) {
        logger.error('Error while initializing auth:', error);
        return Promise.reject(error);
    }
};
