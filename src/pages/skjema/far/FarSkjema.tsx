import { useReducer } from 'react';
import { useIntl } from 'react-intl';

import { oppdaterFarskapserklaering } from 'api/api';
import Error from 'components/error/Error';
import { AlertError } from 'types/error';
import { StepStatus } from 'types/form';
import { Path } from 'types/path';
import { UserInfo } from 'types/user';
import { useNavigateTo } from 'utils/hooks/useNavigateTo';
import { useQuery } from 'utils/hooks/useQuery';
import { getMessage } from 'utils/intl';
import BorSammenForm, { BorSammenFormInput } from '../common/BorSammenForm';
import BorSammenPresentation from '../common/BorSammenPresentation';
import SkjemaStep from '../common/SkjemaStep';
import FarBekreftForm from './FarBekreftForm';
import LesOpplysningerForm from './LesOpplysningerForm';
import LesOpplysningerPresentation from './LesOpplysningerPresentation';

import './FarSkjema.less';

type ActionType =
    | { type: 'SET_LES_OPPLYSNINGER' }
    | { type: 'EDIT_BOR_SAMMEN' }
    | { type: 'SET_BOR_SAMMEN'; payload: BorSammenFormInput }
    | { type: 'SUBMIT' }
    | { type: 'SUBMIT_SUCCESS' }
    | { type: 'SUBMIT_FAILURE'; payload: AlertError };

interface StateType {
    formValues: {
        borSammen: BorSammenFormInput;
    };
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
                stepStatus: { lesOpplysninger: StepStatus.Done, borSammen: StepStatus.Active },
            };
        case 'EDIT_BOR_SAMMEN':
            return { ...state, stepStatus: { ...state.stepStatus, borSammen: StepStatus.Active } };
        case 'SET_BOR_SAMMEN':
            return {
                ...state,
                formValues: { borSammen: action.payload },
                stepStatus: { ...state.stepStatus, borSammen: StepStatus.Done },
            };
        case 'SUBMIT':
            return { ...state, submit: { pending: true, error: undefined } };
        case 'SUBMIT_SUCCESS':
            return { ...state, submit: { pending: false, error: undefined } };
        case 'SUBMIT_FAILURE':
            return { ...state, submit: { pending: false, error: action.payload } };
    }
};

interface FarSkjemaProps {
    userInfo: UserInfo;
}

function FarSkjema({ userInfo }: FarSkjemaProps) {
    const intl = useIntl();
    const navigateTo = useNavigateTo();
    const id = useQuery().get('id');

    const [state, dispatch] = useReducer(reducer, {
        formValues: {
            borSammen: {
                borSammen: null,
            },
        },
        stepStatus: {
            lesOpplysninger: StepStatus.Active,
            borSammen: StepStatus.NotStarted,
        },
        submit: {
            pending: false,
            error: undefined,
        },
    });

    if (!id) {
        // TODO: handle missing id
        return null;
    }

    const farskapserklaering = userInfo.avventerSigneringBruker?.find(
        (erklaering) => erklaering.idFarskapserklaering === parseInt(id)
    );

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
            idFarskapserklaering: parseInt(id),
        })
            .then((response) => {
                dispatch({ type: 'SUBMIT_SUCCESS' });
                window.location.assign(
                    response.oppdatertFarskapserklaeringDto.dokument?.redirectUrlFar ?? ''
                ); // TODO: hva er riktig her?
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
        <div>
            <SkjemaStep
                stepNumber={1}
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
            <SkjemaStep
                stepNumber={2}
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
            <SkjemaStep
                stepNumber={3}
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
            <div aria-live="polite">
                {state.submit.error && <Error error={state.submit.error} />}
            </div>
        </div>
    );
}

export default FarSkjema;
