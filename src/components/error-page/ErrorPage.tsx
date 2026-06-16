import { ReactNode } from 'react';
import { BodyLong, Heading, Page, VStack } from '@navikt/ds-react';
import VeilederBanner from 'components/veileder-banner/VeilederBanner';

export interface ErrorPageProps {
    title: ReactNode;
    text: ReactNode;
    banner: {
        title: string;
        text: ReactNode;
    };
}

function ErrorPage({ title, text, banner }: ErrorPageProps) {
    return (
        <Page.Block as="main">
            <VeilederBanner title={banner.title} text={banner.text} veileder={{ type: 'unsure' }} />
            <VStack gap="space-16" align="center" justify="center" padding="space-32">
                <Heading level="2" size="large" as="h2">
                    {title}
                </Heading>
                <BodyLong size="large">{text}</BodyLong>
            </VStack>
        </Page.Block>
    );
}

export default ErrorPage;
