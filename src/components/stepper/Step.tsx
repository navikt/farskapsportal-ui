import { ClockFilled, SuccessFilled, WarningFilled } from '@navikt/ds-icons';
import cl from 'classnames';
import React, { forwardRef } from 'react';
import { StepContext } from './Stepper';
import { IntlShape, useIntl } from 'react-intl';
import { getMessage } from "../../utils/intl";

import { OverridableComponent } from './OverridableComponent';

import './index.less';

export interface StepperStepProps {
    props: {
        children: React.ReactNode;
        index?: number;
        last?: boolean;
        status?: 'none' | 'finished' | 'warning' | 'inProgress';
        disabled?: boolean;
    } & React.HTMLAttributes<HTMLLIElement>;
    defaultComponent: 'span';
}

/* eslint-disable */
const StepperStep: OverridableComponent<StepperStepProps> = forwardRef(
    (
        {
            children,
            className,
            index = 0,
            last = false,
            status = 'none',
            disabled = false,
            component: Component = 'span',
            ...rest
        },
        ref
    ) => {
        const getIndicator = ({ intl }: { intl: IntlShape } ) => {
            switch (status) {
                case 'finished':
                    return <SuccessFilled title={getMessage(intl, 'skjema.stepper.successFilled.title')}
                                          titleId="successTitle" aria-labelledby="successTitle"
                                          style={{ color: '#0067C5' }} />;
                case 'warning':
                    return <WarningFilled title={getMessage(intl, 'skjema.stepper.warningFilled.title')}
                                          titleId="warningqTitle" aria-labelledby="warningTitle" />;
                case 'inProgress':
                    return <ClockFilled   title={getMessage(intl, 'skjema.stepper.clockFilled.title')}
                                          titleId="clockTitle" aria-labelledby="clockTitle" />;
                default:
                    return index + 1;
            }
        };
        const intl = useIntl();
        return (
            <StepContext.Consumer>
                {({ activeStep }) => (
                    <Component
                        ref={ref}
                        className={cl(className, `navds-step`, `navds-step--${status}`, {
                            'navds-step--disabled': disabled,
                            'navds-step--active': activeStep === index,
                            'navds-step--before-active': index < activeStep,
                        })}
                        disabled={Component === 'button' && disabled}
                        {...rest}
                    >
                        <span className="navds-step__indicator">{getIndicator({intl})}</span>
                        <div className={cl('navds-step__label')}>{children}</div>
                    </Component>
                )}
            </StepContext.Consumer>
        );
    }
);

export default StepperStep;
