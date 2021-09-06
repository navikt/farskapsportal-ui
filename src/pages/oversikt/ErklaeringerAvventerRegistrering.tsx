import { useStore } from 'store/Context';
import { Farskapserklaering } from 'types/farskapserklaering';
import { Path } from 'types/path';
import { UserInfo } from 'types/user';
import { ERKLAERING_ID } from 'utils/constants';
import ErklaeringLinkPanel from './ErklaeringLinkPanel';

interface ErklaeringerAvventerRegistreringProps {
    userInfo: UserInfo;
}

function ErklaeringerAvventerRegistrering({ userInfo }: ErklaeringerAvventerRegistreringProps) {
    if (!userInfo.avventerRegistrering?.length) {
        return null;
    }

    return (
        <>
            {userInfo.avventerRegistrering.map((erklaering) => (
                <LinkKvittering key={erklaering.idFarskapserklaering} erklaering={erklaering} />
            ))}
        </>
    );
}

function LinkKvittering({ erklaering }: { erklaering: Farskapserklaering }) {
    const [{ language }] = useStore();

    const linkPath = `/${language}${Path.Kvittering}?${ERKLAERING_ID}=${erklaering.idFarskapserklaering}`;
    const etikettType = erklaering.sendtTilSkatt ? 'suksess' : 'fokus';
    const etikettId = erklaering.sendtTilSkatt
        ? 'oversikt.erklaeringer.link.status.registrering'
        : 'oversikt.erklaeringer.link.status.registrering-pending';

    return (
        <ErklaeringLinkPanel
            linkPath={linkPath}
            erklaering={erklaering}
            displayMor={true}
            displayFar={true}
            etikettType={etikettType}
            etikettId={etikettId}
        />
    );
}

export default ErklaeringerAvventerRegistrering;
