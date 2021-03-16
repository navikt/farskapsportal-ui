import { Undertittel } from 'nav-frontend-typografi';
import { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

import './KvitteringInfoPanelContent.less';

interface KvitteringInfoPanelContentProps {
    children: ReactNode;
    titleId: string;
}

function KvitteringInfoPanelContent({ children, titleId }: KvitteringInfoPanelContentProps) {
    return (
        <section className="KvitteringInfoPanelContent">
            <Undertittel tag="h3">
                <FormattedMessage id={titleId} />
            </Undertittel>
            {children}
        </section>
    );
}

export default KvitteringInfoPanelContent;
