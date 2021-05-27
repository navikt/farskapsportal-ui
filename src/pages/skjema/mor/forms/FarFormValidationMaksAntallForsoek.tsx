import { FormattedMessage, useIntl } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import { getMessage } from '../../../../utils/intl';
import { getHoursUntil, getMinutesUntil } from '../../../../utils/date';

interface MaksAntallForsoekProps {
    tidspunktForNullstillingAvForsoek?: string | null;
}

const getAntallResterendeTimerEllerMinutterTextId = (
    antallResterendeTimerEllerMinutter: number
): string => {
    switch (antallResterendeTimerEllerMinutter) {
        case 1:
            return 'one';
        case 2:
            return 'two';
        case 3:
            return 'three';
        case 4:
            return 'four';
        case 5:
            return 'five';
        default:
            return antallResterendeTimerEllerMinutter.toString();
    }
};

function FarFormValidationMaksAntallForsoek({
    tidspunktForNullstillingAvForsoek,
}: MaksAntallForsoekProps) {
    const intl = useIntl();

    if (!tidspunktForNullstillingAvForsoek) {
        return null;
    }

    const timerIgjenForNullstillingAvForsoek = getHoursUntil(tidspunktForNullstillingAvForsoek);
    const timerEllerMinutterIgjenForNullstillingAvForsoek =
        timerIgjenForNullstillingAvForsoek > 0
            ? timerIgjenForNullstillingAvForsoek
            : getMinutesUntil(tidspunktForNullstillingAvForsoek);

    return (
        <>
            <Normaltekst>
                <FormattedMessage id="skjema.mor.far.validation.maksAntallForsoek.1" />
            </Normaltekst>
            <Normaltekst>
                <FormattedMessage
                    id="skjema.mor.far.validation.maksAntallForsoek.2"
                    values={{
                        timerEllerMinutterIgjenForNullstillingAvForsoek: getMessage(
                            intl,
                            getAntallResterendeTimerEllerMinutterTextId(
                                timerEllerMinutterIgjenForNullstillingAvForsoek
                            )
                        ),
                        tidsEnhet: getMessage(
                            intl,
                            timerIgjenForNullstillingAvForsoek > 0 ? 'timer' : 'minutter'
                        ),
                    }}
                />
            </Normaltekst>
        </>
    );
}

export default FarFormValidationMaksAntallForsoek;
