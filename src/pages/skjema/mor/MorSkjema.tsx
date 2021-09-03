import { useReducer } from 'react';
import { useIntl } from 'react-intl';

import { opprettFarskapserklaering } from 'api/api';
import Error from 'components/error/Error';
import { AlertError } from 'types/error';
import { StepStatus } from 'types/form';
import { Path } from 'types/path';
import { UserInfo } from 'types/user';
import { FNR_ID } from 'utils/constants';
import { useNavigateTo } from 'utils/hooks/useNavigateTo';
import { useQuery } from 'utils/hooks/useQuery';
import { getMessage } from 'utils/intl';
import FarForm, { FarFormInput } from './forms/FarForm';
import MorBekreftForm from './forms/MorBekreftForm';
import TermindatoForm, { TermindatoFormInput } from './forms/TermindatoForm';
import BarnPresentation from './presentation/BarnPresentation';
import FarPresentation from './presentation/FarPresentation';
import { Stepper, StepperStep } from '../../../components/stepper';
import SkjemaStep from '../common/SkjemaStep';
import SpraakForFarskapserklaeringForm, {
    SpraakForFarskapserklaeringFormInput,
} from './forms/SpraakForFarskapserklaeringForm';
import { Skriftspraak } from '../../../types/skriftspraak';
import SpraakForFarskapserklaeringPresentation from './presentation/SpraakForFarskapserklaeringPresentation';

type ActionType =
    | { type: 'EDIT_TERMINDATO' }
    | { type: 'SET_TERMINDATO'; payload: TermindatoFormInput }
    | { type: 'EDIT_FAR' }
    | { type: 'SET_FAR'; payload: FarFormInput }
    | { type: 'EDIT_SPRAAK' }
    | { type: 'SET_SPRAAK'; payload: SpraakForFarskapserklaeringFormInput }
    | { type: 'SUBMIT' }
    | { type: 'SUBMIT_FAILURE'; payload: AlertError };

interface StateType {
    formValues: {
        termindato: TermindatoFormInput;
        far: FarFormInput;
        spraak: SpraakForFarskapserklaeringFormInput;
    };
    activeStep: number;
    stepStatus: {
        barn: StepStatus;
        far: StepStatus;
        spraak: StepStatus;
    };
    submit: {
        pending: boolean;
        error?: AlertError;
    };
}

const reducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case 'EDIT_TERMINDATO':
            return {
                ...state,
                activeStep: 0,
                stepStatus: { ...state.stepStatus, barn: StepStatus.Active },
            };
        case 'SET_TERMINDATO':
            return {
                ...state,
                formValues: {
                    ...state.formValues,
                    termindato: action.payload,
                },
                activeStep: state.stepStatus.far === StepStatus.Done ? 2 : 1,
                stepStatus: {
                    ...state.stepStatus,
                    barn: StepStatus.Done,
                    far:
                        state.stepStatus.far === StepStatus.Done
                            ? StepStatus.Done
                            : StepStatus.Active,
                },
            };
        case 'EDIT_FAR':
            return {
                ...state,
                activeStep: 1,
                stepStatus: { ...state.stepStatus, far: StepStatus.Active },
            };
        case 'SET_FAR':
            return {
                ...state,
                formValues: { ...state.formValues, far: action.payload },
                activeStep: 2,
                stepStatus: {
                    ...state.stepStatus,
                    far: StepStatus.Done,
                    spraak:
                        state.stepStatus.spraak === StepStatus.Done
                            ? StepStatus.Done
                            : StepStatus.Active,
                },
            };
        case 'EDIT_SPRAAK':
            return {
                ...state,
                activeStep: 2,
                stepStatus: { ...state.stepStatus, spraak: StepStatus.Active },
            };
        case 'SET_SPRAAK':
            return {
                ...state,
                formValues: { ...state.formValues, spraak: action.payload },
                activeStep: 3,
                stepStatus: {
                    ...state.stepStatus,
                    spraak: StepStatus.Done,
                },
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

interface MorSkjemaProps {
    userInfo: UserInfo;
}

function MorSkjema({ userInfo }: MorSkjemaProps) {
    const fnrId = useQuery().get(FNR_ID);
    const barnFoedselsnummer = fnrId
        ? userInfo.fnrNyligFoedteBarnUtenRegistrertFar?.[parseInt(fnrId)] ?? null
        : null;

    const intl = useIntl();
    const navigateTo = useNavigateTo();

    const [state, dispatch] = useReducer(reducer, {
        formValues: {
            termindato: {
                termindato: '',
            },
            far: {
                navn: '',
                foedselsnummer: '',
            },
            spraak: {
                spraak: null,
            },
        },
        activeStep: barnFoedselsnummer ? 1 : 0,
        stepStatus: {
            barn: barnFoedselsnummer ? StepStatus.Done : StepStatus.Active,
            far: barnFoedselsnummer ? StepStatus.Active : StepStatus.NotStarted,
            spraak: StepStatus.NotStarted,
        },
        submit: {
            pending: false,
            error: undefined,
        },
    });

    const onCancel = () => {
        navigateTo(Path.Oversikt);
    };

    const onSubmit = () => {
        dispatch({ type: 'SUBMIT' });

        opprettFarskapserklaering({
            barn: {
                foedselsnummer: barnFoedselsnummer,
                termindato: barnFoedselsnummer ? null : state.formValues.termindato.termindato,
            },
            opplysningerOmFar: {
                foedselsnummer: state.formValues.far.foedselsnummer,
                navn: state.formValues.far.navn,
            },
            skriftspraak: state.formValues.spraak.spraak ?? Skriftspraak.Bookmaal,
        })
            .then((response) => {
                window.location.assign(response.redirectUrlForSigneringMor);
            })
            .catch((error: AlertError) => {
                dispatch({ type: 'SUBMIT_FAILURE', payload: error });
            });
    };

    const onSubmitTermindatoForm = (data: TermindatoFormInput) => {
        dispatch({
            type: 'SET_TERMINDATO',
            payload: data,
        });
    };

    const onEndreBarnForm = () => {
        dispatch({ type: 'EDIT_TERMINDATO' });
    };

    const onSubmitFarForm = (data: FarFormInput) => {
        dispatch({ type: 'SET_FAR', payload: data });
    };

    const onEndreFarForm = () => {
        dispatch({ type: 'EDIT_FAR' });
    };

    const onSubmitSpraakForm = (data: SpraakForFarskapserklaeringFormInput) => {
        dispatch({ type: 'SET_SPRAAK', payload: data });
    };

    const onEndreSpraakForm = () => {
        dispatch({ type: 'EDIT_SPRAAK' });
    };

    return (
        <div>
            <Stepper activeStep={state.activeStep} colorful>
                <StepperStep status={mapStepStatusToStepperState(state.stepStatus.barn)}>
                    <SkjemaStep
                        formComponent={
                            <TermindatoForm
                                defaultTermindato={state.formValues.termindato.termindato}
                                onSubmit={onSubmitTermindatoForm}
                                onCancel={onCancel}
                            />
                        }
                        presentationComponent={
                            <BarnPresentation
                                foedselsnummer={barnFoedselsnummer}
                                termindato={state.formValues.termindato.termindato}
                            />
                        }
                        status={state.stepStatus.barn}
                        onChange={barnFoedselsnummer ? undefined : onEndreBarnForm}
                        isDisabled={state.submit.pending}
                    />
                </StepperStep>
                <StepperStep status={mapStepStatusToStepperState(state.stepStatus.far)}>
                    <SkjemaStep
                        formComponent={
                            <FarForm
                                defaultNavn={state.formValues.far.navn}
                                defaultFoedselsnummer={state.formValues.far.foedselsnummer}
                                onSubmit={onSubmitFarForm}
                                onCancel={onCancel}
                            />
                        }
                        presentationComponent={
                            <FarPresentation
                                navn={state.formValues.far.navn}
                                foedselsnummer={state.formValues.far.foedselsnummer}
                            />
                        }
                        title={getMessage(intl, 'skjema.mor.far.title')}
                        status={state.stepStatus.far}
                        onChange={onEndreFarForm}
                        isDisabled={state.submit.pending}
                    />
                </StepperStep>
                <StepperStep status={mapStepStatusToStepperState(state.stepStatus.spraak)}>
                    <SkjemaStep
                        formComponent={
                            <SpraakForFarskapserklaeringForm
                                onSubmit={onSubmitSpraakForm}
                                onCancel={onCancel}
                            />
                        }
                        presentationComponent={
                            <SpraakForFarskapserklaeringPresentation
                                spraak={state.formValues.spraak.spraak ?? Skriftspraak.Bookmaal}
                            />
                        }
                        title={getMessage(intl, 'skjema.mor.spraak.title')}
                        status={state.stepStatus.spraak}
                        onChange={onEndreSpraakForm}
                        isDisabled={state.submit.pending}
                    />
                </StepperStep>
                <StepperStep>
                    <SkjemaStep
                        formComponent={
                            <MorBekreftForm
                                isPending={state.submit.pending}
                                onSubmit={onSubmit}
                                onCancel={onCancel}
                            />
                        }
                        title={getMessage(intl, 'skjema.mor.confirm.title')}
                        status={
                            state.stepStatus.barn === StepStatus.Done &&
                            state.stepStatus.far === StepStatus.Done &&
                            state.stepStatus.spraak === StepStatus.Done
                                ? StepStatus.Active
                                : StepStatus.NotStarted
                        }
                    />
                </StepperStep>
            </Stepper>
            <div aria-live="polite">
                {state.submit.error && <Error error={state.submit.error} />}
            </div>
        </div>
    );
}

export default MorSkjema;
