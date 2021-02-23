import ContentContainer from 'components/content-container/ContentContainer';
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
                    <ContentContainer className="Oversikt">
                        <InfoPanel userInfo={userInfo} />
                        <BarnUtenErklaering userInfo={userInfo} />
                        <ErklaeringerAvventerBruker userInfo={userInfo} />
                        <ErklaeringerAvventerMotpart userInfo={userInfo} />
                        <ErklaeringerAvventerRegistrering userInfo={userInfo} />
                        <ToSkjemaButton userInfo={userInfo} />
                    </ContentContainer>
                )}
            </WithUserInfo>
        </Page>
    );
}

export default Oversikt;
