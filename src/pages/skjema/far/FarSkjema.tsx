import { useReducer } from 'react';
import { useIntl } from 'react-intl';

import { getNewRedirectUrl, oppdaterFarskapserklaering } from 'api/api';
import Error from 'components/error/Error';
import { AlertError } from 'types/error';
import { StepStatus } from 'types/form';
import { Path } from 'types/path';
import { UserInfo } from 'types/user';
import { ERKLAERING_ID } from 'utils/constants';
import { useNavigateTo } from 'utils/hooks/useNavigateTo';
import { useQuery } from 'utils/hooks/useQuery';
import { getMessage } from 'utils/intl';
import BorSammenForm, { BorSammenFormInput } from '../common/BorSammenForm';
import BorSammenPresentation from '../common/BorSammenPresentation';
import FarBekreftForm from './FarBekreftForm';
import LesOpplysningerForm from './LesOpplysningerForm';
import LesOpplysningerPresentation from './LesOpplysningerPresentation';
import { Stepper, StepperStep } from '../../../components/stepper';
import SkjemaStep from '../common/SkjemaStep';

import './FarSkjema.less';

type ActionType =
    | { type: 'SET_LES_OPPLYSNINGER' }
    | { type: 'EDIT_BOR_SAMMEN' }
    | { type: 'SET_BOR_SAMMEN'; payload: BorSammenFormInput }
    | { type: 'SUBMIT' }
    | { type: 'SUBMIT_FAILURE'; payload: AlertError };

interface StateType {
    formValues: {
        borSammen: BorSammenFormInput;
    };
    activeStep: number;
    stepStatus: {
        lesOpplysninger: StepStatus;
        borSammen: StepStatus;
    };
    submit: {
        pending: boolean;
        error?: AlertError;
    };
}

const reducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case 'SET_LES_OPPLYSNINGER':
            return {
                ...state,
                activeStep: state.stepStatus.borSammen === StepStatus.Done ? 2 : 1,
                stepStatus: { lesOpplysninger: StepStatus.Done, borSammen: StepStatus.Active },
            };
        case 'EDIT_BOR_SAMMEN':
            return {
                ...state,
                activeStep: 1,
                stepStatus: { ...state.stepStatus, borSammen: StepStatus.Active },
            };
        case 'SET_BOR_SAMMEN':
            return {
                ...state,
                activeStep: 2,
                formValues: { borSammen: action.payload },
                stepStatus: { ...state.stepStatus, borSammen: StepStatus.Done },
            };
        case 'SUBMIT':
            return { ...state, submit: { pending: true, error: undefined } };
        case 'SUBMIT_FAILURE':
            return { ...state, submit: { pending: false, error: action.payload } };
    }
};

function mapStepStatusToStepperState(stepStatus: StepStatus): 'none' | 'finished' | 'inProgress' {
    switch (stepStatus) {
        case StepStatus.Done:
            return 'finished';
        default:
            return 'none';
    }
}

interface FarskjemaProps {
    userInfo: UserInfo;
}

function FarSkjema({ userInfo }: FarskjemaProps) {
    const intl = useIntl();
    const navigateTo = useNavigateTo();
    const erklaeringId = useQuery().get(ERKLAERING_ID);

    const farskapserklaering = userInfo.avventerSigneringBruker?.find(
        (erklaering) => erklaering.idFarskapserklaering === parseInt(erklaeringId ?? '')
    );

    const [state, dispatch] = useReducer(reducer, {
        formValues: {
            borSammen: {
                // Setter default om bruker kommer tilbake etter avbrutt signering.
                // TODO: skal dette håndteres på en annen måte? Skal bruker kunne endre svaret sitt her?
                borSammen:
                    farskapserklaering?.farBorSammenMedMor === true
                        ? 'YES'
                        : farskapserklaering?.farBorSammenMedMor === false
                        ? 'NO'
                        : null,
            },
        },
        activeStep: 0,
        stepStatus: {
            lesOpplysninger: StepStatus.Active,
            borSammen: StepStatus.NotStarted,
        },
        submit: {
            pending: false,
            error: undefined,
        },
    });

    if (!erklaeringId) {
        // TODO: handle missing erklaeringId
        return null;
    }

    if (!farskapserklaering) {
        // TODO: handle missing farskapserklaering
        return null;
    }

    const onCancel = () => {
        navigateTo(Path.Oversikt);
    };

    const onSubmit = () => {
        dispatch({ type: 'SUBMIT' });
        oppdaterFarskapserklaering({
            borSammen: state.formValues.borSammen.borSammen === 'YES',
            idFarskapserklaering: parseInt(erklaeringId),
        })
            .then(() => {
                getNewRedirectUrl(erklaeringId)
                    .then((redirectUrl) => {
                        window.location.assign(redirectUrl);
                    })
                    .catch((error: AlertError) => {
                        dispatch({ type: 'SUBMIT_FAILURE', payload: error });
                    });
            })
            .catch((error: AlertError) => {
                dispatch({ type: 'SUBMIT_FAILURE', payload: error });
            });
    };

    const onSubmitLesOpplysninger = () => {
        dispatch({ type: 'SET_LES_OPPLYSNINGER' });
    };

    const onSubmitBorSammenForm = (data: BorSammenFormInput) => {
        dispatch({ type: 'SET_BOR_SAMMEN', payload: data });
    };

    const onEndreBorSammenForm = () => {
        dispatch({ type: 'EDIT_BOR_SAMMEN' });
    };

    return (
        <div className="FarSkjema">
            <Stepper activeStep={state.activeStep} colorful>
                <StepperStep status={mapStepStatusToStepperState(state.stepStatus.lesOpplysninger)}>
                    <SkjemaStep
                        formComponent={
                            <LesOpplysningerForm
                                farskapserklaering={farskapserklaering}
                                onSubmit={onSubmitLesOpplysninger}
                                onCancel={onCancel}
                            />
                        }
                        presentationComponent={
                            <LesOpplysningerPresentation farskapserklaering={farskapserklaering} />
                        }
                        status={state.stepStatus.lesOpplysninger}
                    />
                </StepperStep>
                <StepperStep status={mapStepStatusToStepperState(state.stepStatus.borSammen)}>
                    <SkjemaStep
                        formComponent={
                            <BorSammenForm
                                titleId="skjema.far.borSammen.title"
                                defaultBorSammen={state.formValues.borSammen.borSammen}
                                onSubmit={onSubmitBorSammenForm}
                                onCancel={onCancel}
                            />
                        }
                        presentationComponent={
                            <BorSammenPresentation
                                titleId="skjema.far.borSammen.title"
                                borSammen={state.formValues.borSammen.borSammen}
                            />
                        }
                        title={getMessage(intl, 'skjema.far.borSammen.title')}
                        status={state.stepStatus.borSammen}
                        onChange={onEndreBorSammenForm}
                        isDisabled={state.submit.pending}
                    />
                </StepperStep>
                <StepperStep>
                    <SkjemaStep
                        formComponent={
                            <FarBekreftForm
                                isPending={state.submit.pending}
                                onSubmit={onSubmit}
                                onCancel={onCancel}
                            />
                        }
                        title={getMessage(intl, 'skjema.far.confirm.title')}
                        status={
                            state.stepStatus.lesOpplysninger === StepStatus.Done &&
                            state.stepStatus.borSammen === StepStatus.Done
                                ? StepStatus.Active
                                : StepStatus.NotStarted
                        }
                        onChange={onEndreBorSammenForm}
                        isDisabled={state.submit.pending}
                    />
                </StepperStep>
            </Stepper>
            <div aria-live="polite">
                {state.submit.error && <Error error={state.submit.error} />}
            </div>
        </div>
    );
}

export default FarSkjema;
