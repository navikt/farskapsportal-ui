import { BodyShort } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';

import { Farskapserklaering } from 'types/farskapserklaering';
import ForBarn from '../common/ForBarn';

interface MorIkkeSignertProps {
    ikkeSignertErklaeringer: Farskapserklaering[];
}

function MorIkkeSignert({ ikkeSignertErklaeringer }: MorIkkeSignertProps) {
    return (
        <>
            <BodyShort>
                <FormattedMessage id="oversikt.infoPanel.mor.ikkeSignert.1" />{' '}
                <ForBarn erklaeringer={ikkeSignertErklaeringer} />.
            </BodyShort>
            <BodyShort>
                <FormattedMessage id="oversikt.infoPanel.mor.ikkeSignert.2" />
            </BodyShort>
        </>
    );
}

export default MorIkkeSignert;
