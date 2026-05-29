import { Alert } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';

import { Farskapserklaering } from 'types/farskapserklaering';
import { isBrukerFar, isSignedByFar } from 'utils/farskapserklaering';
import { BodyShort } from '@navikt/ds-react';

import './MorAlert.css';

interface MorAlertProps {
    erklaering: Farskapserklaering;
}

function MorAlert({ erklaering }: MorAlertProps) {
    if (isBrukerFar(erklaering) || isSignedByFar(erklaering)) {
        return null;
    }

    return (
        <Alert variant="warning" className="MorAlert">
            <div className="MorAlert__boldtext">
                <FormattedMessage id="kvittering.morAlert.1" />
            </div>
            <BodyShort>
                <FormattedMessage id="kvittering.morAlert.2" />
            </BodyShort>
            <br />
            <BodyShort>
                <FormattedMessage id="kvittering.morAlert.3" />
            </BodyShort>
        </Alert>
    );
}

export default MorAlert;
