import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

import FormattedMessageWithExternalLink from 'components/formatted-message-with-external-link/FormattedMessageWithExternalLink';
import InfoExpandablePanel from 'components/info-expandable-panel/InfoExpandablePanel';

function AlleredeErklaert() {
    return (
        <InfoExpandablePanel titleId="oversikt.moreInfoPanels.alleredeErklaert.title">
            <Normaltekst>
                <FormattedMessage id="oversikt.moreInfoPanels.alleredeErklaert.content.1" />
            </Normaltekst>
            <Normaltekst>
                <FormattedMessageWithExternalLink
                    textId="oversikt.moreInfoPanels.alleredeErklaert.content.2"
                    linkId="oversikt.moreInfoPanels.alleredeErklaert.link"
                />
            </Normaltekst>
        </InfoExpandablePanel>
    );
}

export default AlleredeErklaert;
