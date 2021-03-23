import { Normaltekst } from 'nav-frontend-typografi';

import InfoPanel from 'components/info-panel/InfoPanel';
import { Foreldrerolle } from 'types/foreldrerolle';
import { UserInfo } from 'types/user';

interface OversiktInfoPanelProps {
    userInfo: UserInfo;
}

function OversiktInfoPanel({ userInfo }: OversiktInfoPanelProps) {
    const renderContent = () => {
        if (userInfo.forelderrolle === Foreldrerolle.Mor) {
            // TODO
        } else if (userInfo.forelderrolle === Foreldrerolle.Far) {
            // TODO
        }

        return null;
    };

    return (
        <InfoPanel>
            <Normaltekst>Her finner du informasjon om pågående farskapserklæringer.</Normaltekst>
            {renderContent()}
        </InfoPanel>
    );
}

export default OversiktInfoPanel;
