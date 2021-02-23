import { fnr } from '@navikt/fnrvalidator';
import { Feiloppsummering, Input, SkjemaGruppe } from 'nav-frontend-skjema';
import { useReducer } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { controlFatherInfo } from 'api/api';
import Error from 'components/error/Error';
import FormButtons from 'components/form-buttons/FormButtons';
import { KontrollerePersonopplysningerRequest } from 'types/api';
import { AlertError } from 'types/error';
import { formatFoedselsnummer } from 'utils/foedselsnummer';
import { mapErrors } from 'utils/form';
import { useFocus } from 'utils/hooks/useFocus';
import { getMessage } from 'utils/intl';
import { removeWhitespace } from 'utils/string';

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
    navn: string;
    foedselsnummer: string;
}

export interface FarFormProps {
    defaultNavn: string;
    defaultFoedselsnummer: string;
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
    const { control, register, handleSubmit, errors } = useForm<FarFormInput>({
        defaultValues: {
            navn: props.defaultNavn,
            foedselsnummer: props.defaultFoedselsnummer,
        },
        shouldFocusError: false,
    });

    const controlInfoAndSubmit = (inputValues: FarFormInput) => {
        dispatch({ type: 'CONTROL_FATHER' });

        const data: KontrollerePersonopplysningerRequest = {
            navn: inputValues.navn,
            foedselsnummer: removeWhitespace(inputValues.foedselsnummer),
        };

        controlFatherInfo(data)
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
                <Controller
                    name="foedselsnummer"
                    control={control}
                    rules={{
                        required: getMessage(
                            intl,
                            'mor.skjema.far.form.foedselsnummer.validation.required'
                        ),
                        validate: (value: string) => {
                            return (
                                fnr(removeWhitespace(value)).status === 'valid' ||
                                getMessage(
                                    intl,
                                    'mor.skjema.far.form.foedselsnummer.validation.fnr'
                                )
                            );
                        },
                    }}
                    render={({ onChange, value, name }) => (
                        <Input
                            id={name}
                            name={name}
                            label={getMessage(intl, 'mor.skjema.far.form.foedselsnummer.label')}
                            value={value}
                            onChange={(e) => onChange(formatFoedselsnummer(e.target.value))}
                            feil={errors.foedselsnummer?.message}
                            inputClassName="skjemaelement__input-fodselsnr"
                            bredde="S"
                            type="text"
                            inputMode="numeric"
                        />
                    )}
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
