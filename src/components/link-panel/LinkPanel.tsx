import Etikett from 'nav-frontend-etiketter';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Systemtittel } from 'nav-frontend-typografi';
import { AnchorHTMLAttributes, ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

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
        <LenkepanelBase href="" linkCreator={linkCreator} border={true}>
            <div>
                <Systemtittel className="lenkepanel__heading" tag="h3">
                    <FormattedMessage id={titleId} />
                </Systemtittel>
                {children}
                <Etikett type={etikettType}>
                    <FormattedMessage id={etikettId} />
                </Etikett>
            </div>
        </LenkepanelBase>
    );
}

export default LinkPanel;
