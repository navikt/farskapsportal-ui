import { BodyShort } from '@navikt/ds-react';
import { FormattedMessage, useIntl } from 'react-intl';

import ExternalLink from 'components/external-link/ExternalLink';
import InfoExpandablePanel from 'components/info-expandable-panel/InfoExpandablePanel';
import { getMessage } from 'utils/intl';

function HvaSkjerViderePanel() {
    const intl = useIntl();

    return (
        <InfoExpandablePanel titleId="kvittering.hvaSkjerVidere.title">
            <BodyShort>
                <FormattedMessage id="kvittering.hvaSkjerVidere.1" />
            </BodyShort>
            <BodyShort>
                <FormattedMessage id="kvittering.hvaSkjerVidere.2" />
            </BodyShort>
            <ExternalLink href={getMessage(intl, 'kvittering.hvaSkjerVidere.link')} />
        </InfoExpandablePanel>
    );
}

export default HvaSkjerViderePanel;
