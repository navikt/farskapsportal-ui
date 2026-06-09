import { VStack } from '@navikt/ds-react';
import classNames from 'classnames';
import { ReactNode } from 'react';

interface ContentContainerProps {
    children: ReactNode;
    className?: string;
}

function ContentContainer({ children, className }: ContentContainerProps) {
    return (
        <VStack className={classNames(className)} gap="space-24">
            {children}
        </VStack>
    );
}

export default ContentContainer;
