import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

import { Farskapserklaering } from 'types/farskapserklaering';
import ForBarn from '../common/ForBarn';

interface MorFarSignertProps {
    signertErklaeringer: Farskapserklaering[];
}

function MorFarSignert({ signertErklaeringer }: MorFarSignertProps) {
    return (
        <>
            <Normaltekst>
                <FormattedMessage id="oversikt.infoPanel.mor.farSignert.1" />{' '}
                <ForBarn erklaeringer={signertErklaeringer} />
                <FormattedMessage id="oversikt.infoPanel.mor.farSignert.2" />
            </Normaltekst>
            <Normaltekst>
                <FormattedMessage id="oversikt.infoPanel.mor.farSignert.3" />
            </Normaltekst>
        </>
    );
}

export default MorFarSignert;
