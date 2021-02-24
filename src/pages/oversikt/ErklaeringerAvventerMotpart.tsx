import { useStore } from 'store/Context';
import { Farskapserklaering } from 'types/farskapserklaering';
import { Path } from 'types/path';
import { UserInfo } from 'types/user';
import ErklaeringLinkPanel from './ErklaeringLinkPanel';

interface ErklaeringerAvventerMotpartProps {
    userInfo: UserInfo;
}

function ErklaeringerAvventerMotpart({ userInfo }: ErklaeringerAvventerMotpartProps) {
    if (!userInfo.avventerSigneringMotpart?.length) {
        return null;
    }

    return (
        <>
            {userInfo.avventerSigneringMotpart.map((erklaering) => (
                <LinkKvittering key={erklaering.idFarskapserklaering} erklaering={erklaering} />
            ))}
        </>
    );
}

function LinkKvittering({ erklaering }: { erklaering: Farskapserklaering }) {
    const [{ language }] = useStore();

    const linkPath = `/${language}${Path.Kvittering}`;

    return (
        <ErklaeringLinkPanel
            linkPath={linkPath}
            erklaering={erklaering}
            displayFar={true}
            etikettType="fokus"
            etikettId="oversikt.erklaeringer.link.status.signering-motpart"
        />
    );
}

export default ErklaeringerAvventerMotpart;
