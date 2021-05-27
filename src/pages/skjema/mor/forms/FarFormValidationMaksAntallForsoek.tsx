import {FormattedMessage, useIntl} from "react-intl";
import {Normaltekst} from "nav-frontend-typografi";
import {getMessage} from "../../../../utils/intl";


interface MaksAntallForsoekProps {
    tidspunktForNullstillingAvForsoek?: string | null;
}

function FarFormValidationMaksAntallForsoek({tidspunktForNullstillingAvForsoek}: MaksAntallForsoekProps) {
    const intl = useIntl();

    if (!tidspunktForNullstillingAvForsoek) {
        return null;
    }

    return (
        <>
            <Normaltekst>
                <FormattedMessage id="skjema.mor.far.validation.maksAntallForsoek.1" />
            </Normaltekst>
            <Normaltekst>
                <FormattedMessage id="skjema.mor.far.validation.maksAntallForsoek.2" values={{
                    hoursLeftUntilNewAttempt: getMessage(
                        intl,
                        tidspunktForNullstillingAvForsoek
                    ),
                }}/>
            </Normaltekst>
        </>
    );
}

export default FarFormValidationMaksAntallForsoek