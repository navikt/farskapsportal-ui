import AlertStripe from 'nav-frontend-alertstriper';
import { FormattedMessage } from 'react-intl';

import { Farskapserklaering } from 'types/farskapserklaering';
import { isBrukerFar, isSignedByFar } from 'utils/farskapserklaering';

interface MorAlertProps {
    erklaering: Farskapserklaering;
}

function MorAlert({ erklaering }: MorAlertProps) {
    if (isBrukerFar(erklaering) || isSignedByFar(erklaering)) {
        return null;
    }

    return (
        <AlertStripe type="advarsel">
            <FormattedMessage id="kvittering.morAlert" />
        </AlertStripe>
    );
}

export default MorAlert;
