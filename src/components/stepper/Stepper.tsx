import cl from "classnames";
import React, { createContext, forwardRef } from "react";
import StepperStep from "./Step";

import "./index.less";

// TODO: Denne komponenten er under utvikling, så denne koden er bare kopiert fra tilhørende branch
//  på nav-frontend-moduler repo. Bytt ut med bruk av riktig package når den blir tilgjengelig.

export interface StepperProps extends React.HTMLAttributes<HTMLOListElement> {
  children:
    | React.ReactElement<typeof StepperStep>
    | Array<React.ReactElement<typeof StepperStep>>;
  activeStep: number;
  colorful?: boolean;
  arrow?: boolean;
}

export const StepContext = createContext({
  activeStep: 0,
});

/* eslint-disable */
const Stepper = forwardRef<HTMLOListElement, StepperProps>(
  (
    {
      children,
      className,
      activeStep,
      colorful = false,
      arrow = false,
      ...rest
    },
    ref
  ) => {
    const steps = React.Children.toArray(children) as React.ReactElement<typeof StepperStep>[];
    const stepsWithIndex = steps.map(
      (step: React.ReactElement<typeof StepperStep>, index) => {
        return (
          <li key={index} aria-current={index === activeStep && "step"}>
            {React.cloneElement(step, {
              ...step.props,
              ...{ index, last: steps.length === index + 1 },
            })}
          </li>
        );
      }
    );

    return (
      <ol
        ref={ref}
        className={cl(`navds-stepper`, className, {
          "navds-stepper--arrow": arrow,
          "navds-stepper--colorful": colorful,
        })}
        {...rest}
      >
        <StepContext.Provider
          value={{
            activeStep,
          }}
        >
          {stepsWithIndex}
        </StepContext.Provider>
      </ol>
    );
  }
);

export default Stepper;
