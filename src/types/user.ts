import { BrukerinformasjonResponse } from './api';
import { HTTPError } from './error';

export type FetchUserInfo =
    | { status: 'PENDING' }
    | { status: 'SUCCESS'; data: UserInfo }
    | { status: 'FAILURE'; error: HTTPError };

export type UserInfo = BrukerinformasjonResponse;
