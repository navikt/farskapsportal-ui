import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

import { formatFoedselsnummer } from 'utils/foedselsnummer';

interface MorMedBarnProps {
    barn: string[];
}

function MorMedBarn({ barn }: MorMedBarnProps) {
    const isFlerfoedsel = barn.length > 1;

    return (
        <>
            <Normaltekst>
                <FormattedMessage
                    id={
                        isFlerfoedsel
                            ? 'oversikt.infoPanel.mor.medBarn.1.multiple'
                            : 'oversikt.infoPanel.mor.medBarn.1.single'
                    }
                />
            </Normaltekst>
            <br />
            {barn.map((barnFnr) => (
                <Normaltekst key={barnFnr}>
                    <FormattedMessage id="foedselsnummer" />: {formatFoedselsnummer(barnFnr)}
                </Normaltekst>
            ))}
            <br />
            <Normaltekst>
                <FormattedMessage id="oversikt.infoPanel.mor.medBarn.2" />
            </Normaltekst>
        </>
    );
}

export default MorMedBarn;
