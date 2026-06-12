import { Alert, Box } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';

interface FarFormValidationResterendeForsoekProps {
    antallResterendeForsoek?: number | null;
}

// TODO: determine number of attempts
// const getIncorrectAttemptsTextId = (antallResterendeForsoek: number) => {
//     if (antallResterendeForsoek === 2) {
//         return 'three';
//     } else {
//         return 'two';
//     }
// };
//
// function FarFormValidationResterendeForsoek({
//     antallResterendeForsoek,
// }: FarFormValidationResterendeForsoekProps) {
//     const intl = useIntl();
//
//     if (!antallResterendeForsoek || antallResterendeForsoek > 3) {
//         return null;
//     }
//
//     if (antallResterendeForsoek === 1) {
//         return (
//             <Alert variant="warning">
//                 <FormattedMessage id="skjema.mor.far.validation.resterendeForsoek.final" />
//             </Alert>
//         );
//     }
//
//     return (
//         <Alert variant="warning">
//             <FormattedMessage
//                 id="skjema.mor.far.validation.resterendeForsoek"
//                 values={{
//                     incorrectAttempts: getMessage(
//                         intl,
//                         getIncorrectAttemptsTextId(antallResterendeForsoek)
//                     ),
//                 }}
//             />
//         </Alert>
//     );
// }

function FarFormValidationResterendeForsoek({
    antallResterendeForsoek,
}: FarFormValidationResterendeForsoekProps) {
    if (antallResterendeForsoek !== 1) {
        return null;
    }

    return (
        <Box marginBlock="space-16" asChild>
            <Alert variant="warning" role="alert" aria-live="polite">
                <FormattedMessage id="skjema.mor.far.validation.resterendeForsoek.final" />
            </Alert>
        </Box>
    );
}

export default FarFormValidationResterendeForsoek;
