import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Element, Undertittel, Normaltekst } from 'nav-frontend-typografi';

interface FarPresentationProps {
    navn: string;
    foedselsnummer: string;
}

function FarPresentation({ navn, foedselsnummer }: FarPresentationProps) {
    return (
        <div>
            <Undertittel>
                <FormattedMessage id="mor.soeknad.far.title" />
            </Undertittel>
            <Normaltekst>
                <FormattedMessage id="mor.soeknad.far.presentation.navn" />
            </Normaltekst>
            <Element>{navn}</Element>
            <Normaltekst>
                <FormattedMessage id="mor.soeknad.far.presentation.foedselsnummer" />
            </Normaltekst>
            <Element>{foedselsnummer}</Element>
        </div>
    );
}

export default FarPresentation;
