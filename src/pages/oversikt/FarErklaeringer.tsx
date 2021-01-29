import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { EtikettFokus } from 'nav-frontend-etiketter';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';

import DatePresentation from 'components/date-presentation/DatePresentation';
import { useStore } from 'store/Context';
import { Farskapserklaering } from 'types/farskapserklaering';
import { Foreldrerolle } from 'types/foreldrerolle';
import { Path } from 'types/path';
import { UserInfo } from 'types/user';
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
            {userInfo.farsVentendeFarskapserklaeringer.map((erklaering) => (
                <ErklaeringLinkPanel
                    key={erklaering.idFarskapserklaering}
                    erklaering={erklaering}
                    isFar={isFar}
                />
            ))}
        </>
    );
}

interface ErklaeringLinkPanelProps {
    erklaering: Farskapserklaering;
    isFar: boolean;
}

function ErklaeringLinkPanel({ erklaering, isFar }: ErklaeringLinkPanelProps) {
    const [{ language }] = useStore();

    if (!erklaering.barn || !erklaering.dokument) {
        // TODO: handle
        // TODO: handle missing erklaering.mor and erklaering.far if isFar=false
        return null;
    }

    const linkPath = `/${language}${
        isFar ? `${Path.Skjema}?id=${erklaering.idFarskapserklaering}` : Path.Kvittering
    }`;

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
        <LenkepanelBase
            href=""
            linkCreator={(props) => <Link {...props} to={linkPath} />}
            border={true}
        >
            <div>
                <Systemtittel className="lenkepanel__heading" tag="h3">
                    <FormattedMessage id="oversikt.erklaeringer.link.title" />
                </Systemtittel>
                {renderForelder()}
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
                {renderStatus()}
            </div>
        </LenkepanelBase>
    );
}

export default FarErklaeringer;
