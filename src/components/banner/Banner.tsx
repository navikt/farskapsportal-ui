import { Heading } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';

import './Banner.css';

interface BannerProps {
    titleId: string;
}

// TODO: deprecated

function Banner({ titleId }: BannerProps) {
    return (
        <div className="Banner">
            <Heading level="2" size="medium">
                <FormattedMessage id={titleId} />
            </Heading>
        </div>
    );
}

export default Banner;
