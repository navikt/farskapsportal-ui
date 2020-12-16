import { FormattedMessage, FormattedDate } from 'react-intl';
import { Element, Undertittel, Normaltekst } from 'nav-frontend-typografi';

import './BarnPresentation.less';

interface BarnPresentationProps {
    termindato: string;
}

function BarnPresentation({ termindato }: BarnPresentationProps) {
    return (
        <div className="BarnPresentation">
            <Undertittel>
                <FormattedMessage id="mor.soeknad.barn.title" />
            </Undertittel>
            <Normaltekst>
                <FormattedMessage id="mor.soeknad.barn.presentation.termindato.label" />
            </Normaltekst>
            <Element>
                <FormattedDate value={termindato} year="numeric" month="long" day="numeric" />
            </Element>
        </div>
    );
}

export default BarnPresentation;
