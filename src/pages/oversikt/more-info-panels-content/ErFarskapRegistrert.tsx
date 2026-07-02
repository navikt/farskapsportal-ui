import { BodyShort } from '@navikt/ds-react';

import FormattedMessageWithExternalLink from 'components/formatted-message-with-external-link/FormattedMessageWithExternalLink';
import InfoExpandablePanel from 'components/info-expandable-panel/InfoExpandablePanel';

function ErFarskapRegistrert() {
    return (
        <InfoExpandablePanel titleId="oversikt.moreInfoPanels.erFarskapRegistrert.title">
            <BodyShort>
                <FormattedMessageWithExternalLink
                    textId="oversikt.moreInfoPanels.erFarskapRegistrert.content"
                    linkId="oversikt.moreInfoPanels.erFarskapRegistrert.link"
                />
            </BodyShort>
        </InfoExpandablePanel>
    );
}

export default ErFarskapRegistrert;
