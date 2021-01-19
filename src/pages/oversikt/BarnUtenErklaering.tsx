import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { EtikettInfo } from 'nav-frontend-etiketter';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';

import { useStore } from 'store/Context';
import { Path } from 'types/path';
import { UserInfo } from 'types/user';

interface BarnUtenErklaeringProps {
    userInfo: UserInfo;
}

function BarnUtenErklaering({ userInfo }: BarnUtenErklaeringProps) {
    const barnMedErklaering = (userInfo.morsVentendeFarskapserklaeringer ?? [])
        .concat(userInfo.farsVentendeFarskapserklaeringer ?? [])
        .map((erklaering) => erklaering.barn?.foedselsnummer ?? '');

    const barnUtenErklaering = userInfo.fnrNyligFoedteBarnUtenRegistrertFar?.filter(
        (fnr) => !barnMedErklaering.includes(fnr)
    );

    if (!barnUtenErklaering?.length) {
        return null;
    }

    return (
        <>
            {barnUtenErklaering.map((fnr) => (
                <BarnLinkPanel key={fnr} foedselsnummer={fnr} />
            ))}
        </>
    );
}

function BarnLinkPanel({ foedselsnummer }: { foedselsnummer: string }) {
    const [{ language }] = useStore();

    return (
        <LenkepanelBase
            href=""
            linkCreator={(props) => (
                <Link {...props} to={`/${language}${Path.Skjema}?fnr=${foedselsnummer}`} />
            )}
            border={true}
        >
            <div>
                <Systemtittel className="lenkepanel__heading" tag="h3">
                    <FormattedMessage id="oversikt.barn.link.title" />
                </Systemtittel>
                <Normaltekst>
                    <FormattedMessage id="oversikt.barn.link.foedselsnummer" />
                    {foedselsnummer}
                </Normaltekst>
                <EtikettInfo>
                    <FormattedMessage id="oversikt.barn.link.status" />
                </EtikettInfo>
            </div>
        </LenkepanelBase>
    );
}

export default BarnUtenErklaering;
