import React from 'react';
import { useIntl } from 'react-intl';
import { Controller, useForm } from 'react-hook-form';
import { SkjemaGruppe } from 'nav-frontend-skjema';

import DateInput from 'components/date-input/DateInput';
import FormButtons from 'components/form-buttons/FormButtons';
import { DAYS_OF_PREGNANCY, DAYS_OF_SIXTEEN_WEEKS } from 'utils/constants';
import {
    getNDaysAhead,
    getToday,
    getWeekOfPregnancy,
    isLessThanNDaysAhead,
    isTodayOrAfter,
} from 'utils/date';
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
                        validate: {
                            minDate: (value) =>
                                isTodayOrAfter(value) ||
                                getMessage(
                                    intl,
                                    'mor.soeknad.barn.form.termindato.validation.minDate'
                                ),
                            maxDate: (value) =>
                                isLessThanNDaysAhead(value, DAYS_OF_PREGNANCY) ||
                                getMessage(
                                    intl,
                                    'mor.soeknad.barn.form.termindato.validation.maxDate'
                                ),
                            beforeWeek17: (value) =>
                                isLessThanNDaysAhead(
                                    value,
                                    DAYS_OF_PREGNANCY - DAYS_OF_SIXTEEN_WEEKS - 1
                                ) ||
                                getMessage(
                                    intl,
                                    'mor.soeknad.barn.form.termindato.validation.beforeWeek17',
                                    { weekNr: getWeekOfPregnancy(value) }
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
                            minDate={getToday()}
                            maxDate={getNDaysAhead(DAYS_OF_PREGNANCY)}
                            showYearSelector={true}
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
