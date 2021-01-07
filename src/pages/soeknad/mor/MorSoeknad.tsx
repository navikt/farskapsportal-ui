import { useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { Innholdstittel } from 'nav-frontend-typografi';

import { opprettFarskapserklaering } from 'api/api';
import Error from 'components/error/Error';
import { OutboundFather, OutboundOpprettFarskapserklaering } from 'types/api';
import { Barn } from 'types/barn';
import { AlertError } from 'types/error';
import { StepStatus } from 'types/form';
import { Path } from 'types/path';
import { getMessage } from 'utils/intl';
import BekreftForm from './forms/BekreftForm';
import FarForm, { FarFormInput } from './forms/FarForm';
import SelectBarnForm, { SelectBarnFormInput } from './forms/SelectBarnForm';
import TermindatoForm, { TermindatoFormInput } from './forms/TermindatoForm';
import BarnPresentation from './presentation/BarnPresentation';
import FarPresentation from './presentation/FarPresentation';
import SoeknadStep from './SoeknadStep';

import './MorSoeknad.less';

type ActionType =
    | { type: 'EDIT_BARN' }
    | { type: 'SET_BARN'; payload: Barn }
    | { type: 'EDIT_FAR' }
    | { type: 'SET_FAR'; payload: OutboundFather }
    | { type: 'SUBMIT' }
    | { type: 'SUBMIT_SUCCESS' }
    | { type: 'SUBMIT_FAILURE'; payload: AlertError };

interface StateType {
    erklaering: OutboundOpprettFarskapserklaering;
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

interface MorSoeknadProps {
    barn: string[] | null;
}

function MorSoeknad(props: MorSoeknadProps) {
    const singleChildFoedselsnummer = props.barn?.length === 1 ? props.barn[0] : undefined;

    const intl = useIntl();
    const history = useHistory();

    const [state, dispatch] = useReducer(reducer, {
        erklaering: {
            barn: {
                termindato: null,
                foedselsnummer: singleChildFoedselsnummer ?? null,
            },
            opplysningerOmFar: {
                foedselsnummer: '',
                navn: '',
            },
        },
        stepStatus: {
            barn: singleChildFoedselsnummer ? StepStatus.Done : StepStatus.Active,
            far: singleChildFoedselsnummer ? StepStatus.Active : StepStatus.NotStarted,
        },
        submit: {
            pending: false,
            error: undefined,
        },
    });

    const onCancel = () => history.push(Path.Oversikt);

    const onSubmit = () => {
        dispatch({ type: 'SUBMIT' });

        opprettFarskapserklaering(state.erklaering)
            .then((response) => {
                alert(JSON.stringify(response));
                dispatch({ type: 'SUBMIT_SUCCESS' });
                // Hent redirect til e-signering fra response og utfør redirect
            })
            .catch((error: AlertError) => {
                dispatch({ type: 'SUBMIT_FAILURE', payload: error });
            });
    };

    const onSubmitSelectBarnForm = (data: SelectBarnFormInput) => {
        dispatch({
            type: 'SET_BARN',
            payload: { foedselsnummer: data.foedselsnummer, termindato: null },
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
        <div className="MorSoeknad">
            <Innholdstittel tag="h2">
                <FormattedMessage id="mor.title" />
            </Innholdstittel>
            <SoeknadStep
                stepNumber={1}
                formComponent={
                    props.barn?.length ? (
                        <SelectBarnForm
                            defaultFoedselsnummer={state.erklaering.barn.foedselsnummer}
                            barn={props.barn}
                            onSubmit={onSubmitSelectBarnForm}
                            onCancel={onCancel}
                        />
                    ) : (
                        <TermindatoForm
                            defaultTermindato={state.erklaering.barn.termindato}
                            onSubmit={onSubmitTermindatoForm}
                            onCancel={onCancel}
                        />
                    )
                }
                presentationComponent={
                    <BarnPresentation
                        isSingleChild={!!singleChildFoedselsnummer}
                        foedselsnummer={state.erklaering.barn.foedselsnummer}
                        termindato={state.erklaering.barn.termindato}
                    />
                }
                status={state.stepStatus.barn}
                onChange={singleChildFoedselsnummer ? undefined : onEndreBarnForm}
                isDisabled={state.submit.pending}
            />
            <SoeknadStep
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
                title={getMessage(intl, 'mor.soeknad.far.title')}
                status={state.stepStatus.far}
                onChange={onEndreFarForm}
                isDisabled={state.submit.pending}
            />
            <SoeknadStep
                stepNumber={3}
                formComponent={
                    <BekreftForm
                        isPending={state.submit.pending}
                        onSubmit={onSubmit}
                        onCancel={onCancel}
                    />
                }
                title={getMessage(intl, 'mor.soeknad.confirm.title')}
                status={
                    state.stepStatus.barn === StepStatus.Done &&
                    state.stepStatus.far === StepStatus.Done
                        ? StepStatus.Active
                        : StepStatus.NotStarted
                }
            />
            {state.submit.error && <Error error={state.submit.error} />}
        </div>
    );
}

export default MorSoeknad;
