import { Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

function Hvem() {
    return (
        <section>
            <Undertittel>
                <FormattedMessage id="forside.hvem.title" />
            </Undertittel>
            <ul>
                <li>
                    <FormattedMessage id="forside.hvem.content.1" />
                </li>
                <li>
                    <FormattedMessage id="forside.hvem.content.2" />
                </li>
            </ul>
        </section>
    );
}

export default Hvem;
