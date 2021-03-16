import AlertStripe from 'nav-frontend-alertstriper';
import { FormattedMessage } from 'react-intl';

import { Farskapserklaering } from 'types/farskapserklaering';
import { isSignedByFar } from 'utils/farskapserklaering';

interface MorAlertProps {
    erklaering: Farskapserklaering;
}

function MorAlert({ erklaering }: MorAlertProps) {
    if (isSignedByFar(erklaering)) {
        return null;
    }

    return (
        <AlertStripe type="advarsel">
            <FormattedMessage id="kvittering.morAlert" />
        </AlertStripe>
    );
}

export default MorAlert;
