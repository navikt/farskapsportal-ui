import Etikett from 'nav-frontend-etiketter';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Undertittel } from 'nav-frontend-typografi';
import { AnchorHTMLAttributes, ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import './LinkPanel.less';

interface LinkPanelProps {
    linkPath?: string;
    titleId: string;
    children: ReactNode;
    etikettType: 'suksess' | 'info' | 'advarsel' | 'fokus';
    etikettId: string;
}

function LinkPanel({ linkPath, titleId, children, etikettType, etikettId }: LinkPanelProps) {
    const linkCreator = linkPath
        ? (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
              <Link {...props} to={linkPath ?? ''} />
          )
        : undefined;

    return (
        <LenkepanelBase className="LinkPanel" href="" linkCreator={linkCreator} border={true}>
            <div>
                <Undertittel className="lenkepanel__heading">
                    <FormattedMessage id={titleId} />
                </Undertittel>
                {children}
                <Etikett type={etikettType}>
                    <FormattedMessage id={etikettId} />
                </Etikett>
            </div>
        </LenkepanelBase>
    );
}

export default LinkPanel;
