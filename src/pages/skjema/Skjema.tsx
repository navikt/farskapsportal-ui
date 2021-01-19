import { Redirect } from 'react-router-dom';

import Page from 'components/page/Page';
import { useStore } from 'store/Context';
import WithUserInfo from 'store/providers/WithUserInfo';
import { Foreldrerolle } from 'types/foreldrerolle';
import { Path } from 'types/path';
import FarSkjema from './far/FarSkjema';
import MorSkjema from './mor/MorSkjema';

function Skjema() {
    const [{ language }] = useStore();

    return (
        <Page
            titleId="header.skjema"
            breadcrumbs={[
                { titleId: 'breadcrumbs.oversikt', path: Path.Oversikt },
                { titleId: 'breadcrumbs.skjema' },
            ]}
        >
            <WithUserInfo>
                {(userInfo) => {
                    if (userInfo.forelderrolle === Foreldrerolle.Far) {
                        return <FarSkjema />;
                    } else if (userInfo.forelderrolle === Foreldrerolle.Mor) {
                        if (!userInfo.kanOppretteFarskapserklaering) {
                            return <Redirect to={`/${language}${Path.Oversikt}`} />;
                        }

                        return <MorSkjema />;
                    }

                    // TODO: handle foreldrerolle not Far or Mor
                    return null;
                }}
            </WithUserInfo>
        </Page>
    );
}

export default Skjema;
