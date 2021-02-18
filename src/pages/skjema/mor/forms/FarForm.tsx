import { useReducer } from 'react';
import { useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import { Feiloppsummering, Input, SkjemaGruppe } from 'nav-frontend-skjema';
import { fnr } from '@navikt/fnrvalidator';

import { controlFatherInfo } from 'api/api';
import Error from 'components/error/Error';
import FormButtons from 'components/form-buttons/FormButtons';
import { AlertError } from 'types/error';
import { mapErrors } from 'utils/form';
import { useFocus } from 'utils/hooks/useFocus';
import { getMessage } from 'utils/intl';

type FatherControlFailureType = 'NOT_FOUND' | 'FEMALE';

type ActionType =
    | { type: 'CONTROL_FATHER' }
    | { type: 'CONTROL_FATHER_FAILURE'; payload: FatherControlFailureType }
    | { type: 'API_ERROR'; payload: AlertError };

interface StateType {
    pending: boolean;
    failureType?: FatherControlFailureType;
    apiError?: AlertError;
}

const reducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case 'CONTROL_FATHER':
            return { pending: true, failureType: undefined, apiError: undefined };
        case 'CONTROL_FATHER_FAILURE':
            return { pending: false, failureType: action.payload, apiError: undefined };
        case 'API_ERROR':
            return { pending: false, failureType: undefined, apiError: action.payload };
    }
};

const getFailureTypeFromError = (error: AlertError): FatherControlFailureType =>
    error.text.startsWith('Oppgitt far er ikke mann') ? 'FEMALE' : 'NOT_FOUND';

export interface FarFormInput {
    navn: string | null;
    foedselsnummer: string | null;
}

export interface FarFormProps {
    defaultNavn: string | null;
    defaultFoedselsnummer: string | null;
    onSubmit: (data: FarFormInput) => void;
    onCancel: () => void;
}

function FarForm(props: FarFormProps) {
    const intl = useIntl();
    const [feilRef, setFeiloppsummeringFocus] = useFocus();
    const [state, dispatch] = useReducer(reducer, {
        pending: false,
        failureType: undefined,
        apiError: undefined,
    });
    const { register, handleSubmit, errors } = useForm<FarFormInput>({
        defaultValues: {
            navn: props.defaultNavn,
            foedselsnummer: props.defaultFoedselsnummer,
        },
        shouldFocusError: false,
    });

    const controlInfoAndSubmit = (data: FarFormInput) => {
        dispatch({ type: 'CONTROL_FATHER' });

        controlFatherInfo({ navn: data.navn ?? '', foedselsnummer: data.foedselsnummer ?? '' })
            .then(() => {
                props.onSubmit(data);
            })
            .catch((error: AlertError) => {
                if (error.code === 400) {
                    dispatch({
                        type: 'CONTROL_FATHER_FAILURE',
                        payload: getFailureTypeFromError(error),
                    });
                } else {
                    dispatch({ type: 'API_ERROR', payload: error });
                }
            });
    };

    const onError = () => {
        setFeiloppsummeringFocus();
    };

    const feil = mapErrors(errors, ['navn', 'foedselsnummer']);

    return (
        <form onSubmit={handleSubmit(controlInfoAndSubmit, onError)}>
            <SkjemaGruppe
                legend={getMessage(intl, 'mor.skjema.far.title')}
                feil={
                    state.failureType &&
                    getMessage(
                        intl,
                        state.failureType === 'FEMALE'
                            ? 'mor.skjema.far.form.error.female'
                            : 'mor.skjema.far.form.error'
                    )
                }
            >
                <Input
                    id="navn"
                    name="navn"
                    label={getMessage(intl, 'mor.skjema.far.form.navn.label')}
                    bredde="XXL"
                    inputRef={register({
                        required: getMessage(intl, 'mor.skjema.far.form.navn.validation.required'),
                    })}
                    feil={errors.navn?.message}
                />
                <Input
                    id="foedselsnummer"
                    name="foedselsnummer"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    inputClassName="skjemaelement__input-fodselsnr"
                    label={getMessage(intl, 'mor.skjema.far.form.foedselsnummer.label')}
                    bredde="S"
                    inputRef={register({
                        required: getMessage(
                            intl,
                            'mor.skjema.far.form.foedselsnummer.validation.required'
                        ),
                        validate: (value: string) =>
                            fnr(value).status === 'valid' ||
                            getMessage(intl, 'mor.skjema.far.form.foedselsnummer.validation.fnr'),
                    })}
                    feil={errors.foedselsnummer?.message}
                />
            </SkjemaGruppe>
            {!!feil.length && (
                <Feiloppsummering
                    tittel={getMessage(intl, 'form.feiloppsummering')}
                    feil={feil}
                    innerRef={feilRef}
                />
            )}
            <FormButtons
                submitText={getMessage(intl, 'mor.form.buttons.next')}
                cancelText={getMessage(intl, 'mor.form.buttons.cancel')}
                onCancel={props.onCancel}
                submitSpinner={state.pending}
            />
            <div aria-live="polite">{state.apiError && <Error error={state.apiError} />}</div>
        </form>
    );
}

export default FarForm;
