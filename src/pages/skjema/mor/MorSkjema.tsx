import { useReducer } from 'react';
import { useIntl } from 'react-intl';

import { opprettFarskapserklaering } from 'api/api';
import Error from 'components/error/Error';
import { KontrollerePersonopplysningerRequest, OppretteFarskaperklaeringRequest } from 'types/api';
import { Barn } from 'types/barn';
import { AlertError } from 'types/error';
import { StepStatus } from 'types/form';
import { Path } from 'types/path';
import { useNavigateTo } from 'utils/hooks/useNavigateTo';
import { useQuery } from 'utils/hooks/useQuery';
import { getMessage } from 'utils/intl';
import MorBekreftForm from './forms/MorBekreftForm';
import FarForm, { FarFormInput } from './forms/FarForm';
import TermindatoForm, { TermindatoFormInput } from './forms/TermindatoForm';
import BarnPresentation from './presentation/BarnPresentation';
import FarPresentation from './presentation/FarPresentation';
import SkjemaStep from './SkjemaStep';

type ActionType =
    | { type: 'EDIT_BARN' }
    | { type: 'SET_BARN'; payload: Barn }
    | { type: 'EDIT_FAR' }
    | { type: 'SET_FAR'; payload: KontrollerePersonopplysningerRequest }
    | { type: 'SUBMIT' }
    | { type: 'SUBMIT_SUCCESS' }
    | { type: 'SUBMIT_FAILURE'; payload: AlertError };

interface StateType {
    erklaering: OppretteFarskaperklaeringRequest;
    stepStatus: {
        barn: StepStatus;
        far: StepStatus;
    };
    submit: {
        pending: boolean;
        error?: AlertError;
    };
}

const reducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case 'EDIT_BARN':
            return { ...state, stepStatus: { ...state.stepStatus, barn: StepStatus.Active } };
        case 'SET_BARN':
            return {
                ...state,
                erklaering: {
                    ...state.erklaering,
                    barn: action.payload,
                },
                stepStatus: {
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
                stepStatus: { ...state.stepStatus, far: StepStatus.Active },
            };
        case 'SET_FAR':
            return {
                ...state,
                erklaering: { ...state.erklaering, opplysningerOmFar: action.payload },
                stepStatus: {
                    ...state.stepStatus,
                    far: StepStatus.Done,
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
        erklaering: {
            barn: {
                termindato: null,
                foedselsnummer: barnFoedselsnummer,
            },
            opplysningerOmFar: {
                foedselsnummer: '',
                navn: '',
            },
        },
        stepStatus: {
            barn: barnFoedselsnummer ? StepStatus.Done : StepStatus.Active,
            far: barnFoedselsnummer ? StepStatus.Active : StepStatus.NotStarted,
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

        opprettFarskapserklaering(state.erklaering)
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
            type: 'SET_BARN',
            payload: { foedselsnummer: null, termindato: data.termindato },
        });
    };

    const onEndreBarnForm = () => {
        dispatch({ type: 'EDIT_BARN' });
    };

    const onSubmitFarForm = (data: FarFormInput) => {
        dispatch({ type: 'SET_FAR', payload: data });
    };

    const onEndreFarForm = () => {
        dispatch({ type: 'EDIT_FAR' });
    };

    return (
        <div className="MorSkjema">
            <SkjemaStep
                stepNumber={1}
                formComponent={
                    <TermindatoForm
                        defaultTermindato={state.erklaering.barn.termindato}
                        onSubmit={onSubmitTermindatoForm}
                        onCancel={onCancel}
                    />
                }
                presentationComponent={
                    <BarnPresentation
                        foedselsnummer={state.erklaering.barn.foedselsnummer}
                        termindato={state.erklaering.barn.termindato}
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
                        defaultNavn={state.erklaering.opplysningerOmFar.navn}
                        defaultFoedselsnummer={state.erklaering.opplysningerOmFar.foedselsnummer}
                        onSubmit={onSubmitFarForm}
                        onCancel={onCancel}
                    />
                }
                presentationComponent={
                    <FarPresentation
                        navn={state.erklaering.opplysningerOmFar.navn}
                        foedselsnummer={state.erklaering.opplysningerOmFar.foedselsnummer}
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
                    <MorBekreftForm
                        isPending={state.submit.pending}
                        onSubmit={onSubmit}
                        onCancel={onCancel}
                    />
                }
                title={getMessage(intl, 'mor.skjema.confirm.title')}
                status={
                    state.stepStatus.barn === StepStatus.Done &&
                    state.stepStatus.far === StepStatus.Done
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
