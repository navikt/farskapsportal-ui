import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

import FormattedMessageWithExternalLink from 'components/formatted-message-with-external-link/FormattedMessageWithExternalLink';
import InfoExpandablePanel from 'components/info-expandable-panel/InfoExpandablePanel';

function Medmor() {
    return (
        <InfoExpandablePanel titleId="oversikt.moreInfoPanels.medmor.title">
            <Normaltekst>
                <FormattedMessage id="oversikt.moreInfoPanels.medmor.content.1" />
            </Normaltekst>
            <Normaltekst>
                <FormattedMessageWithExternalLink
                    textId="oversikt.moreInfoPanels.medmor.content.2"
                    linkId="oversikt.moreInfoPanels.medmor.content.link"
                />
            </Normaltekst>
        </InfoExpandablePanel>
    );
}

export default Medmor;
