import ContentContainer from 'components/content-container/ContentContainer';
import Page from 'components/page/Page';
import WithUserInfo from 'store/providers/WithUserInfo';
import MoreInfoPanels from './MoreInfoPanels';
import OversiktInfoPanel from './OversiktInfoPanel';
import VentendeErklaeringer from './VentendeErklaeringer';
import AlertStripe from 'nav-frontend-alertstriper';

import './Oversikt.less';

function Oversikt() {
    return (
        <Page titleId="header.oversikt" breadcrumbs={[{ titleId: 'breadcrumbs.oversikt' }]}>
            <WithUserInfo>
                {(userInfo) => (
                    <ContentContainer className="Oversikt">
                        <AlertStripe type="advarsel">
                            Oops! Vi opplever for tiden tekniske problemer i forbindelse med
                            signering hos posten. Det jobbes med en fiks nå! Vennligst prøv igjen i
                            morgen :)
                        </AlertStripe>
                        <br />
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
