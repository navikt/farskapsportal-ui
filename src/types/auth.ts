import { HTTPError } from './error';

export type FetchAuthInfo =
    | { status: 'PENDING' }
    | { status: 'SUCCESS'; data: AuthInfo }
    | { status: 'FAILURE'; error: HTTPError };

export type AuthInfo =
    | { authenticated: false }
    | {
          authenticated: true;
          name: string;
          securityLevel: string;
          fodselsnr: string;
      };
