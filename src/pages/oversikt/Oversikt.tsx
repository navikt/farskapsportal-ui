import Page from 'components/page/Page';
import WithUserInfo from 'store/providers/WithUserInfo';
import InfoPanel from './info-panel/InfoPanel';
import BarnUtenErklaering from './BarnUtenErklaering';
import ErklaeringerAvventerBruker from './ErklaeringerAvventerBruker';
import ErklaeringerAvventerMotpart from './ErklaeringerAvventerMotpart';
import ErklaeringerAvventerRegistrering from './ErklaeringerAvventerRegistrering';
import ToSkjemaButton from './ToSkjemaButton';

import './Oversikt.less';

function Oversikt() {
    return (
        <Page titleId="header.oversikt" breadcrumbs={[{ titleId: 'breadcrumbs.oversikt' }]}>
            <WithUserInfo>
                {(userInfo) => (
                    <div className="Oversikt">
                        <InfoPanel userInfo={userInfo} />
                        <BarnUtenErklaering userInfo={userInfo} />
                        <ErklaeringerAvventerBruker userInfo={userInfo} />
                        <ErklaeringerAvventerMotpart userInfo={userInfo} />
                        <ErklaeringerAvventerRegistrering userInfo={userInfo} />
                        <ToSkjemaButton userInfo={userInfo} />
                    </div>
                )}
            </WithUserInfo>
        </Page>
    );
}

export default Oversikt;
