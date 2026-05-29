import { UserInfo } from '../../types/user';
import { Box } from '@navikt/ds-react';
import ErklaeringerAvventerBruker from './ErklaeringerAvventerBruker';
import ErklaeringerAvventerMotpart from './ErklaeringerAvventerMotpart';
import ErklaeringerAvventerRegistrering from './ErklaeringerAvventerRegistrering';
import { FormattedMessage } from 'react-intl';
import { Heading } from '@navikt/ds-react';
import BarnUtenErklaering from './BarnUtenErklaering';
import { getBarnUtenErklaering } from '../../utils/farskapserklaering';

import './VentendeErklaeringer.css';

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
        <Box className="VentendeErklaeringer" borderWidth="1" borderColor="neutral-subtle" borderRadius="4" padding="space-16">
            <Heading level="2" size="small" as="h2">
                <FormattedMessage id="oversikt.ventendeErklaeringer.title" />
            </Heading>
            <BarnUtenErklaering userInfo={userInfo} />
            <ErklaeringerAvventerBruker userInfo={userInfo} />
            <ErklaeringerAvventerMotpart userInfo={userInfo} />
            <ErklaeringerAvventerRegistrering userInfo={userInfo} />
        </Box>
    );
}

export default VentendeErklaeringer;
