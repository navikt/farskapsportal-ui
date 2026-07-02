import { useReducer } from 'react';
import { useIntl } from 'react-intl';
import { getNewRedirectUrl, oppdaterFarskapserklaering } from 'api/api';
import Error from 'components/error/Error';
import { FormProgress, VStack } from '@navikt/ds-react';
import { AlertError } from 'types/error';
import { StepStatus } from 'types/form';
import { Path } from 'types/path';
import { UserInfo } from 'types/user';
import { ERKLAERING_ID } from 'utils/constants';
import { useNavigateTo } from 'utils/hooks/useNavigateTo';
import { useQuery } from 'utils/hooks/useQuery';
import { getMessage } from 'utils/intl';
import BorSammenForm, { BorSammenFormInput } from '../common/BorSammenForm';
import FarBekreftForm from './FarBekreftForm';
import LesOpplysningerForm from './LesOpplysningerForm';

type ActionType =
    | { type: 'SET_LES_OPPLYSNINGER' }
    | { type: 'EDIT_BOR_SAMMEN' }
    | { type: 'EDIT_CONFIRM' }
    | { type: 'SET_BOR_SAMMEN'; payload: BorSammenFormInput }
    | { type: 'BACK_TO_LES_OPPLYSNINGER' }
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
        case 'EDIT_CONFIRM':
            return {
                ...state,
                activeStep: 2,
                stepStatus: { ...state.stepStatus, borSammen: StepStatus.Done },
            };
        case 'SET_BOR_SAMMEN':
            return {
                ...state,
                activeStep: 2,
                formValues: { borSammen: action.payload },
                stepStatus: { ...state.stepStatus, borSammen: StepStatus.Done },
            };
        case 'BACK_TO_LES_OPPLYSNINGER':
            return {
                ...state,
                activeStep: 0,
                stepStatus: { ...state.stepStatus, lesOpplysninger: StepStatus.Active },
            };
        case 'SUBMIT':
            return { ...state, submit: { pending: true, error: undefined } };
        case 'SUBMIT_FAILURE':
            return { ...state, submit: { pending: false, error: action.payload } };
    }
};



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

    const currentFarskapserklaering = farskapserklaering;

    const handleGoBack = () => {
        if (state.activeStep === 0) {
            navigateTo(Path.Oversikt);
        } else if (state.activeStep === 1) {
            dispatch({ type: 'BACK_TO_LES_OPPLYSNINGER' });
        } else if (state.activeStep === 2) {
            dispatch({ type: 'EDIT_BOR_SAMMEN' });
        }
    };

    const onSubmit = () => {
        dispatch({ type: 'SUBMIT' });
        oppdaterFarskapserklaering({
            farBorSammenMedMor: state.formValues.borSammen.borSammen === 'YES',
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

    const handleStepChange = (step: number) => {
        const stepIndex = step - 1;
        if (stepIndex === 0 && state.stepStatus.lesOpplysninger !== StepStatus.NotStarted) {
            dispatch({ type: 'BACK_TO_LES_OPPLYSNINGER' });
        } else if (stepIndex === 1 && state.stepStatus.borSammen !== StepStatus.NotStarted) {
            dispatch({ type: 'EDIT_BOR_SAMMEN' });
        } else if (
            stepIndex === 2 &&
            state.stepStatus.lesOpplysninger === StepStatus.Done &&
            state.stepStatus.borSammen === StepStatus.Done
        ) {
            dispatch({ type: 'EDIT_CONFIRM' });
        }
    };

    function renderSkjemaSteg() {
        switch (state.activeStep) {
            case 0:
                return (
                    <LesOpplysningerForm
                        farskapserklaering={currentFarskapserklaering}
                        onSubmit={onSubmitLesOpplysninger}
                        onCancel={handleGoBack}
                    />
                );
            case 1:
                return (
                    <BorSammenForm
                        titleId="skjema.far.borSammen.title"
                        defaultBorSammen={state.formValues.borSammen.borSammen}
                        onSubmit={onSubmitBorSammenForm}
                        onCancel={handleGoBack}
                    />
                );
            case 2:
                return (
                    <FarBekreftForm
                        isPending={state.submit.pending}
                        onSubmit={onSubmit}
                        onCancel={handleGoBack}
                    />
                );
            default:
                return null;
        }
    }

    const isLesOpplysningerStepInteractive =
        state.stepStatus.lesOpplysninger !== StepStatus.NotStarted;
    const isBorSammenStepInteractive = state.stepStatus.borSammen !== StepStatus.NotStarted;
    const isConfirmStepInteractive =
        state.stepStatus.lesOpplysninger === StepStatus.Done &&
        state.stepStatus.borSammen === StepStatus.Done;

    return (
        <VStack gap="space-24">
            <FormProgress
                totalSteps={3}
                activeStep={state.activeStep + 1}
                onStepChange={handleStepChange}
            >
                <FormProgress.Step
                    completed={state.stepStatus.lesOpplysninger === StepStatus.Done ? true : false}
                    interactive={isLesOpplysningerStepInteractive}
                >
                    {getMessage(intl, 'skjema.far.lesOpplysninger.title')}
                </FormProgress.Step>
                <FormProgress.Step
                    completed={state.stepStatus.borSammen === StepStatus.Done ? true : false}
                    interactive={isBorSammenStepInteractive}
                >
                    {getMessage(intl, 'skjema.far.borSammen.title')}
                </FormProgress.Step>
                <FormProgress.Step completed={false} interactive={isConfirmStepInteractive}>
                    {getMessage(intl, 'skjema.far.confirm.title')}
                </FormProgress.Step>
            </FormProgress>
            {renderSkjemaSteg()}
            <div aria-live="polite">
                {state.submit.error && <Error error={state.submit.error} />}
            </div>
        </VStack>
    );
}

export default FarSkjema;
