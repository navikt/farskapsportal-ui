import { FormattedMessage } from 'react-intl';
import { Sidetittel } from 'nav-frontend-typografi';

import './Banner.less';

function Banner() {
    return (
        <header className="Banner">
            <Sidetittel>
                <FormattedMessage id="page.title" />
            </Sidetittel>
        </header>
    );
}

export default Banner;
