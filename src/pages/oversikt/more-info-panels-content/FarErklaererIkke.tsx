import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

import InfoExpandablePanel from 'components/info-expandable-panel/InfoExpandablePanel';

function FarErklaererIkke() {
    return (
        <InfoExpandablePanel titleId="oversikt.moreInfoPanels.farErklaererIkke.title">
            <Normaltekst>
                <FormattedMessage id="oversikt.moreInfoPanels.farErklaererIkke.content" />
            </Normaltekst>
        </InfoExpandablePanel>
    );
}

export default FarErklaererIkke;
