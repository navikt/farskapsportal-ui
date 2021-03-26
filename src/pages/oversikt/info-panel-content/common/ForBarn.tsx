import { FormattedMessage, useIntl } from 'react-intl';

import { Farskapserklaering } from 'types/farskapserklaering';
import { isTermindatoErklaering } from 'utils/farskapserklaering';
import { formatFoedselsnummer } from 'utils/foedselsnummer';
import { formatDate } from 'utils/intl';

interface ForBarnProps {
    erklaeringer: Farskapserklaering[];
}

function ForBarn({ erklaeringer }: ForBarnProps) {
    const intl = useIntl();

    const firstErklaering = erklaeringer[0];

    if (!firstErklaering) {
        return null;
    }

    const isTermindato = isTermindatoErklaering(firstErklaering);

    return isTermindato ? (
        <FormattedMessage
            id="oversikt.infoPanel.common.forBarn.termindato"
            values={{
                termindato: formatDate(intl, firstErklaering.barn?.termindato ?? ''),
            }}
        />
    ) : (
        <>
            <FormattedMessage
                id="oversikt.infoPanel.common.forBarn.foedselsnummer"
                values={{
                    fnr: erklaeringer
                        .map((erklaering) =>
                            formatFoedselsnummer(erklaering.barn?.foedselsnummer ?? '')
                        )
                        .join(', '),
                }}
            />
        </>
    );
}

export default ForBarn;
