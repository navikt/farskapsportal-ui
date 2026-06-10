import { Alert, Box, BodyShort, VStack } from '@navikt/ds-react';
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
        <Box marginBlock="space-24 space-0">
            <Alert variant="warning">
                <VStack gap="space-16">
                    <BodyShort weight="semibold">
                        <FormattedMessage id="kvittering.morAlert.1" />
                    </BodyShort>
                    <BodyShort>
                        <FormattedMessage id="kvittering.morAlert.2" />
                    </BodyShort>
                    <BodyShort>
                        <FormattedMessage id="kvittering.morAlert.3" />
                    </BodyShort>
                </VStack>
            </Alert>
        </Box>
    );
}

export default MorAlert;
