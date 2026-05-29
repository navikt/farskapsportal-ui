import { Heading, Tag } from '@navikt/ds-react';
import { AnchorHTMLAttributes, ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';

import './LinkPanel.css';

const tagVariantMap = {
    suksess: 'success',
    info: 'info',
    advarsel: 'warning',
    fokus: 'alt1',
} as const;

interface LinkPanelProps {
    linkPath: string;
    titleId: string;
    children: ReactNode;
    etikettType: 'suksess' | 'info' | 'advarsel' | 'fokus';
    etikettId: string;
}

function LinkPanel({ linkPath, titleId, children, etikettType, etikettId }: LinkPanelProps) {
    return (
        <Link className="LinkPanel" to={linkPath}>
            <div>
                <Heading level="3" size="small" className="LinkPanel__heading">
                    <FormattedMessage id={titleId} />
                </Heading>
                {children}
                <Tag variant={tagVariantMap[etikettType]}>
                    <FormattedMessage id={etikettId} />
                </Tag>
            </div>
        </Link>
    );
}

export default LinkPanel;
