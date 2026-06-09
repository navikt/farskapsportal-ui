import { ReactNode } from 'react';
import { VStack } from '@navikt/ds-react';

interface ButtonContainerProps {
    children: ReactNode;
}

function ButtonContainer({ children }: ButtonContainerProps) {
    return <VStack gap="space-16">{children}</VStack>;
}

export default ButtonContainer;
