import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Systemtittel } from 'nav-frontend-typografi';
import { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

import './KvitteringInfoPanel.less';

interface KvitteringInfoPanelProps {
    children: ReactNode;
    titleId: string;
}

function KvitteringInfoPanel({ children, titleId }: KvitteringInfoPanelProps) {
    return (
        <Ekspanderbartpanel
            className="KvitteringInfoPanel"
            tittel={
                <Systemtittel>
                    <FormattedMessage id={titleId} />
                </Systemtittel>
            }
        >
            {children}
        </Ekspanderbartpanel>
    );
}

export default KvitteringInfoPanel;
