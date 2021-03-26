import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

import DatePresentation from 'components/date-presentation/DatePresentation';
import LinkPanel from 'components/link-panel/LinkPanel';
import { Farskapserklaering } from 'types/farskapserklaering';
import { formatFoedselsnummer } from 'utils/foedselsnummer';
import { getNameFromForelder } from 'utils/name';

interface ErklaeringLinkPanelProps {
    linkPath?: string;
    etikettType: 'suksess' | 'info' | 'fokus';
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
                <Normaltekst>
                    <FormattedMessage id="oversikt.erklaeringer.link.forelder.mor" />
                    {getNameFromForelder(erklaering.mor)}
                </Normaltekst>
            )}
            {displayFar && (
                <Normaltekst>
                    <FormattedMessage id="oversikt.erklaeringer.link.forelder.far" />
                    {getNameFromForelder(erklaering.far)}
                </Normaltekst>
            )}
            <Normaltekst>
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
            </Normaltekst>
        </LinkPanel>
    );
}

export default ErklaeringLinkPanel;
