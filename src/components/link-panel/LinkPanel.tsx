import { LinkCard, Tag } from '@navikt/ds-react';
import { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

const tagVariantMap = {
    suksess: 'success',
    info: 'info',
    advarsel: 'danger',
    fokus: 'warning',
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
        <LinkCard>
            <LinkCard.Title as="h3">
                <LinkCard.Anchor href={linkPath}>
                    <FormattedMessage id={titleId} />
                </LinkCard.Anchor>
            </LinkCard.Title>
            <LinkCard.Description>{children}</LinkCard.Description>
            <LinkCard.Footer>
                <Tag data-color={tagVariantMap[etikettType]}>
                    <FormattedMessage id={etikettId} />
                </Tag>
            </LinkCard.Footer>
        </LinkCard>
    );
}

export default LinkPanel;
