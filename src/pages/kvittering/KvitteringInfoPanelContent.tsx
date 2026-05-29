import { Heading } from '@navikt/ds-react';
import { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

import './KvitteringInfoPanelContent.css';

interface KvitteringInfoPanelContentProps {
    children: ReactNode;
    titleId: string;
}

function KvitteringInfoPanelContent({ children, titleId }: KvitteringInfoPanelContentProps) {
    return (
        <section className="KvitteringInfoPanelContent">
            <Heading level="3" size="small" as="h3">
                <FormattedMessage id={titleId} />
            </Heading>
            {children}
        </section>
    );
}

export default KvitteringInfoPanelContent;
