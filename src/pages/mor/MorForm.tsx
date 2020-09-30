import React from 'react';
import { useIntl } from 'react-intl';
import { useForm, Controller } from 'react-hook-form';
import { Feiloppsummering, FnrInput, Input, SkjemaGruppe } from 'nav-frontend-skjema';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';

import DateInput from 'components/date-input/DateInput';
import { mapErrors } from 'utils/form';
import { useFocus } from 'utils/hooks';
import { getMessage } from 'utils/intl';

import './MorForm.less';

export interface FormInput {
    termindato: string;
    navn: string;
    foedselsnummer: string;
}

interface MorFormProps {
    onSubmit: (data: FormInput) => void;
    onCancel: () => void;
}

function MorForm({ onSubmit, onCancel }: MorFormProps) {
    const intl = useIntl();
    const [feilRef, setFeiloppsummeringFocus] = useFocus();
    const { register, handleSubmit, errors, control, setError, formState } = useForm({
        defaultValues: {
            termindato: '',
            navn: '',
            foedselsnummer: '',
        },
        shouldFocusError: false,
    });
    const { isSubmitted } = formState;

    const onError = () => {
        setFeiloppsummeringFocus();
    };

    const feil = mapErrors(errors, ['termindato', 'navn', 'foedselsnummer']);

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)} className="MorForm">
            <SkjemaGruppe legend={getMessage(intl, 'mor.form.barn.legend')}>
                <Controller
                    name="termindato"
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: getMessage(intl, 'mor.form.termindato.validation.required'),
                        },
                    }}
                    render={({ onChange, value, name }) => (
                        <DateInput
                            id={name}
                            label={getMessage(intl, 'mor.form.termindato.label')}
                            onChange={onChange}
                            value={value}
                            feil={errors.termindato && errors.termindato.message}
                            placeholder={getMessage(intl, 'mor.form.termindato.placeholder')}
                        />
                    )}
                />
            </SkjemaGruppe>
            <SkjemaGruppe legend={getMessage(intl, 'mor.form.far.legend')}>
                <Input
                    id="navn"
                    name="navn"
                    label={getMessage(intl, 'mor.form.navn.label')}
                    bredde="XXL"
                    inputRef={register({
                        required: {
                            value: true,
                            message: getMessage(intl, 'mor.form.navn.validation.required'),
                        },
                    })}
                    feil={errors.navn && errors.navn.message}
                />
                <FnrInput
                    id="foedselsnummer"
                    name="foedselsnummer"
                    label={getMessage(intl, 'mor.form.foedselsnummer.label')}
                    bredde="S"
                    inputRef={register({
                        required: {
                            value: true,
                            message: getMessage(
                                intl,
                                'mor.form.foedselsnummer.validation.required'
                            ),
                        },
                    })}
                    onValidate={(isValid) => {
                        if (isSubmitted && !isValid) {
                            setError('foedselsnummer', {
                                type: 'fnr',
                                message: getMessage(intl, 'mor.form.foedselsnummer.validation.fnr'),
                            });
                        }
                    }}
                    feil={errors.foedselsnummer && errors.foedselsnummer.message}
                />
            </SkjemaGruppe>
            {!!feil.length && (
                <Feiloppsummering
                    tittel={getMessage(intl, 'mor.form.feiloppsummering')}
                    feil={feil}
                    innerRef={feilRef}
                />
            )}
            <div className="MorForm__buttons">
                <Hovedknapp htmlType="submit">
                    {getMessage(intl, 'mor.form.buttons.submit')}
                </Hovedknapp>
                <Knapp htmlType="button" onClick={onCancel}>
                    {getMessage(intl, 'mor.form.buttons.cancel')}
                </Knapp>
            </div>
        </form>
    );
}

export default MorForm;
