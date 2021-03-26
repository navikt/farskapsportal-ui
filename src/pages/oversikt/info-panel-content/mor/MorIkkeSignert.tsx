import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

import { Farskapserklaering } from 'types/farskapserklaering';
import ForBarn from '../common/ForBarn';

interface MorIkkeSignertProps {
    ikkeSignertErklaeringer: Farskapserklaering[];
}

function MorIkkeSignert({ ikkeSignertErklaeringer }: MorIkkeSignertProps) {
    return (
        <>
            <Normaltekst>
                <FormattedMessage id="oversikt.infoPanel.mor.ikkeSignert.1" />{' '}
                <ForBarn erklaeringer={ikkeSignertErklaeringer} />.
            </Normaltekst>
            <Normaltekst>
                <FormattedMessage id="oversikt.infoPanel.mor.ikkeSignert.2" />
            </Normaltekst>
        </>
    );
}

export default MorIkkeSignert;
