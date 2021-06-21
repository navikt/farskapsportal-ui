import { ReactNode } from 'react';
import Lenke from 'nav-frontend-lenker';
import { ExternalLink as ExternalSvg } from '@navikt/ds-icons';

import './ExternalLink.less';

interface ExternalLinkProps {
    href: string;
    children?: ReactNode;
}

function ExternalLink({ href, children }: ExternalLinkProps) {
    return (
        <Lenke className="ExternalLink" href={href} target="_blank" rel="noopener noreferrer">
            <span>{children ?? href}</span>
            <ExternalSvg />
        </Lenke>
    );
}

export default ExternalLink;
