import { FormattedMessage, FormattedDate } from 'react-intl';
import { Element, Undertittel, Normaltekst } from 'nav-frontend-typografi';

import './BarnPresentation.less';

interface BarnPresentationProps {
    isSingleChild: boolean;
    foedselsnummer: string | null;
    termindato: string | null;
}

function BarnPresentation(props: BarnPresentationProps) {
    return (
        <div className="BarnPresentation">
            <Undertittel>
                <FormattedMessage id="mor.soeknad.barn.title" />
            </Undertittel>
            {props.foedselsnummer && (
                <>
                    {props.isSingleChild && (
                        <Normaltekst>
                            <FormattedMessage id="mor.soeknad.barn.presentation.single-child.label" />
                        </Normaltekst>
                    )}
                    <Normaltekst>
                        <FormattedMessage id="mor.soeknad.barn.presentation.foedselsnummer.label" />
                    </Normaltekst>
                    <Element>{props.foedselsnummer}</Element>
                </>
            )}
            {props.termindato && (
                <>
                    <Normaltekst>
                        <FormattedMessage id="mor.soeknad.barn.presentation.termindato.label" />
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
