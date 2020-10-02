import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Element, Undertittel, Normaltekst } from 'nav-frontend-typografi';

interface BarnPresentationProps {
    termindato: string;
}

function BarnPresentation({ termindato }: BarnPresentationProps) {
    return (
        <div>
            <Undertittel>
                <FormattedMessage id="mor.soeknad.barn.title" />
            </Undertittel>
            <Normaltekst>
                <FormattedMessage id="mor.soeknad.barn.presentation.termindato.label" />
            </Normaltekst>
            <Element>{termindato}</Element>
        </div>
    );
}

export default BarnPresentation;
