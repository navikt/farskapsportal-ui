import { Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

function Naar() {
    return (
        <section>
            <Undertittel>
                <FormattedMessage id="forside.naar.title" />
            </Undertittel>
            <ul>
                <li>
                    <FormattedMessage id="forside.naar.content.1" />
                </li>
                <li>
                    <FormattedMessage id="forside.naar.content.2" />
                </li>
            </ul>
        </section>
    );
}

export default Naar;
