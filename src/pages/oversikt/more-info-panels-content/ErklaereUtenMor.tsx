import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

import FormattedMessageWithExternalLink from 'components/formatted-message-with-external-link/FormattedMessageWithExternalLink';
import InfoExpandablePanel from 'components/info-expandable-panel/InfoExpandablePanel';

function ErklaereUtenMor() {
    return (
        <InfoExpandablePanel titleId="oversikt.moreInfoPanels.erklaereUtenMor.title">
            <Normaltekst>
                <FormattedMessage id="oversikt.moreInfoPanels.erklaereUtenMor.content.1" />
            </Normaltekst>
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
            <Normaltekst>
                <FormattedMessageWithExternalLink
                    textId="oversikt.moreInfoPanels.erklaereUtenMor.content.2"
                    linkId="oversikt.moreInfoPanels.erklaereUtenMor.content.2.link"
                />
            </Normaltekst>
        </InfoExpandablePanel>
    );
}

export default ErklaereUtenMor;
