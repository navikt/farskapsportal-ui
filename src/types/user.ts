import { HTTPError } from './error';
import { Kjoenn } from './kjoenn';

export type FetchUserInfo =
    | { status: 'PENDING' }
    | { status: 'SUCCESS'; data: UserInfo }
    | { status: 'FAILURE'; error: HTTPError };

export type UserInfo = Kjoenn;
