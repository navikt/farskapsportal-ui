import { FormattedMessage } from 'react-intl';
import { Element, Undertittel, Normaltekst } from 'nav-frontend-typografi';

import './FarPresentation.less';

interface FarPresentationProps {
    navn: string;
    foedselsnummer: string;
}

function FarPresentation({ navn, foedselsnummer }: FarPresentationProps) {
    return (
        <div className="FarPresentation">
            <Undertittel>
                <FormattedMessage id="mor.soeknad.far.title" />
            </Undertittel>
            <div className="FarPresentation__navn">
                <Normaltekst>
                    <FormattedMessage id="mor.soeknad.far.presentation.navn" />
                </Normaltekst>
                <Element>{navn}</Element>
            </div>
            <div>
                <Normaltekst>
                    <FormattedMessage id="mor.soeknad.far.presentation.foedselsnummer" />
                </Normaltekst>
                <Element>{foedselsnummer}</Element>
            </div>
        </div>
    );
}

export default FarPresentation;
