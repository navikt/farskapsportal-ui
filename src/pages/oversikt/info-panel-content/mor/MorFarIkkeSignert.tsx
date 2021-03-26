import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

import { Farskapserklaering } from 'types/farskapserklaering';
import ForBarn from '../common/ForBarn';

interface MorFarIkkeSignertProps {
    farIkkeSignertErklaeringer: Farskapserklaering[];
}

function MorFarIkkeSignert({ farIkkeSignertErklaeringer }: MorFarIkkeSignertProps) {
    return (
        <>
            <Normaltekst>
                <FormattedMessage id="oversikt.infoPanel.mor.farIkkeSignert.1" />{' '}
                <ForBarn erklaeringer={farIkkeSignertErklaeringer} />.
            </Normaltekst>
            <br />
            <Normaltekst>
                <FormattedMessage id="oversikt.infoPanel.mor.farIkkeSignert.2" />
            </Normaltekst>
        </>
    );
}

export default MorFarIkkeSignert;
