import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

import InfoExpandablePanel from 'components/info-expandable-panel/InfoExpandablePanel';

function ErJegFar() {
    return (
        <InfoExpandablePanel titleId="oversikt.moreInfoPanels.erJegFar.title">
            <Normaltekst>
                <FormattedMessage id="oversikt.moreInfoPanels.erJegFar.content" />
            </Normaltekst>
        </InfoExpandablePanel>
    );
}

export default ErJegFar;
