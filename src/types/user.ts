import { HTTPError } from './error';
import { Farskapserklaering } from './farskapserklaering';
import { Foreldrerolle } from './foreldrerolle';

export type FetchUserInfo =
    | { status: 'PENDING' }
    | { status: 'SUCCESS'; data: UserInfo }
    | { status: 'FAILURE'; error: HTTPError };

export interface UserInfo {
    kanOppretteFarskapserklaering: boolean;
    gyldigForelderrolle: boolean;
    forelderrolle: Foreldrerolle;
    farsVentendeFarskapserklaeringer: Farskapserklaering[] | null;
    morsVentendeFarskapserklaeringer: Farskapserklaering[] | null;
    fnrNyligFoedteBarnUtenRegistrertFar: string[] | null;
}
