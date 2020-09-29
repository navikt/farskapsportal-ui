import React, { ReactNode } from 'react';
import Lenke from 'nav-frontend-lenker';

import { ReactComponent as ExternalSvg } from 'assets/icons/external.svg';

interface ExternalLinkProps {
    href: string;
    children: ReactNode;
}

function ExternalLink({ href, children }: ExternalLinkProps) {
    return (
        <Lenke href={href} target="_blank" rel="noopener noreferrer">
            <span>{children}</span>
            <ExternalSvg />
        </Lenke>
    );
}

export default ExternalLink;
