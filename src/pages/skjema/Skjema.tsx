import {Redirect} from 'react-router-dom';

import ContentContainer from 'components/content-container/ContentContainer';
import Page from 'components/page/Page';
import {useStore} from 'store/Context';
import WithUserInfo from 'store/providers/WithUserInfo';
import {Foreldrerolle} from 'types/foreldrerolle';
import {Path} from 'types/path';
import {UserInfo} from 'types/user';
import {ERKLAERING_ID} from 'utils/constants';
import {useQuery} from 'utils/hooks/useQuery';
import MorSkjemaNy from "./mor/MorSkjemaNy";
import FarSkjemaNy from "./far/FarSkjemaNy";

function Skjema() {
    const [{ language }] = useStore();
    const erklaeringId = useQuery().get(ERKLAERING_ID);

    const renderContent = (userInfo: UserInfo) => {
        if (userInfo.forelderrolle === Foreldrerolle.Far) {
            return <FarSkjemaNy userInfo={userInfo} />;
        } else if (userInfo.forelderrolle === Foreldrerolle.Mor) {
            if (!userInfo.kanOppretteFarskapserklaering) {
                return <Redirect to={`/${language}${Path.Oversikt}`} />;
            }

            return <MorSkjemaNy userInfo={userInfo} />;
        } else if (userInfo.forelderrolle === Foreldrerolle.MorEllerFar) {
            // TODO: rework logic?
            if (erklaeringId) {
                return <FarSkjemaNy userInfo={userInfo} />;
            } else if (userInfo.kanOppretteFarskapserklaering) {
                return <MorSkjemaNy userInfo={userInfo} />;
            }
        }

        // TODO: handle foreldrerolle not Far or Mor
        return null;
    };

    return (
        <Page
            titleId="header.skjema"
            breadcrumbs={[
                { titleId: 'breadcrumbs.oversikt', path: Path.Oversikt },
                { titleId: 'breadcrumbs.skjema' },
            ]}
        >
            <WithUserInfo>
                {(userInfo) => <ContentContainer>{renderContent(userInfo)}</ContentContainer>}
            </WithUserInfo>
        </Page>
    );
}

export default Skjema;
