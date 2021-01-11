import { FormattedMessage } from 'react-intl';
import { Innholdstittel } from 'nav-frontend-typografi';

import WithUserInfo from 'store/providers/WithUserInfo';
import InfoPanel from './info-panel/InfoPanel';
import FarErklaeringer from './FarErklaeringer';
import MorErklaeringer from './MorErklaeringer';
import ToSkjemaButton from './ToSkjemaButton';

import './Oversikt.less';

function Oversikt() {
    return (
        <WithUserInfo>
            {(userInfo) => (
                <div className="Oversikt">
                    <Innholdstittel>
                        <FormattedMessage id="oversikt.title" />
                    </Innholdstittel>
                    <InfoPanel userInfo={userInfo} />
                    <MorErklaeringer userInfo={userInfo} />
                    <FarErklaeringer userInfo={userInfo} />
                    <ToSkjemaButton userInfo={userInfo} />
                </div>
            )}
        </WithUserInfo>
    );
}

export default Oversikt;
