import { ClockFillIcon, CheckmarkCircleFillIcon, ExclamationmarkTriangleFillIcon } from '@navikt/aksel-icons';
import cl from 'classnames';
import React, { forwardRef } from 'react';
import { StepContext } from './Stepper';
import { IntlShape, useIntl } from 'react-intl';
import { getMessage } from '../../utils/intl';

import './index.css';

/* eslint-disable */
type StepProps = {
    children: React.ReactNode;
    className?: string;
    index?: number;
    last?: boolean;
    status?: 'none' | 'finished' | 'warning' | 'inProgress';
    disabled?: boolean;
    component?: React.ElementType;
} & React.HTMLAttributes<HTMLLIElement>;

const StepperStep = forwardRef<HTMLElement, StepProps>(
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
        const getIndicator = ({ intl }: { intl: IntlShape }) => {
            switch (status) {
                case 'finished':
                    return (
                        <CheckmarkCircleFillIcon
                            title={getMessage(intl, 'skjema.stepper.successFilled.title')}
                            aria-labelledby={'successTitle-' + index}
                            style={{ color: '#0067C5' }}
                        />
                    );
                case 'warning':
                    return (
                        <ExclamationmarkTriangleFillIcon
                            title={getMessage(intl, 'skjema.stepper.warningFilled.title')}
                            aria-labelledby={'warningTitle-' + index}
                        />
                    );
                case 'inProgress':
                    return (
                        <ClockFillIcon
                            title={getMessage(intl, 'skjema.stepper.clockFilled.title')}
                            aria-labelledby={'clockTitle-' + index}
                        />
                    );
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
                        <span className="navds-step__indicator">{getIndicator({ intl })}</span>
                        <div className={cl('navds-step__label')}>{children}</div>
                    </Component>
                )}
            </StepContext.Consumer>
        );
    }
);

export default StepperStep;
