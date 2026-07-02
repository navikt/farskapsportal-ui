import { Alert } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';

import { HTTPError } from 'types/error';

interface Props {
    error: HTTPError;
    role?: string;
    ariaLive?: 'polite' | 'assertive' | 'off';
}

// TODO: refakturer, bruker skal ikke se feilmelding fra api
function Error({ error, role = 'alert', ariaLive = 'assertive' }: Props) {
    return (
        <Alert variant="error" role={role} aria-live={ariaLive}>
            <FormattedMessage id="api.error" />
            {/*<br />*/}
            {/*{error.code && <span>{`${error.code}: `}</span>}*/}
            {/*{error.text && <span>{`${error.text}`}</span>}*/}
        </Alert>
    );
}

export default Error;
