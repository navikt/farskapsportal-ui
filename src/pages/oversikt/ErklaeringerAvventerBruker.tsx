import { useStore } from 'store/Context';
import { Farskapserklaering } from 'types/farskapserklaering';
import { Path } from 'types/path';
import { UserInfo } from 'types/user';
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
                    <LinkSkjema erklaering={erklaering} />
                ) : (
                    <LinkESignering erklaering={erklaering} />
                )
            )}
        </>
    );
}

function LinkSkjema({ erklaering }: { erklaering: Farskapserklaering }) {
    const [{ language }] = useStore();

    const linkPath = `/${language}${Path.Skjema}?id=${erklaering.idFarskapserklaering}`;

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

function LinkESignering({ erklaering }: { erklaering: Farskapserklaering }) {
    return (
        <ErklaeringLinkPanel
            href={erklaering.dokument?.redirectUrlMor ?? ''}
            erklaering={erklaering}
            etikettType="fokus"
            etikettId="oversikt.erklaeringer.link.status.signering-bruker"
        />
    );
}

export default ErklaeringerAvventerBruker;
