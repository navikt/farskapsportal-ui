import Panel from 'nav-frontend-paneler';
import { Redirect } from 'react-router-dom';

import WithUserInfo from 'store/providers/WithUserInfo';
import { Foreldrerolle } from 'types/foreldrerolle';
import { Path } from 'types/path';

function Oversikt() {
    return (
        <WithUserInfo>
            {(userInfo) => {
                const canSkipToSoknad =
                    userInfo.forelderrolle === Foreldrerolle.Mor &&
                    !userInfo.morsVentendeFarskapserklaeringer?.length &&
                    !userInfo.farsVentendeFarskapserklaeringer?.length;

                if (canSkipToSoknad) {
                    return <Redirect to={Path.Soeknad} />;
                }

                return <Panel>Oversikt</Panel>;
            }}
        </WithUserInfo>
    );
}

export default Oversikt;
