import { FormattedMessage, FormattedDate } from 'react-intl';
import { Element, Undertittel, Normaltekst } from 'nav-frontend-typografi';

import './BarnPresentation.less';

interface BarnPresentationProps {
    isSingleChild: boolean;
    foedselsnummer: string | null;
    termindato: string | null;
}

function BarnPresentation({ isSingleChild, foedselsnummer, termindato }: BarnPresentationProps) {
    return (
        <div className="BarnPresentation">
            <Undertittel>
                <FormattedMessage id="mor.soeknad.barn.title" />
            </Undertittel>
            {foedselsnummer && (
                <>
                    {isSingleChild && <Normaltekst>Vi har funnet følgende barn fra folkeregisteret</Normaltekst>}
                    <Normaltekst>
                        {/*<FormattedMessage id="mor.soeknad.barn.presentation.foedselsnummer.label" />*/}
                        Fødselsnummer
                    </Normaltekst>
                    <Element>{foedselsnummer}</Element>
                </>
            )}
            {termindato && (
                <>
                    <Normaltekst>
                        <FormattedMessage id="mor.soeknad.barn.presentation.termindato.label" />
                    </Normaltekst>
                    <Element>
                        <FormattedDate
                            value={termindato}
                            year="numeric"
                            month="long"
                            day="numeric"
                        />
                    </Element>
                </>
            )}
        </div>
    );
}

export default BarnPresentation;
