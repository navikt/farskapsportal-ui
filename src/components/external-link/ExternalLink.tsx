import { ReactNode } from 'react';
import Lenke from 'nav-frontend-lenker';
import { ExternalLink as ExternalSvg } from '@navikt/ds-icons';

interface ExternalLinkProps {
    href: string;
    children?: ReactNode;
}

function ExternalLink({ href, children }: ExternalLinkProps) {
    return (
        <Lenke href={href} target="_blank" rel="noopener noreferrer">
            <span>{children ?? href}</span>
            <ExternalSvg />
        </Lenke>
    );
}

export default ExternalLink;
