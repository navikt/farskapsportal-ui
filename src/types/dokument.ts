import { URI } from './uri';

export interface Dokument {
    dokumentnavn: string | null;
    innhold: string | null; // TODO: byte[] ?
    dokumentStatusUrl: URI | null;
    padesUrl: URI | null;
    redirectUrlMor: URI | null;
    redirectUrlFar: URI | null;
    signertAvMor: string | null;
    signertAvFar: string | null;
}
