import { Loader, VStack } from '@navikt/ds-react';

function Spinner() {
    return (
        <VStack gap="space-16" align="center" justify="center" marginBlock="space-64">
            <Loader size="2xlarge" />
        </VStack>
    );
}

export default Spinner;
