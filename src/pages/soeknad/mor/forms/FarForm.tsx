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
import { useFocus } from 'utils/hooks';
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
    navn: string;
    foedselsnummer: string;
}

export interface FarFormProps {
    defaultNavn: string;
    defaultFoedselsnummer: string;
    onSubmit: (data: FarFormInput) => void;
    onCancel: () => void;
}

function FarForm({ defaultNavn, defaultFoedselsnummer, onSubmit, onCancel }: FarFormProps) {
    const intl = useIntl();
    const [feilRef, setFeiloppsummeringFocus] = useFocus();
    const [state, dispatch] = useReducer(reducer, {
        pending: false,
        failureType: undefined,
        apiError: undefined,
    });
    const { register, handleSubmit, errors } = useForm<FarFormInput>({
        defaultValues: {
            navn: defaultNavn,
            foedselsnummer: defaultFoedselsnummer,
        },
        shouldFocusError: false,
    });

    const controlInfoAndSubmit = (data: FarFormInput) => {
        dispatch({ type: 'CONTROL_FATHER' });

        controlFatherInfo(data)
            .then(() => {
                onSubmit(data);
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
                legend={getMessage(intl, 'mor.soeknad.far.title')}
                feil={
                    state.failureType &&
                    getMessage(
                        intl,
                        state.failureType === 'FEMALE'
                            ? 'mor.soeknad.far.form.error.female'
                            : 'mor.soeknad.far.form.error'
                    )
                }
            >
                <Input
                    id="navn"
                    name="navn"
                    label={getMessage(intl, 'mor.soeknad.far.form.navn.label')}
                    bredde="XXL"
                    inputRef={register({
                        required: getMessage(intl, 'mor.soeknad.far.form.navn.validation.required'),
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
                    label={getMessage(intl, 'mor.soeknad.far.form.foedselsnummer.label')}
                    bredde="S"
                    inputRef={register({
                        required: getMessage(
                            intl,
                            'mor.soeknad.far.form.foedselsnummer.validation.required'
                        ),
                        validate: (value: string) =>
                            fnr(value).status === 'valid' ||
                            getMessage(intl, 'mor.soeknad.far.form.foedselsnummer.validation.fnr'),
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
                onCancel={onCancel}
                submitSpinner={state.pending}
            />
            {state.apiError && <Error error={state.apiError} />}
        </form>
    );
}

export default FarForm;
