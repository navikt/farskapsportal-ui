import { Farskapserklaering } from '../../types/farskapserklaering';
import { isSignedByFar } from '../../utils/farskapserklaering';
import { useIntl } from 'react-intl';
import { Stepper, VStack } from '@navikt/ds-react';
import { getMessage } from '../../utils/intl';

interface ProsessIndikatorProps {
    erklaering: Farskapserklaering;
}

// TODO: Check if erklaering has been archived and change icon?
function ProsessIndikator({ erklaering }: ProsessIndikatorProps) {
    const intl = useIntl();
    const signedByFar = isSignedByFar(erklaering);

    return (
        <VStack paddingBlock="space-16 space-24" paddingInline="space-8">
            <Stepper activeStep={signedByFar ? 3 : 2}>
                <Stepper.Step completed interactive={false}>
                    {getMessage(intl, 'kvittering.prosessIndikator.step.1')}
                </Stepper.Step>
                <Stepper.Step completed={signedByFar} interactive={false}>
                    {getMessage(intl, 'kvittering.prosessIndikator.step.2')}
                </Stepper.Step>
                <Stepper.Step interactive={false}>
                    {getMessage(intl, 'kvittering.prosessIndikator.step.3')}
                </Stepper.Step>
            </Stepper>
        </VStack>
    );
}

export default ProsessIndikator;
