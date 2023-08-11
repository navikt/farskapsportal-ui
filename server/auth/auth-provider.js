import { JWTVerifyResult } from "jose";
import { NextApiRequest } from "next";

export type GetToken = (req: NextApiRequest) => string | null;
export type VerifyAuth = (token: string) => Promise<JWTVerifyResult>;

export interface IAuthProvider {
    name: string;
    getToken: GetToken;
    verifyToken: VerifyAuth;
}

export type IdPortenProvider = IAuthProvider & {
    name: "idporten";
};

export type MockProvider = IAuthProvider & {
    name: "mock";
};
