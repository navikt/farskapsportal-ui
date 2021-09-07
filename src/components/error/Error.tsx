import { FormattedMessage } from 'react-intl';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';

import { HTTPError } from 'types/error';

import './Error.less';

interface Props {
    error: HTTPError;
}

// TODO: refakturer, bruker skal ikke se feilmelding fra api
function Error({ error }: Props) {
    return (
        <div className="Error">
            <AlertStripeFeil>
                <FormattedMessage id="api.error" />
                {/*<br />*/}
                {/*{error.code && <span>{`${error.code}: `}</span>}*/}
                {/*{error.text && <span>{`${error.text}`}</span>}*/}
            </AlertStripeFeil>
        </div>
    );
}

export default Error;
