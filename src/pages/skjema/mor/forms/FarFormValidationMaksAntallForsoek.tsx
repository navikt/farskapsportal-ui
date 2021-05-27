import { FormattedMessage, useIntl } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import { getMessage } from '../../../../utils/intl';
import { getHoursUntil, getMinutesUntil } from '../../../../utils/date';

interface MaksAntallForsoekProps {
    tidspunktForNullstillingAvForsoek?: string | null;
}

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

    const tidsEnhetTextId =
        timerIgjenForNullstillingAvForsoek > 0
            ? timerIgjenForNullstillingAvForsoek > 1
                ? 'hours'
                : 'hour'
            : timerEllerMinutterIgjenForNullstillingAvForsoek > 1
            ? 'minutes'
            : 'minute';

    return (
        <>
            <Normaltekst>
                <FormattedMessage id="skjema.mor.far.validation.maksAntallForsoek.1" />
            </Normaltekst>
            <Normaltekst>
                <FormattedMessage
                    id="skjema.mor.far.validation.maksAntallForsoek.2"
                    values={{
                        timerEllerMinutterIgjenForNullstillingAvForsoek: timerEllerMinutterIgjenForNullstillingAvForsoek,
                        tidsEnhet: getMessage(intl, tidsEnhetTextId),
                    }}
                />
            </Normaltekst>
        </>
    );
}

export default FarFormValidationMaksAntallForsoek;
