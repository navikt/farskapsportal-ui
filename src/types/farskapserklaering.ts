import { Barn } from './barn';
import { Dokument } from './dokument';
import { Forelder } from './forelder';

export interface Farskapserklaering {
    barn: Barn | null;
    mor: Forelder | null;
    far: Forelder | null;
    dokument: Dokument | null;
}
