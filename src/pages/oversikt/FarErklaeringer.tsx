import { FormattedDate, FormattedMessage } from 'react-intl';
import { EtikettFokus } from 'nav-frontend-etiketter';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';

import { Farskapserklaering } from 'types/farskapserklaering';
import { Foreldrerolle } from 'types/foreldrerolle';
import { Path } from 'types/path';
import { UserInfo } from 'types/user';
import { useNavigateTo } from 'utils/hooks/useNavigateTo';
import { getNameFromForelder } from 'utils/name';

interface FarErklaeringerProps {
    userInfo: UserInfo;
}

function FarErklaeringer({ userInfo }: FarErklaeringerProps) {
    if (!userInfo.farsVentendeFarskapserklaeringer?.length) {
        return null;
    }

    const isFar = userInfo.forelderrolle === Foreldrerolle.Far;

    return (
        <>
            {userInfo.farsVentendeFarskapserklaeringer.map((erklaering, index) => (
                <ErklaeringLinkPanel key={index} erklaering={erklaering} isFar={isFar} />
            ))}
        </>
    );
}

interface ErklaeringLinkPanelProps {
    erklaering: Farskapserklaering;
    isFar: boolean;
}

function ErklaeringLinkPanel({ erklaering, isFar }: ErklaeringLinkPanelProps) {
    const navigateTo = useNavigateTo();

    if (!erklaering.barn || !erklaering.dokument) {
        // TODO: handle
        // TODO: handle missing erklaering.mor and erklaering.far if isFar=false
        return null;
    }

    const handleClick = () => {
        if (isFar) {
            navigateTo(Path.Skjema);
        } else {
            navigateTo(Path.Kvittering);
        }
    };

    const renderForelder = () =>
        isFar ? (
            <Normaltekst>
                <FormattedMessage id="oversikt.erklaeringer.link.forelder.far" />
                {getNameFromForelder(erklaering.mor)}
            </Normaltekst>
        ) : (
            <Normaltekst>
                <FormattedMessage id="oversikt.erklaeringer.link.forelder.mor" />
                {getNameFromForelder(erklaering.far)}
            </Normaltekst>
        );

    const renderStatus = () =>
        isFar ? (
            <EtikettFokus>
                <FormattedMessage id="oversikt.erklaeringer.link.status.signering" />
            </EtikettFokus>
        ) : (
            <EtikettFokus>
                <FormattedMessage id="oversikt.erklaeringer.link.status.fars-signering" />
            </EtikettFokus>
        );

    return (
        <LenkepanelBase onClick={handleClick} border={true}>
            <div>
                <Systemtittel className="lenkepanel__heading" tag="h3">
                    <FormattedMessage id="oversikt.erklaeringer.link.title" />
                </Systemtittel>
                {renderForelder()}
                <Normaltekst>
                    {erklaering.barn.termindato ? (
                        <>
                            <FormattedMessage id="oversikt.erklaeringer.link.termindato" />
                            <FormattedDate
                                value={erklaering.barn.termindato}
                                year="numeric"
                                month="long"
                                day="numeric"
                            />
                        </>
                    ) : (
                        <>
                            <FormattedMessage id="oversikt.erklaeringer.link.foedselsnummer" />
                            {erklaering.barn.foedselsnummer}
                        </>
                    )}
                </Normaltekst>
                {renderStatus()}
            </div>
        </LenkepanelBase>
    );
}

export default FarErklaeringer;
