import { NextApiRequest } from "next";

function getTokenFromHeader(req: NextApiRequest): string | null | undefined {
    return req.headers.authorization;
}

export function getToken(req: NextApiRequest): string | null {
    const token = getTokenFromHeader(req);
    if (!token) return token ?? null;
    return token.split(" ")[1];
}
