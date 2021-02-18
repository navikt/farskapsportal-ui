import { Barn } from './barn';

export type Outbound = OutboundFather | OutboundOpprettFarskapserklaering;

export interface OutboundFather {
    foedselsnummer: string;
    navn: string;
}

export interface OutboundOpprettFarskapserklaering {
    barn: Barn;
    opplysningerOmFar: OutboundFather;
    borSammen: boolean;
}
