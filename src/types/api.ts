import { Barn } from './barn';

export type Outbound = OutboundFatherControl | OutboundOpprettFarskapserklaering;

export interface OutboundFatherControl {
    foedselsnummer: string;
    navn: string;
}

export interface OutboundOpprettFarskapserklaering {
    barn: Barn;
    opplysningerOmFar: {
        foedselsnummer: string;
        navn: string;
    };
}
