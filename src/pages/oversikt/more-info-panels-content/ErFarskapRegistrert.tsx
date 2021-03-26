import { Normaltekst } from 'nav-frontend-typografi';

import FormattedMessageWithExternalLink from 'components/formatted-message-with-external-link/FormattedMessageWithExternalLink';
import InfoExpandablePanel from 'components/info-expandable-panel/InfoExpandablePanel';

function ErFarskapRegistrert() {
    return (
        <InfoExpandablePanel titleId="oversikt.moreInfoPanels.erFarskapRegistrert.title">
            <Normaltekst>
                <FormattedMessageWithExternalLink
                    textId="oversikt.moreInfoPanels.erFarskapRegistrert.content"
                    linkId="oversikt.moreInfoPanels.erFarskapRegistrert.link"
                />
            </Normaltekst>
        </InfoExpandablePanel>
    );
}

export default ErFarskapRegistrert;
