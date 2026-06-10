import { Box, Button, Heading, HStack } from '@navikt/ds-react';
import { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

import { StepStatus } from 'types/form';

interface SkjemaStepProps {
    formComponent: ReactNode;
    presentationComponent?: ReactNode;
    status: StepStatus;
    title?: string;
    onChange?: () => void;
    isDisabled?: boolean;
}

function SkjemaStep(props: SkjemaStepProps) {
    const renderContent = () => {
        switch (props.status) {
            case StepStatus.Done:
                return (
                    <HStack justify="space-between" align="start" gap="space-16">
                        {props.presentationComponent}
                        {props.onChange && (
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={props.onChange}
                                disabled={props.isDisabled}
                            >
                                <FormattedMessage id="skjema.edit" />
                            </Button>
                        )}
                    </HStack>
                );
            case StepStatus.Active:
                return props.formComponent;
            case StepStatus.NotStarted:
                return <Heading level="2" size="small">{props.title}</Heading>;
        }
    };

    return (
        <section>
            <Box background="default" borderWidth="1" borderColor="neutral-subtle" borderRadius="4" padding="space-16">
                {renderContent()}
            </Box>
        </section>
    );
}

export default SkjemaStep;
