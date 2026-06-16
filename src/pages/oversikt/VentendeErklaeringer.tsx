import { UserInfo } from '../../types/user';
import { Heading, VStack } from '@navikt/ds-react';
import ErklaeringerAvventerBruker from './ErklaeringerAvventerBruker';
import ErklaeringerAvventerMotpart from './ErklaeringerAvventerMotpart';
import ErklaeringerAvventerRegistrering from './ErklaeringerAvventerRegistrering';
import { FormattedMessage } from 'react-intl';
import BarnUtenErklaering from './BarnUtenErklaering';
import { getBarnUtenErklaering } from '../../utils/farskapserklaering';

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
        <VStack gap="space-16">
            <Heading level="2" size="medium" as="h2">
                <FormattedMessage id="oversikt.ventendeErklaeringer.title" />
            </Heading>
            <BarnUtenErklaering userInfo={userInfo} />
            <ErklaeringerAvventerBruker userInfo={userInfo} />
            <ErklaeringerAvventerMotpart userInfo={userInfo} />
            <ErklaeringerAvventerRegistrering userInfo={userInfo} />
        </VStack>
    );
}

export default VentendeErklaeringer;
