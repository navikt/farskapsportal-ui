import { BodyShort } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';

import { formatFoedselsnummer } from 'utils/foedselsnummer';

interface MorMedBarnProps {
    barn: string[];
}

function MorMedBarn({ barn }: MorMedBarnProps) {
    const isFlerfoedsel = barn.length > 1;

    return (
        <>
            <BodyShort>
                <FormattedMessage
                    id={
                        isFlerfoedsel
                            ? 'oversikt.infoPanel.mor.medBarn.1.multiple'
                            : 'oversikt.infoPanel.mor.medBarn.1.single'
                    }
                />
            </BodyShort>
            <br />
            {barn.map((barnFnr) => (
                <BodyShort key={barnFnr}>
                    <FormattedMessage id="foedselsnummer" />: {formatFoedselsnummer(barnFnr)}
                </BodyShort>
            ))}
            <br />
            <BodyShort>
                <FormattedMessage id="oversikt.infoPanel.mor.medBarn.2" />
            </BodyShort>
        </>
    );
}

export default MorMedBarn;
