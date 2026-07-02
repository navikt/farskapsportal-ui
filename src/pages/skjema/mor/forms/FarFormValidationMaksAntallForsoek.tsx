import { FormattedMessage, useIntl } from 'react-intl';
import { BodyShort } from '@navikt/ds-react';
import { getMessage } from '../../../../utils/intl';
import { getHoursUntil } from '../../../../utils/date';

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

    const timerIgjenForNullstillingAvForsoek = getHoursUntil(tidspunktForNullstillingAvForsoek) + 1;

    const tidsEnhetTextId = timerIgjenForNullstillingAvForsoek > 1 ? 'hours' : 'hour';

    return (
        <>
            <BodyShort>
                <FormattedMessage id="skjema.mor.far.validation.maksAntallForsoek.1" />
            </BodyShort>
            <BodyShort>
                <FormattedMessage
                    id="skjema.mor.far.validation.maksAntallForsoek.2"
                    values={{
                        timerIgjenForNullstillingAvForsoek: timerIgjenForNullstillingAvForsoek,
                        tidsEnhet: getMessage(intl, tidsEnhetTextId),
                    }}
                />
            </BodyShort>
        </>
    );
}

export default FarFormValidationMaksAntallForsoek;
