import { BodyShort } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';

import InfoExpandablePanel from 'components/info-expandable-panel/InfoExpandablePanel';

function FarErklaererIkke() {
    return (
        <InfoExpandablePanel titleId="oversikt.moreInfoPanels.farErklaererIkke.title">
            <BodyShort>
                <FormattedMessage id="oversikt.moreInfoPanels.farErklaererIkke.content" />
            </BodyShort>
        </InfoExpandablePanel>
    );
}

export default FarErklaererIkke;
