import { FormattedMessage } from 'react-intl';
import { Redirect } from 'react-router-dom';
import Panel from 'nav-frontend-paneler';
import { Innholdstittel } from 'nav-frontend-typografi';

import WithUserInfo from 'store/providers/WithUserInfo';
import { Foreldrerolle } from 'types/foreldrerolle';
import { Path } from 'types/path';
import FarErklaeringer from './FarErklaeringer';
import MorErklaeringer from './MorErklaeringer';
import ToSoeknadButton from './ToSoeknadButton';

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

                return (
                    <Panel className="Oversikt">
                        <Innholdstittel>
                            <FormattedMessage id="oversikt.title" />
                        </Innholdstittel>
                        <MorErklaeringer userInfo={userInfo} />
                        <FarErklaeringer userInfo={userInfo} />
                        <ToSoeknadButton userInfo={userInfo} />
                    </Panel>
                );
            }}
        </WithUserInfo>
    );
}

export default Oversikt;
