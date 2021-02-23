import { Element, Undertittel, Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

import { formatFoedselsnummer } from 'utils/foedselsnummer';

import './FarPresentation.less';

interface FarPresentationProps {
    navn: string;
    foedselsnummer: string;
}

function FarPresentation(props: FarPresentationProps) {
    return (
        <div className="FarPresentation">
            <Undertittel>
                <FormattedMessage id="mor.skjema.far.title" />
            </Undertittel>
            <div className="FarPresentation__navn">
                <Normaltekst>
                    <FormattedMessage id="mor.skjema.far.presentation.navn" />
                </Normaltekst>
                <Element>{props.navn}</Element>
            </div>
            <div>
                <Normaltekst>
                    <FormattedMessage id="mor.skjema.far.presentation.foedselsnummer" />
                </Normaltekst>
                <Element>{formatFoedselsnummer(props.foedselsnummer)}</Element>
            </div>
        </div>
    );
}

export default FarPresentation;
