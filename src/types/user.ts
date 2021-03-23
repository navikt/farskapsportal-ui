import { BrukerinformasjonResponse } from './api';
import { HTTPError } from './error';
import { Feilkode } from './feilkode';

export type FetchUserInfo =
    | { status: 'PENDING' }
    | { status: 'SUCCESS'; data: UserInfo }
    | { status: 'NOT_PERMITTED'; data: Feilkode }
    | { status: 'FAILURE'; error: HTTPError };

export type UserInfo = BrukerinformasjonResponse;
