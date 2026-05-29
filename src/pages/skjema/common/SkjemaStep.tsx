import { Box, Button, Heading } from '@navikt/ds-react';
import { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

import { StepStatus } from 'types/form';

import './SkjemaStep.css';

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
                    <div className="SkjemaStep__done">
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
                    </div>
                );
            case StepStatus.Active:
                return props.formComponent;
            case StepStatus.NotStarted:
                return <Heading level="2" size="small">{props.title}</Heading>;
        }
    };

    return (
        <section className="SkjemaStep">
            <Box background="default" borderWidth="1" borderColor="neutral-subtle" borderRadius="4" padding="space-16">{renderContent()}</Box>
        </section>
    );
}

export default SkjemaStep;
