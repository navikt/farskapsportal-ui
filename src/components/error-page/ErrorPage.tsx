import { ReactNode } from 'react';
import { BodyLong, Box, Heading, VStack } from '@navikt/ds-react';

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
        <VStack gap="space-24">
            <VeilederBanner title={banner.title} text={banner.text} veileder={{ type: 'unsure' }} />
            <Box padding="space-32" marginInline="auto" style={{ maxWidth: '800px', textAlign: 'center' }}>
                <VStack gap="space-16" align="center">
                    <Heading level="2" size="medium">
                        {title}
                    </Heading>
                <BodyLong size="large">{text}</BodyLong>
                </VStack>
            </Box>
        </VStack>
    );
}

export default ErrorPage;
