import { FormattedMessage } from 'react-intl';
import { Innholdstittel } from 'nav-frontend-typografi';

import './Banner.less';

interface BannerProps {
    titleId: string;
}

// TODO: deprecated

function Banner({ titleId }: BannerProps) {
    return (
        <div className="Banner">
            <Innholdstittel>
                <FormattedMessage id={titleId} />
            </Innholdstittel>
        </div>
    );
}

export default Banner;
