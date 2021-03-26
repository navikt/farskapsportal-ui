import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

import InfoExpandablePanel from 'components/info-expandable-panel/InfoExpandablePanel';

function HvemErFar() {
    return (
        <InfoExpandablePanel titleId="oversikt.moreInfoPanels.hvemErFar.title">
            <Normaltekst>
                <FormattedMessage id="oversikt.moreInfoPanels.hvemErFar.content" />
            </Normaltekst>
        </InfoExpandablePanel>
    );
}

export default HvemErFar;
