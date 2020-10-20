import React from 'react';
import { useIntl } from 'react-intl';
import { Controller, useForm } from 'react-hook-form';
import { SkjemaGruppe } from 'nav-frontend-skjema';

import DateInput from 'components/date-input/DateInput';
import FormButtons from 'components/form-buttons/FormButtons';
import { getMessage } from 'utils/intl';

export interface BarnFormInput {
    termindato: string;
}

interface BarnFormProps {
    defaultTermindato: string;
    onSubmit: (data: BarnFormInput) => void;
    onCancel: () => void;
}

function BarnForm({ defaultTermindato, onSubmit, onCancel }: BarnFormProps) {
    const intl = useIntl();
    const { handleSubmit, errors, control } = useForm<BarnFormInput>({
        defaultValues: {
            termindato: defaultTermindato,
        },
        shouldFocusError: false,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <SkjemaGruppe legend={getMessage(intl, 'mor.soeknad.barn.title')}>
                <Controller
                    name="termindato"
                    control={control}
                    rules={{
                        required: getMessage(
                            intl,
                            'mor.soeknad.barn.form.termindato.validation.required'
                        ),
                        pattern: {
                            value: /\d{4}-\d{2}-\d{2}/,
                            message: getMessage(
                                intl,
                                'mor.soeknad.barn.form.termindato.validation.pattern'
                            ),
                        },
                    }}
                    render={({ onChange, value, name }) => (
                        <DateInput
                            id={name}
                            label={getMessage(intl, 'mor.soeknad.barn.form.termindato.label')}
                            onChange={onChange}
                            value={value}
                            feil={errors.termindato?.message}
                            placeholder={getMessage(intl, 'form.date.placeholder')}
                        />
                    )}
                />
            </SkjemaGruppe>
            <FormButtons
                submitText={getMessage(intl, 'mor.form.buttons.next')}
                cancelText={getMessage(intl, 'mor.form.buttons.cancel')}
                onCancel={onCancel}
            />
        </form>
    );
}

export default BarnForm;
