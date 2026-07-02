import { useReducer } from 'react';
import { useIntl } from 'react-intl';
import { opprettFarskapserklaering } from 'api/api';
import Error from 'components/error/Error';
import { FormProgress, VStack } from '@navikt/ds-react';
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
import SpraakForFarskapserklaeringForm, {
    SpraakForFarskapserklaeringFormInput,
} from './forms/SpraakForFarskapserklaeringForm';
import { Skriftspraak } from '../../../types/skriftspraak';

type ActionType =
    | { type: 'EDIT_TERMINDATO' }
    | { type: 'SET_TERMINDATO'; payload: TermindatoFormInput }
    | { type: 'EDIT_FAR' }
    | { type: 'SET_FAR'; payload: FarFormInput }
    | { type: 'EDIT_SPRAAK' }
    | { type: 'EDIT_CONFIRM' }
    | { type: 'SET_SPRAAK'; payload: SpraakForFarskapserklaeringFormInput }
    | { type: 'BACK_TO_TERMINDATO' }
    | { type: 'BACK_TO_FAR' }
    | { type: 'BACK_TO_SPRAAK' }
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
        case 'EDIT_CONFIRM':
            return {
                ...state,
                activeStep: 3,
                stepStatus: {
                    ...state.stepStatus,
                    spraak: StepStatus.Done,
                },
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
        case 'BACK_TO_TERMINDATO':
            return {
                ...state,
                activeStep: 0,
                stepStatus: { ...state.stepStatus, barn: StepStatus.Active },
            };
        case 'BACK_TO_FAR':
            return {
                ...state,
                activeStep: 1,
                stepStatus: { ...state.stepStatus, far: StepStatus.Active },
            };
        case 'BACK_TO_SPRAAK':
            return {
                ...state,
                activeStep: 2,
                stepStatus: { ...state.stepStatus, spraak: StepStatus.Active },
            };
        case 'SUBMIT':
            return { ...state, submit: { pending: true, error: undefined } };
        case 'SUBMIT_FAILURE':
            return { ...state, submit: { pending: false, error: action.payload } };
    }
};

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

    const handleGoBack = () => {
        if (state.activeStep === 0) {
            navigateTo(Path.Oversikt);
        } else if (state.activeStep === 1) {
            dispatch({ type: 'BACK_TO_TERMINDATO' });
        } else if (state.activeStep === 2) {
            dispatch({ type: 'BACK_TO_FAR' });
        } else if (state.activeStep === 3) {
            dispatch({ type: 'BACK_TO_SPRAAK' });
        }
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

    const onSubmitFarForm = (data: FarFormInput) => {
        dispatch({ type: 'SET_FAR', payload: data });
    };

    const onSubmitSpraakForm = (data: SpraakForFarskapserklaeringFormInput) => {
        dispatch({ type: 'SET_SPRAAK', payload: data });
    };

    const handleStepChange = (step: number) => {
        const stepIndex = step - 1;
        if (stepIndex === 0 && !barnFoedselsnummer) {
            dispatch({ type: 'EDIT_TERMINDATO' });
        } else if (stepIndex === 1 && state.stepStatus.far !== StepStatus.NotStarted) {
            dispatch({ type: 'EDIT_FAR' });
        } else if (stepIndex === 2 && state.stepStatus.spraak !== StepStatus.NotStarted) {
            dispatch({ type: 'EDIT_SPRAAK' });
        } else if (stepIndex === 3 && state.stepStatus.spraak === StepStatus.Done) {
            dispatch({ type: 'EDIT_CONFIRM' });
        }
    };

    function renderSkjemaSteg() {
        switch (state.activeStep) {
            case 0:
                return (
                    <TermindatoForm
                        defaultTermindato={state.formValues.termindato.termindato}
                        onSubmit={onSubmitTermindatoForm}
                        onCancel={handleGoBack}
                    />
                );
            case 1:
                return (
                    <FarForm
                        defaultNavn={state.formValues.far.navn}
                        defaultFoedselsnummer={state.formValues.far.foedselsnummer}
                        onSubmit={onSubmitFarForm}
                        onCancel={handleGoBack}
                    />
                );
            case 2:
                return (
                    <SpraakForFarskapserklaeringForm
                        onSubmit={onSubmitSpraakForm}
                        onCancel={handleGoBack}
                    />
                );
            case 3:
                return (
                    <MorBekreftForm
                        isPending={state.submit.pending}
                        onSubmit={onSubmit}
                        onCancel={handleGoBack}
                    />
                );
            default:
                return null;
        }
    }

    const isBarnStepInteractive = !barnFoedselsnummer;
    const isFarStepInteractive = state.stepStatus.far !== StepStatus.NotStarted;
    const isSpraakStepInteractive = state.stepStatus.spraak !== StepStatus.NotStarted;
    const isConfirmStepInteractive = state.stepStatus.spraak === StepStatus.Done;

    return (
        <VStack gap="space-24">
            <FormProgress
                totalSteps={4}
                activeStep={state.activeStep + 1}
                onStepChange={handleStepChange}
            >
                <FormProgress.Step
                    completed={state.stepStatus.barn === StepStatus.Done ? true : false}
                    interactive={isBarnStepInteractive}
                >
                    {getMessage(intl, 'skjema.mor.barn.title')}
                </FormProgress.Step>
                <FormProgress.Step
                    completed={state.stepStatus.far === StepStatus.Done ? true : false}
                    interactive={isFarStepInteractive}
                >
                    {getMessage(intl, 'skjema.mor.far.title')}
                </FormProgress.Step>
                <FormProgress.Step
                    completed={state.stepStatus.spraak === StepStatus.Done ? true : false}
                    interactive={isSpraakStepInteractive}
                >
                    {getMessage(intl, 'skjema.mor.spraak.title')}
                </FormProgress.Step>
                <FormProgress.Step completed={false} interactive={isConfirmStepInteractive}>
                    {getMessage(intl, 'skjema.mor.confirm.title')}
                </FormProgress.Step>
            </FormProgress>
            {renderSkjemaSteg()}
            <div aria-live="polite">
                {state.submit.error && <Error error={state.submit.error} />}
            </div>
        </VStack>
    );
}

export default MorSkjema;
