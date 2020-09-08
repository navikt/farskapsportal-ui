import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Sidetittel } from 'nav-frontend-typografi';

import './Banner.less';

function Banner() {
    return (
        <div className="Banner">
            <Sidetittel>
                <FormattedMessage id="page.title" />
            </Sidetittel>
        </div>
    );
}

export default Banner;
