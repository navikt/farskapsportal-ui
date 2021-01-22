import { FormattedMessage } from 'react-intl';
import { EtikettFokus } from 'nav-frontend-etiketter';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';

import DatePresentation from 'components/date-presentation/DatePresentation';
import { Farskapserklaering } from 'types/farskapserklaering';
import { UserInfo } from 'types/user';

interface MorErklaeringerProps {
    userInfo: UserInfo;
}

function MorErklaeringer({ userInfo }: MorErklaeringerProps) {
    if (!userInfo.morsVentendeFarskapserklaeringer?.length) {
        return null;
    }

    return (
        <>
            {userInfo.morsVentendeFarskapserklaeringer.map((erklaering, index) => (
                <ErklaeringLinkPanel key={index} erklaering={erklaering} />
            ))}
        </>
    );
}

interface ErklaeringLinkPanelProps {
    erklaering: Farskapserklaering;
}

function ErklaeringLinkPanel({ erklaering }: ErklaeringLinkPanelProps) {
    if (!erklaering.barn || !erklaering.dokument) {
        // TODO: handle
        return null;
    }

    return (
        <LenkepanelBase href={erklaering.dokument.redirectUrlMor ?? ''} border={true}>
            <div>
                <Systemtittel className="lenkepanel__heading" tag="h3">
                    <FormattedMessage id="oversikt.erklaeringer.link.title" />
                </Systemtittel>
                <Normaltekst>
                    {erklaering.barn.termindato ? (
                        <>
                            <FormattedMessage id="oversikt.erklaeringer.link.termindato" />
                            <DatePresentation date={erklaering.barn.termindato} />
                        </>
                    ) : (
                        <>
                            <FormattedMessage id="oversikt.erklaeringer.link.foedselsnummer" />
                            {erklaering.barn.foedselsnummer}
                        </>
                    )}
                </Normaltekst>
                <EtikettFokus>
                    <FormattedMessage id="oversikt.erklaeringer.link.status.signering" />
                </EtikettFokus>
            </div>
        </LenkepanelBase>
    );
}

export default MorErklaeringer;
