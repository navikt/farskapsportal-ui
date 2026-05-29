import { BodyShort } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';

function MorUtenBarn() {
    return (
        <>
            <BodyShort>
                <FormattedMessage id="oversikt.infoPanel.mor.utenBarn.1" />
            </BodyShort>
            <BodyShort>
                <FormattedMessage id="oversikt.infoPanel.mor.utenBarn.2" />
            </BodyShort>
        </>
    );
}

export default MorUtenBarn;
