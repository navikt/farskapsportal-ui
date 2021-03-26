import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

function MorUtenBarn() {
    return (
        <>
            <Normaltekst>
                <FormattedMessage id="oversikt.infoPanel.mor.utenBarn.1" />
            </Normaltekst>
            <Normaltekst>
                <FormattedMessage id="oversikt.infoPanel.mor.utenBarn.2" />
            </Normaltekst>
        </>
    );
}

export default MorUtenBarn;
