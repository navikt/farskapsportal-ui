import { Feiloppsummering, Input, SkjemaGruppe } from 'nav-frontend-skjema';
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
import { Systemtittel } from 'nav-frontend-typografi';

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
            <SkjemaGruppe
                legend={<Systemtittel>{getMessage(intl, 'skjema.mor.far.title')}</Systemtittel>}
                feil={
                    !state.pending &&
                    state.feilkode && (
                        <FarFormValidationError
                            id="far-form-validation-error"
                            feilkode={state.feilkode}
                            antallResterendeForsoek={state.antallResterendeForsoek}
                            tidspunktForNullstillingAvForsoek={
                                state.tidspunktForNullstillingAvForsoek
                            }
                        />
                    )
                }
                utenFeilPropagering
            >
                <Input
                    id="navn"
                    name="navn"
                    label={getMessage(intl, 'skjema.mor.far.navn.label')}
                    description={
                        <>
                            <FormattedMessage id="skjema.mor.far.navn.description.1" />
                            <br />
                            <FormattedMessage id="skjema.mor.far.navn.description.2" />
                        </>
                    }
                    bredde="XXL"
                    inputRef={register({
                        required: getMessage(intl, 'skjema.mor.far.navn.validation.required'),
                    })}
                    feil={errors.navn?.message || !!stateError}
                />

                <Controller
                    name="foedselsnummer"
                    control={control}
                    rules={{
                        required: getMessage(
                            intl,
                            'skjema.mor.far.foedselsnummer.validation.required'
                        ),
                        validate: (value: string) => {
                            return (
                                /^\d{11}$/.test(removeWhitespace(value)) ||
                                getMessage(intl, 'skjema.mor.far.foedselsnummer.validation.fnr')
                            );
                        },
                    }}
                    render={({ onChange, value, name }) => (
                        <Input
                            id={name}
                            name={name}
                            label={getMessage(intl, 'skjema.mor.far.foedselsnummer.label')}
                            value={value}
                            onChange={(e) => onChange(formatFoedselsnummer(e.target.value))}
                            feil={errors.foedselsnummer?.message || !!stateError}
                            inputClassName="skjemaelement__input-fodselsnr"
                            bredde="S"
                            type="text"
                            inputMode="numeric"
                        />
                    )}
                />
            </SkjemaGruppe>

            <div aria-live="polite">
                {!state.pending && (
                    <FarFormValidationResterendeForsoek
                        antallResterendeForsoek={state.antallResterendeForsoek}
                    />
                )}
            </div>

            {!!feil.length && (
                <Feiloppsummering
                    tittel={getMessage(intl, 'form.feiloppsummering')}
                    feil={feil}
                    innerRef={feilRef}
                />
            )}
            <div aria-live="polite">{state.apiError && <Error error={state.apiError} />}</div>
            <FormButtons
                submitText={getMessage(intl, 'skjema.next')}
                cancelText={getMessage(intl, 'skjema.cancel')}
                onCancel={props.onCancel}
                submitSpinner={state.pending}
            />
        </form>
    );
}

export default FarForm;
