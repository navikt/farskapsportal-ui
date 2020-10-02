import React, { ReactNode } from 'react';
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
    const content =
        props.status === StepStatus.Done ? (
            <div className="SoeknadStep__done">
                {props.presentationComponent}
                <Flatknapp onClick={props.onChange}>Endre</Flatknapp>
            </div>
        ) : props.status === StepStatus.Active ? (
            props.formComponent
        ) : (
            <Undertittel>{props.title}</Undertittel>
        );

    return (
        <div className="SoeknadStep">
            <StepIcon status={props.status} stepNumber={props.stepNumber} />
            <Panel>{content}</Panel>
        </div>
    );
}

export default SoeknadStep;
