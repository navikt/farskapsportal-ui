import AlertStripe from 'nav-frontend-alertstriper';
import { FormattedMessage } from 'react-intl';

import { Farskapserklaering } from 'types/farskapserklaering';
import { isBrukerFar, isSignedByFar } from 'utils/farskapserklaering';

import './MorAlert.less';

interface MorAlertProps {
    erklaering: Farskapserklaering;
}

function MorAlert({ erklaering }: MorAlertProps) {
    if (isBrukerFar(erklaering) || isSignedByFar(erklaering)) {
        return null;
    }

    return (
        <AlertStripe type="advarsel" className="MorAlert">
            <div className="MorAlert__boldtext">
                <FormattedMessage id="kvittering.morAlert.1" />
            </div>
            <FormattedMessage id="kvittering.morAlert.2" />
        </AlertStripe>
    );
}

export default MorAlert;
