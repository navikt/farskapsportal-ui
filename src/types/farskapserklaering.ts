import { Barn } from './barn';
import { Dokument } from './dokument';
import { Forelder } from './forelder';

export interface Farskapserklaering {
    barn: Barn | null;
    dokument: Dokument | null;
    far: Forelder | null;
    idFarskapserklaering: number;
    mor: Forelder | null;
}
