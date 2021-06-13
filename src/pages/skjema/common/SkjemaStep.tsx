import {Knapp} from 'nav-frontend-knapper';
import Panel from 'nav-frontend-paneler';
import {Systemtittel} from 'nav-frontend-typografi';
import {ReactNode} from 'react';
import {FormattedMessage} from 'react-intl';

import {StepStatus} from 'types/form';

import './SkjemaStep.less';

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
                            <Knapp
                                htmlType="button"
                                onClick={props.onChange}
                                disabled={props.isDisabled}
                            >
                                <FormattedMessage id="skjema.edit" />
                            </Knapp>
                        )}
                    </div>
                );
            case StepStatus.Active:
                return props.formComponent;
            case StepStatus.NotStarted:
                return <Systemtittel>{props.title}</Systemtittel>;
        }
    };

    return (
        <section className="SkjemaStep">
            <Panel>{renderContent()}</Panel>
        </section>
    );
}

export default SkjemaStep;
