import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

import LinkPanel from 'components/link-panel/LinkPanel';
import { useStore } from 'store/Context';
import { Path } from 'types/path';
import { UserInfo } from 'types/user';
import { formatFoedselsnummer } from 'utils/foedselsnummer';

interface BarnUtenErklaeringProps {
    userInfo: UserInfo;
}

const getBarnUtenErklaering = (userInfo: UserInfo): string[] => {
    const barnMedErklaering = (userInfo.avventerSigneringBruker ?? [])
        .concat(userInfo.avventerSigneringMotpart ?? [])
        .map((erklaering) => erklaering.barn?.foedselsnummer ?? '');

    return (
        userInfo.fnrNyligFoedteBarnUtenRegistrertFar?.filter(
            (fnr) => !barnMedErklaering.includes(fnr)
        ) ?? []
    );
};

function BarnUtenErklaering({ userInfo }: BarnUtenErklaeringProps) {
    const barnUtenErklaering = getBarnUtenErklaering(userInfo);

    if (!barnUtenErklaering.length) {
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

    const linkPath = `/${language}${Path.Skjema}?fnr=${foedselsnummer}`;

    return (
        <LinkPanel
            linkPath={linkPath}
            titleId="oversikt.barn.link.title"
            etikettType="fokus"
            etikettId="oversikt.barn.link.status"
        >
            <Normaltekst>
                <FormattedMessage id="oversikt.barn.link.foedselsnummer" />
                {formatFoedselsnummer(foedselsnummer)}
            </Normaltekst>
        </LinkPanel>
    );
}

export default BarnUtenErklaering;
