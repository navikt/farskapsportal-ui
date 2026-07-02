import { Alert, Box, BodyShort, VStack, Heading } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';

import { Farskapserklaering } from 'types/farskapserklaering';
import { isBrukerFar, isSignedByFar } from 'utils/farskapserklaering';

interface MorAlertProps {
    erklaering: Farskapserklaering;
}

function MorAlert({ erklaering }: MorAlertProps) {
    if (isBrukerFar(erklaering) || isSignedByFar(erklaering)) {
        return null;
    }

    return (
        <Alert variant="warning">
            <VStack>
                <Heading size="small" spacing>
                    <FormattedMessage id="kvittering.morAlert.1" />
                </Heading>
                <BodyShort spacing>
                    <FormattedMessage id="kvittering.morAlert.2" />
                </BodyShort>
                <BodyShort>
                    <FormattedMessage id="kvittering.morAlert.3" />
                </BodyShort>
            </VStack>
        </Alert>
    );
}

export default MorAlert;
