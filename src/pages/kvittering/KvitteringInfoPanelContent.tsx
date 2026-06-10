import { Heading, VStack } from '@navikt/ds-react';
import { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

interface KvitteringInfoPanelContentProps {
    children: ReactNode;
    titleId: string;
}

function KvitteringInfoPanelContent({ children, titleId }: KvitteringInfoPanelContentProps) {
    return (
        <section>
            <Heading level="3" size="small" as="h3" spacing>
                <FormattedMessage id={titleId} />
            </Heading>
            <VStack gap="space-16">{children}</VStack>
        </section>
    );
}

export default KvitteringInfoPanelContent;
