import ContentContainer from 'components/content-container/ContentContainer';
import Page from 'components/page/Page';
import WithUserInfo from 'store/providers/WithUserInfo';
import MoreInfoPanels from './MoreInfoPanels';
import OversiktInfoPanel from './OversiktInfoPanel';
import VentendeErklaeringer from "./VentendeErklaeringer";

import './Oversikt.less';

function Oversikt() {
    return (
        <Page titleId="header.oversikt" breadcrumbs={[{ titleId: 'breadcrumbs.oversikt' }]}>
            <WithUserInfo>
                {(userInfo) => (
                    <ContentContainer className="Oversikt">
                        <OversiktInfoPanel userInfo={userInfo} />
                        <MoreInfoPanels userInfo={userInfo} />
                        <VentendeErklaeringer userInfo={userInfo} />
                    </ContentContainer>
                )}
            </WithUserInfo>
        </Page>
    );
}

export default Oversikt;
