import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

function NaarErklaeres() {
    return (
        <section>
            <Undertittel>
                <FormattedMessage id="forside.naarErklaeres.title" />
            </Undertittel>
            <Normaltekst>
                <FormattedMessage id="forside.naarErklaeres.content.1" />
            </Normaltekst>
            <Normaltekst>
                <FormattedMessage id="forside.naarErklaeres.content.2" />
            </Normaltekst>
        </section>
    );
}

export default NaarErklaeres;
