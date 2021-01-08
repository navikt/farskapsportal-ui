import { FormattedMessage } from 'react-intl';
import Panel from 'nav-frontend-paneler';
import { Innholdstittel } from 'nav-frontend-typografi';

import WithUserInfo from 'store/providers/WithUserInfo';
import FarErklaeringer from './FarErklaeringer';
import MorErklaeringer from './MorErklaeringer';
import ToSkjemaButton from './ToSkjemaButton';

import './Oversikt.less';

function Oversikt() {
    return (
        <WithUserInfo>
            {(userInfo) => (
                <Panel className="Oversikt">
                    <Innholdstittel>
                        <FormattedMessage id="oversikt.title" />
                    </Innholdstittel>
                    <MorErklaeringer userInfo={userInfo} />
                    <FarErklaeringer userInfo={userInfo} />
                    <ToSkjemaButton userInfo={userInfo} />
                </Panel>
            )}
        </WithUserInfo>
    );
}

export default Oversikt;
