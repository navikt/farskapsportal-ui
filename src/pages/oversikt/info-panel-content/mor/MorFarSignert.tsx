import { BodyShort } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';

import { Farskapserklaering } from 'types/farskapserklaering';
import ForBarn from '../common/ForBarn';

interface MorFarSignertProps {
    signertErklaeringer: Farskapserklaering[];
}

function MorFarSignert({ signertErklaeringer }: MorFarSignertProps) {
    return (
        <>
            <BodyShort>
                <FormattedMessage id="oversikt.infoPanel.mor.farSignert.1" />{' '}
                <ForBarn erklaeringer={signertErklaeringer} />
                <FormattedMessage id="oversikt.infoPanel.mor.farSignert.2" />
            </BodyShort>
            <BodyShort>
                <FormattedMessage id="oversikt.infoPanel.mor.farSignert.3" />
            </BodyShort>
        </>
    );
}

export default MorFarSignert;
