import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage, useIntl } from 'react-intl';

import ExternalLink from 'components/external-link/ExternalLink';
import { getMessage } from 'utils/intl';

function AlleredeRegistrert() {
    const intl = useIntl();

    return (
        <section>
            <Undertittel>
                <FormattedMessage id="forside.alleredeRegistrert.title" />
            </Undertittel>
            <Normaltekst>
                <FormattedMessage id="forside.alleredeRegistrert.content" />
            </Normaltekst>
            <ExternalLink href={getMessage(intl, 'forside.alleredeRegistrert.link')} />
        </section>
    );
}

export default AlleredeRegistrert;
