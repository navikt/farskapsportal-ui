import { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import Panel from 'nav-frontend-paneler';
import { Flatknapp } from 'nav-frontend-knapper';
import { Undertittel } from 'nav-frontend-typografi';

import { StepStatus } from 'types/form';
import StepIcon from './StepIcon';

import './SoeknadStep.less';

interface SoeknadStepProps {
    stepNumber: 1 | 2 | 3;
    formComponent: ReactNode;
    presentationComponent?: ReactNode;
    status: StepStatus;
    title?: string;
    onChange?: () => void;
}

function SoeknadStep(props: SoeknadStepProps) {
    const renderContent = (props: SoeknadStepProps) => {
        switch (props.status) {
            case StepStatus.Done:
                return (
                    <div className="SoeknadStep__done">
                        {props.presentationComponent}
                        <Flatknapp htmlType="button" onClick={props.onChange}>
                            <FormattedMessage id="mor.presentation.change" />
                        </Flatknapp>
                    </div>
                );
            case StepStatus.Active:
                return props.formComponent;
            case StepStatus.NotStarted:
                return <Undertittel>{props.title}</Undertittel>;
        }
    };

    return (
        <section className="SoeknadStep">
            <StepIcon status={props.status} stepNumber={props.stepNumber} />
            <Panel>{renderContent(props)}</Panel>
        </section>
    );
}

export default SoeknadStep;
