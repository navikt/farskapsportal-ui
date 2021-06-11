import { UserInfo } from '../../types/user';
import Panel from 'nav-frontend-paneler';
import ErklaeringerAvventerBruker from './ErklaeringerAvventerBruker';
import ErklaeringerAvventerMotpart from './ErklaeringerAvventerMotpart';
import ErklaeringerAvventerRegistrering from './ErklaeringerAvventerRegistrering';
import { FormattedMessage } from 'react-intl';
import { Systemtittel } from 'nav-frontend-typografi';
import BarnUtenErklaering from './BarnUtenErklaering';
import { getBarnUtenErklaering } from '../../utils/farskapserklaering';

import './VentendeErklaeringer.less';

interface VentendeErklaeringerProps {
    userInfo: UserInfo;
}

function VentendeErklaeringer({ userInfo }: VentendeErklaeringerProps) {
    if (
        !userInfo.avventerRegistrering?.length &&
        !userInfo.avventerSigneringBruker?.length &&
        !userInfo.avventerSigneringMotpart?.length &&
        !getBarnUtenErklaering(userInfo).length
    ) {
        return null;
    }

    return (
        <Panel className="VentendeErklaeringer" border>
            <Systemtittel tag="h2">
                <FormattedMessage id="oversikt.ventendeErklaeringer.title" />
            </Systemtittel>
            <BarnUtenErklaering userInfo={userInfo} />
            <ErklaeringerAvventerBruker userInfo={userInfo} />
            <ErklaeringerAvventerMotpart userInfo={userInfo} />
            <ErklaeringerAvventerRegistrering userInfo={userInfo} />
        </Panel>
    );
}

export default VentendeErklaeringer;
