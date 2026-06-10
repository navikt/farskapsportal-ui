import { VStack } from '@navikt/ds-react';

function ContentContainer({ children }: React.PropsWithChildren) {
    return (
        <VStack gap="space-24" align="center" justify="center">
            {children}
        </VStack>
    );
}

export default ContentContainer;
