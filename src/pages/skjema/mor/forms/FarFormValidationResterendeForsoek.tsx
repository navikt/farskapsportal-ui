import AlertStripe from 'nav-frontend-alertstriper';
import { FormattedMessage } from 'react-intl';

interface FarFormValidationResterendeForsoekProps {
    antallResterendeForsoek?: number | null;
}

function FarFormValidationResterendeForsoek({
    antallResterendeForsoek,
}: FarFormValidationResterendeForsoekProps) {
    if (
        antallResterendeForsoek === null ||
        antallResterendeForsoek === undefined ||
        antallResterendeForsoek > 2
    ) {
        return null;
    }

    if (antallResterendeForsoek === 0) {
        return (
            <AlertStripe type="advarsel">
                <FormattedMessage id="mor.skjema.far.form.validation.resterendeForsoek.siste" />
            </AlertStripe>
        );
    }

    return (
        <AlertStripe type="advarsel">
            <FormattedMessage
                id="mor.skjema.far.form.validation.resterendeForsoek"
                values={{ antallResterendeForsoek: antallResterendeForsoek + 1 }}
            />
        </AlertStripe>
    );
}

export default FarFormValidationResterendeForsoek;
