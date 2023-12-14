import AlertStripe from 'nav-frontend-alertstriper';
import { FormattedMessage } from 'react-intl';
import './FarFormValidationResterendeForsoek.less';

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
//             <AlertStripe type="advarsel">
//                 <FormattedMessage id="skjema.mor.far.validation.resterendeForsoek.final" />
//             </AlertStripe>
//         );
//     }
//
//     return (
//         <AlertStripe type="advarsel">
//             <FormattedMessage
//                 id="skjema.mor.far.validation.resterendeForsoek"
//                 values={{
//                     incorrectAttempts: getMessage(
//                         intl,
//                         getIncorrectAttemptsTextId(antallResterendeForsoek)
//                     ),
//                 }}
//             />
//         </AlertStripe>
//     );
// }

function FarFormValidationResterendeForsoek({
    antallResterendeForsoek,
}: FarFormValidationResterendeForsoekProps) {
    if (antallResterendeForsoek !== 1) {
        return null;
    }

    return (
        <AlertStripe type="advarsel" className="resterendeForsoek--alert">
            <FormattedMessage id="skjema.mor.far.validation.resterendeForsoek.final" />
        </AlertStripe>
    );
}

export default FarFormValidationResterendeForsoek;
