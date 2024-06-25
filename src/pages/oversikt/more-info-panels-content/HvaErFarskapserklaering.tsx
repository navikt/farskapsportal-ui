import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

import FormattedMessageWithExternalLink from 'components/formatted-message-with-external-link/FormattedMessageWithExternalLink';
import InfoExpandablePanel from 'components/info-expandable-panel/InfoExpandablePanel';

function HvaErFarskapserklaering() {
    return (
        <InfoExpandablePanel titleId="oversikt.moreInfoPanels.hvaErFarskapserklaering.title">
            <Normaltekst>
                <FormattedMessage id="oversikt.moreInfoPanels.hvaErFarskapserklaering.content.1" />
            </Normaltekst>
            <Normaltekst>
                <FormattedMessageWithExternalLink
                    textId="oversikt.moreInfoPanels.hvaErFarskapserklaering.content.2"
                    linkId="oversikt.moreInfoPanels.hvaErFarskapserklaering.link"
                />
            </Normaltekst>
        </InfoExpandablePanel>
    );
}

export default HvaErFarskapserklaering;
