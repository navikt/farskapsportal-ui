import { BodyShort } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';

import DatePresentation from 'components/date-presentation/DatePresentation';
import LinkPanel from 'components/link-panel/LinkPanel';
import { Farskapserklaering } from 'types/farskapserklaering';
import { formatFoedselsnummer } from 'utils/foedselsnummer';
import { getNameFromForelder } from 'utils/name';

interface ErklaeringLinkPanelProps {
    linkPath: string;
    etikettType: 'suksess' | 'fokus';
    etikettId: string;
    erklaering: Farskapserklaering;
    displayMor?: boolean;
    displayFar?: boolean;
}

function ErklaeringLinkPanel({
    linkPath,
    etikettType,
    etikettId,
    erklaering,
    displayMor = false,
    displayFar = false,
}: ErklaeringLinkPanelProps) {
    if (!erklaering.barn) {
        // TODO: handle error
        return null;
    }

    return (
        <LinkPanel
            linkPath={linkPath}
            titleId="farskapserklaering"
            etikettType={etikettType}
            etikettId={etikettId}
        >
            {displayMor && (
                <BodyShort>
                    <FormattedMessage id="oversikt.erklaeringer.link.forelder.mor" />
                    {getNameFromForelder(erklaering.mor)}
                </BodyShort>
            )}
            {displayFar && (
                <BodyShort>
                    <FormattedMessage id="oversikt.erklaeringer.link.forelder.far" />
                    {getNameFromForelder(erklaering.far)}
                </BodyShort>
            )}
            <BodyShort>
                {erklaering.barn.termindato ? (
                    <>
                        <FormattedMessage id="termindato" />:{' '}
                        <DatePresentation date={erklaering.barn.termindato} />
                    </>
                ) : (
                    <>
                        <FormattedMessage id="foedselsnummer" />:{' '}
                        {formatFoedselsnummer(erklaering.barn.foedselsnummer ?? '')}
                    </>
                )}
            </BodyShort>
        </LinkPanel>
    );
}

export default ErklaeringLinkPanel;
