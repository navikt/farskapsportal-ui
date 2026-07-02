import { BodyShort } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';

import FormattedMessageWithExternalLink from 'components/formatted-message-with-external-link/FormattedMessageWithExternalLink';
import InfoExpandablePanel from 'components/info-expandable-panel/InfoExpandablePanel';

function HvaErFarskapserklaering() {
    return (
        <InfoExpandablePanel titleId="oversikt.moreInfoPanels.hvaErFarskapserklaering.title">
            <BodyShort>
                <FormattedMessage id="oversikt.moreInfoPanels.hvaErFarskapserklaering.content.1" />
            </BodyShort>
            <BodyShort>
                <FormattedMessageWithExternalLink
                    textId="oversikt.moreInfoPanels.hvaErFarskapserklaering.content.2"
                    linkId="oversikt.moreInfoPanels.hvaErFarskapserklaering.link"
                />
            </BodyShort>
        </InfoExpandablePanel>
    );
}

export default HvaErFarskapserklaering;
