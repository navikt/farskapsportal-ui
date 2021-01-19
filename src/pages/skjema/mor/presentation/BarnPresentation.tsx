import { FormattedMessage, FormattedDate } from 'react-intl';
import { Element, Undertittel, Normaltekst } from 'nav-frontend-typografi';

import './BarnPresentation.less';

interface BarnPresentationProps {
    foedselsnummer: string | null;
    termindato: string | null;
}

function BarnPresentation(props: BarnPresentationProps) {
    return (
        <div className="BarnPresentation">
            <Undertittel>
                <FormattedMessage id="mor.skjema.barn.title" />
            </Undertittel>
            {props.foedselsnummer && (
                <>
                    <Normaltekst>
                        <FormattedMessage id="mor.skjema.barn.presentation.foedselsnummer.label" />
                    </Normaltekst>
                    <Element>{props.foedselsnummer}</Element>
                </>
            )}
            {props.termindato && (
                <>
                    <Normaltekst>
                        <FormattedMessage id="mor.skjema.barn.presentation.termindato.label" />
                    </Normaltekst>
                    <Element>
                        <FormattedDate
                            value={props.termindato}
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
