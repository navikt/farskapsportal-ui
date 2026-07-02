import Page from '../../components/page/Page';
import ContentContainer from '../../components/content-container/ContentContainer';
import WithUserInfo from '../../store/providers/WithUserInfo';
import OversiktInfoPanel from '../oversikt/OversiktInfoPanel';
import MoreInfoPanels from '../oversikt/MoreInfoPanels';
import VentendeErklaeringer from '../oversikt/VentendeErklaeringer';
import { Alert, VStack } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';
import { Foreldrerolle } from '../../types/foreldrerolle';

function AvbruttOversikt() {
    return (
        <Page titleId="header.avbrutt" breadcrumbs={[{ titleId: 'breadcrumbs.avbrutt' }]}>
            <WithUserInfo>
                {(userInfo) => (
                    <ContentContainer>
                            <Alert variant="warning">
                                {userInfo.forelderrolle === Foreldrerolle.Mor ? (
                                    <FormattedMessage id="avbrutt.alert.mor" />
                                ) : (
                                    <FormattedMessage id="avbrutt.alert.far" />
                                )}
                            </Alert>
                        <VStack gap="space-16">
                            <OversiktInfoPanel userInfo={userInfo} />
                            <MoreInfoPanels userInfo={userInfo} />
                        </VStack>
                        <VentendeErklaeringer userInfo={userInfo} />
                    </ContentContainer>
                )}
            </WithUserInfo>
        </Page>
    );
}

export default AvbruttOversikt;
