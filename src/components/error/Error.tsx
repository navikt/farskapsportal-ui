import { Alert } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';

import { HTTPError } from 'types/error';

import './Error.css';

interface Props {
    error: HTTPError;
}

// TODO: refakturer, bruker skal ikke se feilmelding fra api
function Error({ error }: Props) {
    return (
        <div className="Error">
            <Alert variant="error">
                <FormattedMessage id="api.error" />
                {/*<br />*/}
                {/*{error.code && <span>{`${error.code}: `}</span>}*/}
                {/*{error.text && <span>{`${error.text}`}</span>}*/}
            </Alert>
        </div>
    );
}

export default Error;
