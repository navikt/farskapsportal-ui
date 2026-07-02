import { BodyShort } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';

import FormattedMessageWithExternalLink from 'components/formatted-message-with-external-link/FormattedMessageWithExternalLink';
import InfoExpandablePanel from 'components/info-expandable-panel/InfoExpandablePanel';

function Medmor() {
    return (
        <InfoExpandablePanel titleId="oversikt.moreInfoPanels.medmor.title">
            <BodyShort>
                <FormattedMessage id="oversikt.moreInfoPanels.medmor.content.1" />
            </BodyShort>
            <BodyShort>
                <FormattedMessageWithExternalLink
                    textId="oversikt.moreInfoPanels.medmor.content.2"
                    linkId="oversikt.moreInfoPanels.medmor.content.link"
                />
            </BodyShort>
        </InfoExpandablePanel>
    );
}

export default Medmor;
