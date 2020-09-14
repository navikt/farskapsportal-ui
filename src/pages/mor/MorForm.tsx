import React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { useForm, Controller } from 'react-hook-form';
import { Feiloppsummering, Input, SkjemaGruppe } from 'nav-frontend-skjema';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';

import DateInput from 'components/dateInput/DateInput';
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

type Props = MorFormProps & WrappedComponentProps;

function MorForm({ intl, onSubmit, onCancel }: Props) {
    const { register, handleSubmit, errors, control } = useForm({
        defaultValues: {
            termindato: '',
            navn: '',
            foedselsnummer: '',
        },
        shouldFocusError: false,
    });
    const [feilRef, setFeiloppsummeringFocus] = useFocus();

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
                            message: getMessage(
                                intl,
                                'mor.form.termindato.validation.required'
                            ),
                        },
                        pattern: {
                            value: /^\d{4}-\d{2}-\d{2}$/,
                            message: getMessage(
                                intl,
                                'mor.form.termindato.validation.pattern'
                            ),
                        },
                    }}
                    render={({ onChange, value, name }) => (
                        <DateInput
                            id={name}
                            label={getMessage(
                                intl,
                                'mor.form.termindato.label'
                            )}
                            onChange={onChange}
                            value={value}
                            feil={
                                errors.termindato && errors.termindato.message
                            }
                            placeholder={getMessage(
                                intl,
                                'mor.form.termindato.placeholder'
                            )}
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
                    inputRef={register}
                />
                <Input
                    id="foedselsnummer"
                    name="foedselsnummer"
                    label={getMessage(intl, 'mor.form.foedselsnummer.label')}
                    bredde="M"
                    maxLength={11}
                    inputRef={register({
                        required: {
                            value: true,
                            message: getMessage(
                                intl,
                                'mor.form.foedselsnummer.validation.required'
                            ),
                        },
                        pattern: {
                            value: /^[0-9]{11}$/,
                            message: getMessage(
                                intl,
                                'mor.form.foedselsnummer.validation.pattern'
                            ),
                        },
                    })}
                    feil={
                        errors.foedselsnummer && errors.foedselsnummer.message
                    }
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

export default injectIntl(MorForm);
