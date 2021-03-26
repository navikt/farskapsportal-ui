import { Innholdstittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

import InfoPanel from 'components/info-panel/InfoPanel';
import { Foreldrerolle } from 'types/foreldrerolle';
import { UserInfo } from 'types/user';
import { getBarnUtenErklaering } from 'utils/farskapserklaering';
import FarIkkeSignert from './info-panel-content/far/FarIkkeSignert';
import FarSignert from './info-panel-content/far/FarSignert';
import FarUtenErklaering from './info-panel-content/far/FarUtenErklaering';
import MorFarIkkeSignert from './info-panel-content/mor/MorFarIkkeSignert';
import MorFarSignert from './info-panel-content/mor/MorFarSignert';
import MorIkkeSignert from './info-panel-content/mor/MorIkkeSignert';
import MorMedBarn from './info-panel-content/mor/MorMedBarn';
import MorUtenBarn from './info-panel-content/mor/MorUtenBarn';
import ToSkjemaButton from './ToSkjemaButton';

import './OversiktInfoPanel.less';

interface OversiktInfoPanelProps {
    userInfo: UserInfo;
}

function OversiktInfoPanel({ userInfo }: OversiktInfoPanelProps) {
    const renderContent = () => {
        if (userInfo.forelderrolle === Foreldrerolle.Mor) {
            if (userInfo.avventerSigneringBruker?.length) {
                return (
                    <MorIkkeSignert ikkeSignertErklaeringer={userInfo.avventerSigneringBruker} />
                );
            }

            if (getBarnUtenErklaering(userInfo).length) {
                return <MorMedBarn barn={getBarnUtenErklaering(userInfo)} />;
            }

            if (userInfo.avventerSigneringMotpart?.length) {
                return (
                    <MorFarIkkeSignert
                        farIkkeSignertErklaeringer={userInfo.avventerSigneringMotpart}
                    />
                );
            }

            if (userInfo.avventerRegistrering?.length) {
                return <MorFarSignert signertErklaeringer={userInfo.avventerRegistrering} />;
            }

            return <MorUtenBarn />;
        } else if (userInfo.forelderrolle === Foreldrerolle.Far) {
            if (userInfo.avventerSigneringBruker?.length) {
                return <FarIkkeSignert />;
            }

            if (userInfo.avventerRegistrering?.length) {
                return <FarSignert />;
            }

            return <FarUtenErklaering />;
        }

        // TODO: MOR_ELLER_FAR
        // TODO: handle error
        return null;
    };

    return (
        <InfoPanel className="OversiktInfoPanel">
            <Innholdstittel tag="h2">
                <FormattedMessage id="oversikt.infoPanel.greeting" />
            </Innholdstittel>
            {renderContent()}
            <ToSkjemaButton userInfo={userInfo} />
        </InfoPanel>
    );
}

export default OversiktInfoPanel;
