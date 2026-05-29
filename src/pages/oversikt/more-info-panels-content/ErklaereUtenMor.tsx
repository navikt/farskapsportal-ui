import { BodyShort } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';

import FormattedMessageWithExternalLink from 'components/formatted-message-with-external-link/FormattedMessageWithExternalLink';
import InfoExpandablePanel from 'components/info-expandable-panel/InfoExpandablePanel';

function ErklaereUtenMor() {
    return (
        <InfoExpandablePanel titleId="oversikt.moreInfoPanels.erklaereUtenMor.title">
            <BodyShort>
                <FormattedMessage id="oversikt.moreInfoPanels.erklaereUtenMor.content.1" />
            </BodyShort>
            <ul>
                <li>
                    <FormattedMessage id="oversikt.moreInfoPanels.erklaereUtenMor.content.li.1" />
                </li>
                <li>
                    <FormattedMessage id="oversikt.moreInfoPanels.erklaereUtenMor.content.li.2" />
                </li>
                <li>
                    <FormattedMessage id="oversikt.moreInfoPanels.erklaereUtenMor.content.li.3" />
                </li>
                <li>
                    <FormattedMessage id="oversikt.moreInfoPanels.erklaereUtenMor.content.li.4" />
                </li>
                <li>
                    <FormattedMessage id="oversikt.moreInfoPanels.erklaereUtenMor.content.li.5" />
                </li>
            </ul>
            <BodyShort>
                <FormattedMessage id="oversikt.moreInfoPanels.erklaereUtenMor.content.2" />
            </BodyShort>
            <BodyShort>
                <FormattedMessageWithExternalLink
                    textId="oversikt.moreInfoPanels.erklaereUtenMor.content.3"
                    linkId="oversikt.moreInfoPanels.erklaereUtenMor.content.3.link"
                />
            </BodyShort>
        </InfoExpandablePanel>
    );
}

export default ErklaereUtenMor;
