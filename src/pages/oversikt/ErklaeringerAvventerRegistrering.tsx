import { useStore } from 'store/Context';
import { Farskapserklaering } from 'types/farskapserklaering';
import { Path } from 'types/path';
import { UserInfo } from 'types/user';
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

    const linkPath = `/${language}${Path.Kvittering}?id=${erklaering.idFarskapserklaering}`;

    return (
        <ErklaeringLinkPanel
            linkPath={linkPath}
            erklaering={erklaering}
            displayMor={true}
            displayFar={true}
            etikettType="suksess"
            etikettId="oversikt.erklaeringer.link.status.registrering"
        />
    );
}

export default ErklaeringerAvventerRegistrering;
