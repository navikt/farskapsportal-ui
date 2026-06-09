import { ReactNode } from 'react';

import { Alert, BodyShort, Heading, Page as AkselPage, Box, VStack } from '@navikt/ds-react';
import { Breadcrumb } from 'types/breadcrumbs';
import { useDekoratorBreadcrumbs } from 'utils/hooks/useDekoratorBreadcrumbs';
import { FormattedMessage } from 'react-intl';

interface PageProps {
    children: ReactNode;
    titleId: string;
    breadcrumbs?: Breadcrumb[];
    alertTextId?: string;
}

function Page({ breadcrumbs, children, titleId, alertTextId }: PageProps) {
    useDekoratorBreadcrumbs(breadcrumbs);

    return (
        <Box paddingBlock="space-0 space-24" asChild>
            <AkselPage.Block as="main" width="md" gutters>
                <VStack gap="space-24">
                    <PageAlert alertTextId={alertTextId} />
                    <Heading level="1" size="xlarge">
                        <FormattedMessage id={titleId} />
                    </Heading>
                    {children}
                </VStack>
            </AkselPage.Block>
        </Box>
    );
}

function PageAlert({ alertTextId }: { alertTextId?: string }) {
    if (!alertTextId) {
        return null;
    }

    return (
        <Box>
            <Alert variant="warning">
                <BodyShort>
                    <FormattedMessage id={alertTextId} />
                </BodyShort>
            </Alert>
        </Box>
    );
}

export default Page;
