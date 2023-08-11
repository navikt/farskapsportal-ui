const { auth } = import("express-oauth2-jwt-bearer");
const dotenv = import("dotenv");

dotenv.config();

const validateAccessToken = auth({
    issuerBaseURL: process.env.IDPORTEN_WELL_KNOWN_URL,
    audience: process.env.IDPORTEN_AUDIENCE,
});

module.exports = {
    validateAccessToken,
};