import { Normaltekst } from 'nav-frontend-typografi';
import Veilederpanel from 'nav-frontend-veilederpanel';

import { ReactComponent as FamilieSvg } from 'assets/icons/familie.svg';
import { Foreldrerolle } from 'types/foreldrerolle';
import { UserInfo } from 'types/user';

import './InfoPanel.less';

interface InfoPanelProps {
    userInfo: UserInfo;
}

function InfoPanel({ userInfo }: InfoPanelProps) {
    const renderContent = () => {
        if (userInfo.forelderrolle === Foreldrerolle.Mor) {
            // TODO
        } else if (userInfo.forelderrolle === Foreldrerolle.Far) {
            // TODO
        }

        return null;
    };

    return (
        <div className="InfoPanel">
            <Veilederpanel type="plakat" svg={<FamilieSvg />} kompakt={true}>
                <Normaltekst>
                    Her finner du informasjon om pågående farskapserklæringer.
                </Normaltekst>
                {renderContent()}
            </Veilederpanel>
        </div>
    );
}

export default InfoPanel;
