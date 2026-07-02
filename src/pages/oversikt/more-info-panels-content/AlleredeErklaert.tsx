import { BodyShort } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';

import FormattedMessageWithExternalLink from 'components/formatted-message-with-external-link/FormattedMessageWithExternalLink';
import InfoExpandablePanel from 'components/info-expandable-panel/InfoExpandablePanel';

function AlleredeErklaert() {
    return (
        <InfoExpandablePanel titleId="oversikt.moreInfoPanels.alleredeErklaert.title">
            <BodyShort>
                <FormattedMessage id="oversikt.moreInfoPanels.alleredeErklaert.content.1" />
            </BodyShort>
            <BodyShort>
                <FormattedMessageWithExternalLink
                    textId="oversikt.moreInfoPanels.alleredeErklaert.content.2"
                    linkId="oversikt.moreInfoPanels.alleredeErklaert.link"
                />
            </BodyShort>
        </InfoExpandablePanel>
    );
}

export default AlleredeErklaert;
