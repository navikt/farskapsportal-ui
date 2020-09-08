import React from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';

import { HTTPError } from 'types/error';

import './Error.less';

interface Props {
    error: HTTPError;
}

function Error({ error }: Props) {
    return (
        <div className="Error">
            <AlertStripeFeil>
                Oisann, noe gikk galt ved henting av data!
                <br />
                {error.code && <span>{`${error.code}: `}</span>}
                {error.text && <span>{`${error.text}`}</span>}
            </AlertStripeFeil>
        </div>
    );
}

export default Error;
