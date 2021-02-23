import { Redirect } from 'react-router-dom';

import ContentContainer from 'components/content-container/ContentContainer';
import Page from 'components/page/Page';
import { useStore } from 'store/Context';
import WithUserInfo from 'store/providers/WithUserInfo';
import { Foreldrerolle } from 'types/foreldrerolle';
import { Path } from 'types/path';
import { UserInfo } from 'types/user';
import { useQuery } from 'utils/hooks/useQuery';
import FarSkjema from './far/FarSkjema';
import MorSkjema from './mor/MorSkjema';

function Skjema() {
    const [{ language }] = useStore();
    const erklaeringId = useQuery().get('id');

    const renderContent = (userInfo: UserInfo) => {
        if (userInfo.forelderrolle === Foreldrerolle.Far) {
            return <FarSkjema userInfo={userInfo} />;
        } else if (userInfo.forelderrolle === Foreldrerolle.Mor) {
            if (!userInfo.kanOppretteFarskapserklaering) {
                return <Redirect to={`/${language}${Path.Oversikt}`} />;
            }

            return <MorSkjema />;
        } else if (userInfo.forelderrolle === Foreldrerolle.MorEllerFar) {
            // TODO: rework logic?
            if (erklaeringId) {
                return <FarSkjema userInfo={userInfo} />;
            } else if (userInfo.kanOppretteFarskapserklaering) {
                return <MorSkjema />;
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
