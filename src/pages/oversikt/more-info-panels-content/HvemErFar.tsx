import { BodyShort } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';

import InfoExpandablePanel from 'components/info-expandable-panel/InfoExpandablePanel';

function HvemErFar() {
    return (
        <InfoExpandablePanel titleId="oversikt.moreInfoPanels.hvemErFar.title">
            <BodyShort>
                <FormattedMessage id="oversikt.moreInfoPanels.hvemErFar.content" />
            </BodyShort>
        </InfoExpandablePanel>
    );
}

export default HvemErFar;
