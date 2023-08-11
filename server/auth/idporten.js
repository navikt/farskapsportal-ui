import {
    createRemoteJWKSet,
    errors,
    FlattenedJWSInput,
    JWSHeaderParameters,
    jwtVerify,
    JWTVerifyResult,
} from "jose";
import { GetKeyFunction } from "jose/dist/types/types";
import { IdPortenProvider } from "./auth-provider.js";
import { getToken } from "./wonderwall";

let remoteJWKSet: GetKeyFunction<JWSHeaderParameters, FlattenedJWSInput>;

export function getJWKS() {
    if (!remoteJWKSet)
        remoteJWKSet = createRemoteJWKSet(new URL(process.env.IDPORTEN_JWKS_URI));
    return remoteJWKSet;
}

async function verifyToken(token: string | Uint8Array): Promise<JWTVerifyResult> {
    const verifyResult = await jwtVerify(token, getJWKS(), {
        issuer: process.env.IDPORTEN_ISSUER,
    });
    if (verifyResult.payload["client_id"] != process.env.IDPORTEN_CLIENT_ID)
        throw new errors.JWTClaimValidationFailed(`unexpected "client_id" claim value`);

    const authLevel = (verifyResult.payload["acr"])?.toLowerCase();
    if (authLevel != "level4")
        throw new errors.JWTClaimValidationFailed(
            `authentication level is "${authLevel} but expected level4"`
        );
    return verifyResult;
}

const idporten: IdPortenProvider = {
    name: "idporten",
    getToken: getToken,
    verifyToken,
};
export default idporten;
