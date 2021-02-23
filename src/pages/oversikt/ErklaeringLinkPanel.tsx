import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

import DatePresentation from 'components/date-presentation/DatePresentation';
import LinkPanel from 'components/link-panel/LinkPanel';
import { Farskapserklaering } from 'types/farskapserklaering';
import { getNameFromForelder } from 'utils/name';

interface ErklaeringLinkPanelProps {
    href?: string;
    linkPath?: string;
    etikettType: 'suksess' | 'info' | 'fokus';
    etikettId: string;
    erklaering: Farskapserklaering;
    displayMor?: boolean;
    displayFar?: boolean;
}

function ErklaeringLinkPanel({
    href = '',
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
            href={href}
            linkPath={linkPath}
            titleId="oversikt.erklaeringer.link.title"
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
                        <FormattedMessage id="oversikt.erklaeringer.link.termindato" />
                        <DatePresentation date={erklaering.barn.termindato} />
                    </>
                ) : (
                    <>
                        <FormattedMessage id="oversikt.erklaeringer.link.foedselsnummer" />
                        {erklaering.barn.foedselsnummer}
                    </>
                )}
            </Normaltekst>
        </LinkPanel>
    );
}

export default ErklaeringLinkPanel;