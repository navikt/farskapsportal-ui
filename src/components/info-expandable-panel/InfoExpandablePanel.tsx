import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Undertittel } from 'nav-frontend-typografi';
import { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

import './InfoExpandablePanel.less';

interface InfoExpandablePanelProps {
    children: ReactNode;
    titleId: string;
}

function InfoExpandablePanel({ children, titleId }: InfoExpandablePanelProps) {
    return (
        <Ekspanderbartpanel
            className="InfoExpandablePanel"
            tittel={
                <Undertittel>
                    <FormattedMessage id={titleId} />
                </Undertittel>
            }
        >
            {children}
        </Ekspanderbartpanel>
    );
}

export default InfoExpandablePanel;
