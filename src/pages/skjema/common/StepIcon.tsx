import { CheckmarkCircleFillIcon } from '@navikt/aksel-icons';

import { StepStatus } from 'types/form';

import './StepIcon.css';

interface StepIconProps {
    stepNumber: number;
    status: StepStatus;
}

function StepIcon(props: StepIconProps) {
    const renderIcon = () => {
        switch (props.status) {
            case StepStatus.Done:
                return <CheckmarkCircleFillIcon aria-label="OK icon" role="img" />;
            case StepStatus.Active:
                return <div className="StepIcon__active">{props.stepNumber}</div>;
            case StepStatus.NotStarted:
                return <div className="StepIcon__not-started">{props.stepNumber}</div>;
        }
    };

    return <div className="StepIcon">{renderIcon()}</div>;
}

export default StepIcon;
