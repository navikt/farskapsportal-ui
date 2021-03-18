import { Barn } from './barn';
import { Dokument } from './dokument';
import { Forelder } from './forelder';

export interface Farskapserklaering {
    barn: Barn | null;
    dokument: Dokument | null;
    far: Forelder | null;
    farBorSammenMedMor: boolean | null;
    idFarskapserklaering: number;
    mor: Forelder | null;
    morBorSammenMedFar: boolean | null;
    paaloggetBrukersRolle: Rolle | null;
}

export enum Rolle {
    Far = 'FAR',
    Mor = 'MOR',
}
