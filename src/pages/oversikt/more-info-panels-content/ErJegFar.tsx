import { BodyShort } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';

import InfoExpandablePanel from 'components/info-expandable-panel/InfoExpandablePanel';

function ErJegFar() {
    return (
        <InfoExpandablePanel titleId="oversikt.moreInfoPanels.erJegFar.title">
            <BodyShort>
                <FormattedMessage id="oversikt.moreInfoPanels.erJegFar.content" />
            </BodyShort>
        </InfoExpandablePanel>
    );
}

export default ErJegFar;
