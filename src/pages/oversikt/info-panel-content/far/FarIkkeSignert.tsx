import { BodyShort } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';

function FarIkkeSignert() {
    return (
        <BodyShort>
            <FormattedMessage id="oversikt.infoPanel.far.ikkeSignert" />
        </BodyShort>
    );
}

export default FarIkkeSignert;
