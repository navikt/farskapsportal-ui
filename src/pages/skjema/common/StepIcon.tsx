import { CheckmarkCircleFillIcon } from '@navikt/aksel-icons';
import { Box } from '@navikt/ds-react';

import { StepStatus } from 'types/form';

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
                return <Box as="div">{props.stepNumber}</Box>;
            case StepStatus.NotStarted:
                return <Box as="div">{props.stepNumber}</Box>;
        }
    };

    return <Box as="div">{renderIcon()}</Box>;
}

export default StepIcon;
