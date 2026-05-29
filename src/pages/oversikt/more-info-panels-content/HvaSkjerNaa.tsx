import { BodyShort } from '@navikt/ds-react';

import FormattedMessageWithExternalLink from 'components/formatted-message-with-external-link/FormattedMessageWithExternalLink';
import InfoExpandablePanel from 'components/info-expandable-panel/InfoExpandablePanel';

function HvaSkjerNaa() {
    return (
        <InfoExpandablePanel titleId="oversikt.moreInfoPanels.hvaSkjerNaa.title">
            <BodyShort>
                <FormattedMessageWithExternalLink
                    textId="oversikt.moreInfoPanels.hvaSkjerNaa.content"
                    linkId="oversikt.moreInfoPanels.hvaSkjerNaa.link"
                />
            </BodyShort>
        </InfoExpandablePanel>
    );
}

export default HvaSkjerNaa;
