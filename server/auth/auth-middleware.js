import {auth} from 'express-oauth2-jwt-bearer';
import 'dotenv/config.js';ß

const validateAccessToken = auth({
    issuerBaseURL: process.env.IDPORTEN_WELL_KNOWN_URL,
    audience: process.env.IDPORTEN_AUDIENCE,
});

module.exports = {
    validateAccessToken,
};