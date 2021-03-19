import AlertStripe from 'nav-frontend-alertstriper';
import { FormattedMessage } from 'react-intl';

interface FarFormValidationResterendeForsoekProps {
    antallResterendeForsoek: number;
}

function FarFormValidationResterendeForsoek({
    antallResterendeForsoek,
}: FarFormValidationResterendeForsoekProps) {
    if (antallResterendeForsoek === 0 || antallResterendeForsoek > 3) {
        return null;
    }

    return (
        <AlertStripe type="advarsel">
            <FormattedMessage
                id="mor.skjema.far.form.validation.resterendeForsoek"
                values={{ antallResterendeForsoek }}
            />
        </AlertStripe>
    );
}

export default FarFormValidationResterendeForsoek;
