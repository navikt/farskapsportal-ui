import AlertStripe from 'nav-frontend-alertstriper';
import { FormattedMessage, useIntl } from 'react-intl';

import { getMessage } from 'utils/intl';

interface FarFormValidationResterendeForsoekProps {
    antallResterendeForsoek?: number | null;
}

const getIncorrectAttemptsTextId = (antallResterendeForsoek: number) => {
    if (antallResterendeForsoek === 1) {
        return 'three';
    } else {
        return 'two';
    }
};

function FarFormValidationResterendeForsoek({
    antallResterendeForsoek,
}: FarFormValidationResterendeForsoekProps) {
    const intl = useIntl();

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
                <FormattedMessage id="mor.skjema.far.form.validation.resterendeForsoek.final" />
            </AlertStripe>
        );
    }

    return (
        <AlertStripe type="advarsel">
            <FormattedMessage
                id="mor.skjema.far.form.validation.resterendeForsoek"
                values={{
                    incorrectAttempts: getMessage(
                        intl,
                        getIncorrectAttemptsTextId(antallResterendeForsoek)
                    ),
                }}
            />
        </AlertStripe>
    );
}

export default FarFormValidationResterendeForsoek;
