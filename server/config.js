
import fetch from 'node-fetch';
import 'dotenv/config.js';
import { logger } from './logger.js';

export const app = {
    useSecureCookies: !!process.env.NAIS_CLUSTER_NAME,
    port: process.env.PORT || 8080,
    apiUrl: process.env.FARSKAPSPORTAL_API_URL || 'https://farskapsportal-api.dev.nav.no',
    targetAudience:
        process.env.FARSKAPSPORTAL_API_AUDIENCE || 'dev-gcp:farskapsportal:farskapsportal-api',
};

export const session = {
    secret: process.env.SESSION_SECRET,
    maxAgeMs: process.env.SESSION_MAX_AGE_MS || 12 * 60 * 60 * 1000, // defaults to 12 hours
};

export const idporten = {
    discoveryUrl:
        process.env.IDPORTEN_WELL_KNOWN_URL ||
        'https://oidc-ver2.difi.no/idporten-oidc-provider/.well-known/openid-configuration',
    clientID: process.env.IDPORTEN_CLIENT_ID,
    clientJwk: getIdportenJWKS(),
    responseType: ['code'],
    scope: 'openid profile',
};

export const tokenx = {
    discoveryUrl: process.env.TOKEN_X_WELL_KNOWN_URL,
    clientID: process.env.TOKEN_X_CLIENT_ID,
    privateJwk: process.env.TOKEN_X_PRIVATE_JWK,
};

async function getIdportenJWKS() {

    logger.info(`env:  process.env`);
    logger.info(`env.IDPORTEN_WELL_KNOWN_URL: ${process.env.IDPORTEN_WELL_KNOWN_URL}`);
    logger.info(`process.env.TOKEN_X_WELL_KNOWN_URL: ${process.env.TOKEN_X_WELL_KNOWN_URL}`);
    logger.info(`process.env.IDPORTEN_JWKS_URI: ${process.env.IDPORTEN_JWKS_URI}`);

    try {
        const res = await fetch(process.env.IDPORTEN_JWKS_URI)

        if (res.status >= 200 && res.status < 400) {
            const body = await res.text()
            logger.info(`body: ${body}`);

            const json = JSON.parse(body);
            
            logger.info(`json: ${json}`);

            const keys = JSON.parse(body).keys;
            logger.info(`keys: ${keys}`);
            return keys;
        }
    }  catch (error) {
        logger.error('Failed to get idporten jwks:', error);
        throw error;
    }
}
