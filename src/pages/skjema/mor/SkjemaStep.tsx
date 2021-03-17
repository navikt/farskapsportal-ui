import { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import Panel from 'nav-frontend-paneler';
import { Flatknapp } from 'nav-frontend-knapper';
import { Undertittel } from 'nav-frontend-typografi';

import { StepStatus } from 'types/form';
import StepIcon from './StepIcon';

import './SkjemaStep.less';

interface SkjemaStepProps {
    stepNumber: 1 | 2 | 3 | 4;
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
                            <Flatknapp
                                htmlType="button"
                                onClick={props.onChange}
                                disabled={props.isDisabled}
                            >
                                <FormattedMessage id="mor.presentation.change" />
                            </Flatknapp>
                        )}
                    </div>
                );
            case StepStatus.Active:
                return props.formComponent;
            case StepStatus.NotStarted:
                return <Undertittel>{props.title}</Undertittel>;
        }
    };

    return (
        <section className="SkjemaStep">
            <StepIcon status={props.status} stepNumber={props.stepNumber} />
            <Panel>{renderContent()}</Panel>
        </section>
    );
}

export default SkjemaStep;
