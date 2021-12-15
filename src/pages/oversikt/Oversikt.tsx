import ContentContainer from 'components/content-container/ContentContainer';
import Page from 'components/page/Page';
import WithUserInfo from 'store/providers/WithUserInfo';
import MoreInfoPanels from './MoreInfoPanels';
import OversiktInfoPanel from './OversiktInfoPanel';
import VentendeErklaeringer from './VentendeErklaeringer';
import { UserInfo } from '../../types/user';
import { Foreldrerolle } from '../../types/foreldrerolle';
import { isLessThanNHoursInThePast } from '../../utils/date';

import './Oversikt.less';

function Oversikt() {
    return (
        <WithUserInfo>
            {(userInfo) => (
                <Page
                    titleId="header.oversikt"
                    breadcrumbs={[{ titleId: 'breadcrumbs.oversikt' }]}
                    alertTextId={getFarAlertTextId(userInfo)}
                >
                    <ContentContainer className="Oversikt">
                        <OversiktInfoPanel userInfo={userInfo} />
                        <MoreInfoPanels userInfo={userInfo} />
                        <VentendeErklaeringer userInfo={userInfo} />
                    </ContentContainer>
                </Page>
            )}
        </WithUserInfo>
    );
}

function getFarAlertTextId(userInfo: UserInfo) {
    if (userInfo.forelderrolle !== Foreldrerolle.Far) {
        return undefined;
    }

    const hasUnsignedErklaeringSignedByMotherWithinTheLastHour =
        !!userInfo.avventerSigneringBruker?.filter(
            (eklaering) =>
                eklaering.dokument?.signertAvMor &&
                isLessThanNHoursInThePast(eklaering.dokument.signertAvMor, 1)
        ).length;

    if (hasUnsignedErklaeringSignedByMotherWithinTheLastHour) {
        return 'oversikt.farAlert';
    } else {
        return undefined;
    }
}

export default Oversikt;
