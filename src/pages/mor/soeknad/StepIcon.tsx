import React from 'react';

import { ReactComponent as CircleCheckSvg } from 'assets/icons/circle-check.svg';
import { StepStatus } from 'types/form';

import './StepIcon.less';

interface StepIconProps {
    stepNumber: number;
    status: StepStatus;
}

function StepIcon(props: StepIconProps) {
    const renderIcon = (props: StepIconProps) => {
        switch (props.status) {
            case StepStatus.Done:
                return <CircleCheckSvg />;
            case StepStatus.Active:
                return <div className="StepIcon__active">{props.stepNumber}</div>;
            case StepStatus.NotStarted:
                return <div className="StepIcon__not-started">{props.stepNumber}</div>;
        }
    };

    return <div className="StepIcon">{renderIcon(props)}</div>;
}

export default StepIcon;
