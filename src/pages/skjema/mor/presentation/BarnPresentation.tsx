import { FormattedMessage } from 'react-intl';
import { Element, Undertittel, Normaltekst } from 'nav-frontend-typografi';

import DatePresentation from 'components/date-presentation/DatePresentation';

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
                        <DatePresentation date={props.termindato} />
                    </Element>
                </>
            )}
        </div>
    );
}

export default BarnPresentation;
