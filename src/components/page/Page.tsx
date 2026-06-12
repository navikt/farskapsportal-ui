import { Heading, Page as AkselPage, Box, LocalAlert, VStack } from '@navikt/ds-react';
import { Breadcrumb } from 'types/breadcrumbs';
import { useDekoratorBreadcrumbs } from 'utils/hooks/useDekoratorBreadcrumbs';
import { FormattedMessage } from 'react-intl';

interface PageProps {
    children: React.ReactNode;
    titleId: string;
    breadcrumbs?: Breadcrumb[];
    alertTextId?: string;
}

function Page({ breadcrumbs, children, titleId, alertTextId }: PageProps) {
    useDekoratorBreadcrumbs(breadcrumbs);

    return (
        <VStack gap="space-16" paddingBlock="space-32" asChild>
            <AkselPage.Block as="main" width="md" gutters>
                <Heading level="1" size="xlarge" as="h1" spacing>
                    <FormattedMessage id={titleId} />
                </Heading>
                <PageAlert alertTextId={alertTextId} />
                {children}
            </AkselPage.Block>
        </VStack>
    );
}

function PageAlert({ alertTextId }: { alertTextId?: string }) {
    if (!alertTextId) {
        return null;
    }

    return (
        <Box marginBlock="space-0 space-16" asChild>
            <LocalAlert status="warning">
                <LocalAlert.Header>
                    <LocalAlert.Title>Advarsel</LocalAlert.Title>
                </LocalAlert.Header>
                <LocalAlert.Content>
                    <FormattedMessage id={alertTextId} />
                </LocalAlert.Content>
            </LocalAlert>
        </Box>
    );
}

export default Page;
