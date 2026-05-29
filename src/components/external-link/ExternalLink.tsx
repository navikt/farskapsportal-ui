import { ReactNode } from 'react';
import { Link } from '@navikt/ds-react';
import { ExternalLinkIcon } from '@navikt/aksel-icons';

import './ExternalLink.css';

interface ExternalLinkProps {
    href: string;
    children?: ReactNode;
}

function ExternalLink({ href, children }: ExternalLinkProps) {
    return (
        <Link className="ExternalLink" href={href} target="_blank" rel="noopener noreferrer">
            <span>{children ?? href}</span>
            <ExternalLinkIcon aria-hidden />
        </Link>
    );
}

export default ExternalLink;
