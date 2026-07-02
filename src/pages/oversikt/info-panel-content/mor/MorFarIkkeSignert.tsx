import { BodyShort } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';

import { Farskapserklaering } from 'types/farskapserklaering';
import ForBarn from '../common/ForBarn';

interface MorFarIkkeSignertProps {
    farIkkeSignertErklaeringer: Farskapserklaering[];
}

function MorFarIkkeSignert({ farIkkeSignertErklaeringer }: MorFarIkkeSignertProps) {
    return (
        <>
            <BodyShort>
                <FormattedMessage id="oversikt.infoPanel.mor.farIkkeSignert.1" />{' '}
                <ForBarn erklaeringer={farIkkeSignertErklaeringer} />.
            </BodyShort>
            <br />
            <BodyShort>
                <FormattedMessage id="oversikt.infoPanel.mor.farIkkeSignert.2" />
            </BodyShort>
        </>
    );
}

export default MorFarIkkeSignert;
