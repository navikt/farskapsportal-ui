import { useStore } from 'store/Context';
import { Farskapserklaering } from 'types/farskapserklaering';
import { Path } from 'types/path';
import { UserInfo } from 'types/user';
import { ERKLAERING_ID } from 'utils/constants';
import { isSignedByMor } from 'utils/farskapserklaering';
import ErklaeringLinkPanel from './ErklaeringLinkPanel';

interface ErklaeringerAvventerBrukerProps {
    userInfo: UserInfo;
}

function ErklaeringerAvventerBruker({ userInfo }: ErklaeringerAvventerBrukerProps) {
    if (!userInfo.avventerSigneringBruker?.length) {
        return null;
    }

    return (
        <>
            {userInfo.avventerSigneringBruker.map((erklaering) =>
                isSignedByMor(erklaering) ? (
                    <LinkSkjema key={erklaering.idFarskapserklaering} erklaering={erklaering} />
                ) : (
                    <LinkSigner key={erklaering.idFarskapserklaering} erklaering={erklaering} />
                )
            )}
        </>
    );
}

function LinkSkjema({ erklaering }: { erklaering: Farskapserklaering }) {
    const [{ language }] = useStore();

    const linkPath = `/${language}${Path.Skjema}?${ERKLAERING_ID}=${erklaering.idFarskapserklaering}`;

    return (
        <ErklaeringLinkPanel
            linkPath={linkPath}
            erklaering={erklaering}
            displayMor={true}
            etikettType="fokus"
            etikettId="oversikt.erklaeringer.link.status.signering-bruker"
        />
    );
}

function LinkSigner({ erklaering }: { erklaering: Farskapserklaering }) {
    const [{ language }] = useStore();

    const linkPath = `/${language}${Path.Signer}?${ERKLAERING_ID}=${erklaering.idFarskapserklaering}`;

    return (
        <ErklaeringLinkPanel
            linkPath={linkPath}
            erklaering={erklaering}
            displayFar={true}
            etikettType="fokus"
            etikettId="oversikt.erklaeringer.link.status.signering-bruker"
        />
    );
}

export default ErklaeringerAvventerBruker;
