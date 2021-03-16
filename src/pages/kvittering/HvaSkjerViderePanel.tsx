import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage, useIntl } from 'react-intl';

import ExternalLink from 'components/external-link/ExternalLink';
import { getMessage } from 'utils/intl';
import KvitteringInfoPanel from './KvitteringInfoPanel';

function HvaSkjerViderePanel() {
    const intl = useIntl();

    return (
        <KvitteringInfoPanel titleId="kvittering.hvaSkjerVidere.title">
            <Normaltekst>
                <FormattedMessage id="kvittering.hvaSkjerVidere.1" />
            </Normaltekst>
            <Normaltekst>
                <FormattedMessage id="kvittering.hvaSkjerVidere.2" />
            </Normaltekst>
            <ExternalLink href={getMessage(intl, 'kvittering.hvaSkjerVidere.link')} />
        </KvitteringInfoPanel>
    );
}

export default HvaSkjerViderePanel;
