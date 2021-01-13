import Page from 'components/page/Page';
import WithUserInfo from 'store/providers/WithUserInfo';
import InfoPanel from './info-panel/InfoPanel';
import FarErklaeringer from './FarErklaeringer';
import MorErklaeringer from './MorErklaeringer';
import ToSkjemaButton from './ToSkjemaButton';

import './Oversikt.less';

function Oversikt() {
    return (
        <Page titleId="header.oversikt">
            <WithUserInfo>
                {(userInfo) => (
                    <div className="Oversikt">
                        <InfoPanel userInfo={userInfo} />
                        <MorErklaeringer userInfo={userInfo} />
                        <FarErklaeringer userInfo={userInfo} />
                        <ToSkjemaButton userInfo={userInfo} />
                    </div>
                )}
            </WithUserInfo>
        </Page>
    );
}

export default Oversikt;
