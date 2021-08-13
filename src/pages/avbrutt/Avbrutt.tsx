import Page from '../../components/page/Page';
import ContentContainer from '../../components/content-container/ContentContainer';
import WithUserInfo from '../../store/providers/WithUserInfo';
import OversiktInfoPanel from '../oversikt/OversiktInfoPanel';
import MoreInfoPanels from '../oversikt/MoreInfoPanels';
import VentendeErklaeringer from '../oversikt/VentendeErklaeringer';
import AlertStripe from 'nav-frontend-alertstriper';
import { FormattedMessage } from 'react-intl';

import './Avbrutt.less';

function Avbrutt() {
    return (
        <Page titleId="header.avbrutt" breadcrumbs={[{ titleId: 'breadcrumbs.avbrutt' }]}>
            <WithUserInfo>
                {(userInfo) => (
                    <ContentContainer className="Avbrutt">
                        <AlertStripe type="advarsel">
                            <FormattedMessage id="avbrutt.alert" />
                        </AlertStripe>
                        <OversiktInfoPanel userInfo={userInfo} />
                        <MoreInfoPanels userInfo={userInfo} />
                        <VentendeErklaeringer userInfo={userInfo} />
                    </ContentContainer>
                )}
            </WithUserInfo>
        </Page>
    );
}

export default Avbrutt;
