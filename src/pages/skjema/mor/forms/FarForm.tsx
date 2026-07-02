import { ErrorSummary, Heading, TextField, VStack } from '@navikt/ds-react';
import { useReducer } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { controlFatherInfo } from 'api/api';
import Error from 'components/error/Error';
import FormButtons from 'components/form-buttons/FormButtons';
import { KontrollerePersonopplysningerRequest } from 'types/api';
import { AlertError } from 'types/error';
import { Feilkode } from 'types/feilkode';
import { isControlFatherValidationError } from 'utils/feilkoder';
import { formatFoedselsnummer } from 'utils/foedselsnummer';
import { mapErrors } from 'utils/form';
import { useFocus } from 'utils/hooks/useFocus';
import { getMessage } from 'utils/intl';
import { removeWhitespace } from 'utils/string';
import FarFormValidationError from './FarFormValidationError';
import FarFormValidationResterendeForsoek from './FarFormValidationResterendeForsoek';

type ActionType =
    | { type: 'CONTROL_FATHER' }
    | {
          type: 'CONTROL_FATHER_FAILURE';
          payload: {
              feilkode: Feilkode | null;
              antallResterendeForsoek: number | null;
              tidspunktForNullstillingAvForsoek: string | null;
          };
      }
    | { type: 'API_ERROR'; payload: AlertError };

interface StateType {
    pending: boolean;
    feilkode?: Feilkode | null;
    antallResterendeForsoek?: number | null;
    tidspunktForNullstillingAvForsoek?: string | null;
    apiError?: AlertError;
}

const reducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case 'CONTROL_FATHER':
            return { pending: true, feilkode: undefined, apiError: undefined };
        case 'CONTROL_FATHER_FAILURE':
            return {
                pending: false,
                feilkode: action.payload.feilkode,
                antallResterendeForsoek: action.payload.antallResterendeForsoek,
                tidspunktForNullstillingAvForsoek: action.payload.tidspunktForNullstillingAvForsoek,
                apiError: undefined,
            };
        case 'API_ERROR':
            return { pending: false, feilkode: undefined, apiError: action.payload };
    }
};

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
        feilkode: undefined,
        antallResterendeForsoek: undefined,
        tidspunktForNullstillingAvForsoek: undefined,
        apiError: undefined,
    });
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FarFormInput>({
        mode: 'onSubmit',
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
                if (error.feilkode && isControlFatherValidationError(error)) {
                    dispatch({
                        type: 'CONTROL_FATHER_FAILURE',
                        payload: {
                            feilkode: error.feilkode,
                            antallResterendeForsoek: error.antallResterendeForsoek,
                            tidspunktForNullstillingAvForsoek:
                                error.tidspunktForNullstillingAvForsoek,
                        },
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
    const stateError = !state.pending && state.feilkode;

    return (
        <form onSubmit={handleSubmit(controlInfoAndSubmit, onError)}>
            <Heading level="2" size="medium" spacing>
                {getMessage(intl, 'skjema.mor.far.title')}
            </Heading>
            <VStack gap="space-16">
                <TextField
                    style={{ maxWidth: '42ch' }}
                    id="navn"
                    label={getMessage(intl, 'skjema.mor.far.navn.label')}
                    description={
                        <>
                            <FormattedMessage id="skjema.mor.far.navn.description.1" />
                            <br />
                            <FormattedMessage id="skjema.mor.far.navn.description.2" />
                        </>
                    }
                    error={errors.navn?.message}
                    aria-describedby={errors.navn ? 'navn-error' : undefined}
                    {...register('navn', {
                        required: getMessage(intl, 'skjema.mor.far.navn.validation.required'),
                    })}
                />

                <Controller
                    name="foedselsnummer"
                    control={control}
                    rules={{
                        required: getMessage(
                            intl,
                            'skjema.mor.far.foedselsnummer.validation.required',
                        ),
                        validate: (value: string) => {
                            const cleaned = removeWhitespace(value);
                            if (cleaned.length !== 11) {
                                return getMessage(
                                    intl,
                                    'skjema.mor.far.foedselsnummer.validation.fnr',
                                );
                            }
                            if (!/^\d{11}$/.test(cleaned)) {
                                return getMessage(
                                    intl,
                                    'skjema.mor.far.foedselsnummer.validation.fnr',
                                );
                            }
                            return true;
                        },
                    }}
                    render={({ field: { onChange, value, name } }) => (
                        <TextField
                            style={{ maxWidth: '16ch' }}
                            id={name}
                            label={getMessage(intl, 'skjema.mor.far.foedselsnummer.label')}
                            value={value}
                            onChange={(e) => onChange(formatFoedselsnummer(e.target.value))}
                            error={errors.foedselsnummer?.message || (stateError ? ' ' : undefined)}
                            inputMode="numeric"
                            type="text"
                            aria-describedby={errors.foedselsnummer ? `${name}-error` : undefined}
                        />
                    )}
                />
                {!state.pending && state.feilkode && (
                    <FarFormValidationError
                        id="far-form-validation-error"
                        feilkode={state.feilkode}
                        antallResterendeForsoek={state.antallResterendeForsoek}
                        tidspunktForNullstillingAvForsoek={state.tidspunktForNullstillingAvForsoek}
                    />
                )}
                <div aria-live="polite">
                    {!state.pending && (
                        <FarFormValidationResterendeForsoek
                            antallResterendeForsoek={state.antallResterendeForsoek}
                        />
                    )}
                </div>
                {!!feil.length && (
                    <ErrorSummary ref={feilRef} heading={getMessage(intl, 'form.feiloppsummering')}>
                        {feil.map((f) => (
                            <ErrorSummary.Item
                                key={f.skjemaelementId}
                                href={`#${f.skjemaelementId}`}
                            >
                                {f.feilmelding}
                            </ErrorSummary.Item>
                        ))}
                    </ErrorSummary>
                )}
                {state.apiError && <Error ariaLive="polite" error={state.apiError} />}
                <FormButtons
                    submitText={getMessage(intl, 'skjema.next')}
                    cancelText={getMessage(intl, 'skjema.cancel')}
                    onCancel={props.onCancel}
                    submitSpinner={state.pending}
                />
            </VStack>
        </form>
    );
}

export default FarForm;
