import { HStack } from '@navikt/ds-react';

function ButtonContainer({ children }: React.PropsWithChildren) {
    return (
        <HStack gap="space-8" justify="end">
            {children}
        </HStack>
    );
}

export default ButtonContainer;
