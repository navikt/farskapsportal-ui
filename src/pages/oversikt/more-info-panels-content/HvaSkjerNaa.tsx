import { Normaltekst } from 'nav-frontend-typografi';

import FormattedMessageWithExternalLink from 'components/formatted-message-with-external-link/FormattedMessageWithExternalLink';
import InfoExpandablePanel from 'components/info-expandable-panel/InfoExpandablePanel';

function HvaSkjerNaa() {
    return (
        <InfoExpandablePanel titleId="oversikt.moreInfoPanels.hvaSkjerNaa.title">
            <Normaltekst>
                <FormattedMessageWithExternalLink
                    textId="oversikt.moreInfoPanels.hvaSkjerNaa.content"
                    linkId="oversikt.moreInfoPanels.hvaSkjerNaa.link"
                />
            </Normaltekst>
        </InfoExpandablePanel>
    );
}

export default HvaSkjerNaa;
