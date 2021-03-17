import { useReducer } from 'react';
import { useIntl } from 'react-intl';

import { opprettFarskapserklaering } from 'api/api';
import Error from 'components/error/Error';
import { AlertError } from 'types/error';
import { StepStatus } from 'types/form';
import { Path } from 'types/path';
import { useNavigateTo } from 'utils/hooks/useNavigateTo';
import { useQuery } from 'utils/hooks/useQuery';
import { getMessage } from 'utils/intl';
import BorSammenForm, { BorSammenFormInput } from './forms/BorSammenForm';
import FarForm, { FarFormInput } from './forms/FarForm';
import MorBekreftForm from './forms/MorBekreftForm';
import TermindatoForm, { TermindatoFormInput } from './forms/TermindatoForm';
import BarnPresentation from './presentation/BarnPresentation';
import BorSammenPresentation from './presentation/BorSammenPresentation';
import FarPresentation from './presentation/FarPresentation';
import SkjemaStep from './SkjemaStep';

type ActionType =
    | { type: 'EDIT_TERMINDATO' }
    | { type: 'SET_TERMINDATO'; payload: TermindatoFormInput }
    | { type: 'EDIT_FAR' }
    | { type: 'SET_FAR'; payload: FarFormInput }
    | { type: 'EDIT_BOR_SAMMEN' }
    | { type: 'SET_BOR_SAMMEN'; payload: BorSammenFormInput }
    | { type: 'SUBMIT' }
    | { type: 'SUBMIT_SUCCESS' }
    | { type: 'SUBMIT_FAILURE'; payload: AlertError };

interface StateType {
    formValues: {
        termindato: TermindatoFormInput;
        far: FarFormInput;
        borSammen: BorSammenFormInput;
    };
    stepStatus: {
        barn: StepStatus;
        far: StepStatus;
        borSammen: StepStatus;
    };
    submit: {
        pending: boolean;
        error?: AlertError;
    };
}

const reducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case 'EDIT_TERMINDATO':
            return { ...state, stepStatus: { ...state.stepStatus, barn: StepStatus.Active } };
        case 'SET_TERMINDATO':
            return {
                ...state,
                formValues: {
                    ...state.formValues,
                    termindato: action.payload,
                },
                stepStatus: {
                    barn: StepStatus.Done,
                    far:
                        state.stepStatus.far === StepStatus.Done
                            ? StepStatus.Done
                            : StepStatus.Active,
                    borSammen:
                        state.stepStatus.borSammen === StepStatus.Done
                            ? StepStatus.Done
                            : state.stepStatus.far === StepStatus.Done
                            ? StepStatus.Active
                            : StepStatus.NotStarted,
                },
            };
        case 'EDIT_FAR':
            return {
                ...state,
                stepStatus: { ...state.stepStatus, far: StepStatus.Active },
            };
        case 'SET_FAR':
            return {
                ...state,
                formValues: { ...state.formValues, far: action.payload },
                stepStatus: {
                    ...state.stepStatus,
                    far: StepStatus.Done,
                    borSammen:
                        state.stepStatus.borSammen === StepStatus.Done
                            ? StepStatus.Done
                            : StepStatus.Active,
                },
            };
        case 'EDIT_BOR_SAMMEN':
            return {
                ...state,
                stepStatus: { ...state.stepStatus, borSammen: StepStatus.Active },
            };
        case 'SET_BOR_SAMMEN':
            return {
                ...state,
                formValues: { ...state.formValues, borSammen: action.payload },
                stepStatus: {
                    ...state.stepStatus,
                    borSammen: StepStatus.Done,
                },
            };
        case 'SUBMIT':
            return { ...state, submit: { pending: true, error: undefined } };
        case 'SUBMIT_SUCCESS':
            return { ...state, submit: { pending: false, error: undefined } };
        case 'SUBMIT_FAILURE':
            return { ...state, submit: { pending: false, error: action.payload } };
    }
};

function MorSkjema() {
    const query = useQuery();
    // TODO: check if foedselsnummer is correct?
    // TODO: can we use foedselsnummer in url?
    const barnFoedselsnummer = query.get('fnr');

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
            borSammen: {
                borSammen: null,
            },
        },
        stepStatus: {
            barn: barnFoedselsnummer ? StepStatus.Done : StepStatus.Active,
            far: barnFoedselsnummer ? StepStatus.Active : StepStatus.NotStarted,
            borSammen: StepStatus.NotStarted,
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
            morBorSammenMedFar: state.formValues.borSammen.borSammen === 'YES',
            opplysningerOmFar: {
                foedselsnummer: state.formValues.far.foedselsnummer,
                navn: state.formValues.far.navn,
            },
        })
            .then((response) => {
                dispatch({ type: 'SUBMIT_SUCCESS' });
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

    const onSubmitBorSammenForm = (data: BorSammenFormInput) => {
        dispatch({ type: 'SET_BOR_SAMMEN', payload: data });
    };

    const onEndreBorSammenForm = () => {
        dispatch({ type: 'EDIT_BOR_SAMMEN' });
    };

    return (
        <div className="MorSkjema">
            <SkjemaStep
                stepNumber={1}
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
            <SkjemaStep
                stepNumber={2}
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
                title={getMessage(intl, 'mor.skjema.far.title')}
                status={state.stepStatus.far}
                onChange={onEndreFarForm}
                isDisabled={state.submit.pending}
            />
            <SkjemaStep
                stepNumber={3}
                formComponent={
                    <BorSammenForm
                        defaultBorSammen={state.formValues.borSammen.borSammen}
                        onSubmit={onSubmitBorSammenForm}
                        onCancel={onCancel}
                    />
                }
                presentationComponent={
                    <BorSammenPresentation borSammen={state.formValues.borSammen.borSammen} />
                }
                title={getMessage(intl, 'mor.skjema.borSammen.title')}
                status={state.stepStatus.borSammen}
                onChange={onEndreBorSammenForm}
                isDisabled={state.submit.pending}
            />
            <SkjemaStep
                stepNumber={4}
                formComponent={
                    <MorBekreftForm
                        isPending={state.submit.pending}
                        onSubmit={onSubmit}
                        onCancel={onCancel}
                    />
                }
                title={getMessage(intl, 'mor.skjema.confirm.title')}
                status={
                    state.stepStatus.barn === StepStatus.Done &&
                    state.stepStatus.far === StepStatus.Done &&
                    state.stepStatus.borSammen === StepStatus.Done
                        ? StepStatus.Active
                        : StepStatus.NotStarted
                }
            />
            <div aria-live="polite">
                {state.submit.error && <Error error={state.submit.error} />}
            </div>
        </div>
    );
}

export default MorSkjema;
