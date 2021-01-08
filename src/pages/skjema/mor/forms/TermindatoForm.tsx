import { useIntl } from 'react-intl';
import { Controller, useForm } from 'react-hook-form';
import { SkjemaGruppe } from 'nav-frontend-skjema';

import DateInput from 'components/date-input/DateInput';
import FormButtons from 'components/form-buttons/FormButtons';
import { DAYS_IN_PREGNANCY, DAYS_IN_THREE_WEEKS, DAYS_IN_TWENTYONE_WEEKS } from 'utils/constants';
import {
    getNDaysInTheFuture,
    getNDaysInThePast,
    getWeekOfPregnancy,
    isLessThanNDaysInTheFuture,
    isLessThanNDaysInThePast,
} from 'utils/date';
import { getMessage } from 'utils/intl';

export interface TermindatoFormInput {
    termindato: string;
}

export interface TermindatoFormProps {
    defaultTermindato: string | null;
    onSubmit: (data: TermindatoFormInput) => void;
    onCancel: () => void;
}

function TermindatoForm(props: TermindatoFormProps) {
    const intl = useIntl();
    const { handleSubmit, errors, control } = useForm<TermindatoFormInput>({
        defaultValues: {
            termindato: props.defaultTermindato ?? '',
        },
        shouldFocusError: false,
    });

    return (
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <SkjemaGruppe legend={getMessage(intl, 'mor.skjema.barn.title')}>
                <Controller
                    name="termindato"
                    control={control}
                    rules={{
                        required: getMessage(
                            intl,
                            'mor.skjema.barn.form.termindato.validation.required'
                        ),
                        pattern: {
                            value: /\d{4}-\d{2}-\d{2}/,
                            message: getMessage(
                                intl,
                                'mor.skjema.barn.form.termindato.validation.pattern'
                            ),
                        },
                        validate: {
                            minDate: (value) =>
                                isLessThanNDaysInThePast(value, DAYS_IN_THREE_WEEKS + 1) ||
                                getMessage(
                                    intl,
                                    'mor.skjema.barn.form.termindato.validation.minDate'
                                ),
                            maxDate: (value) =>
                                isLessThanNDaysInTheFuture(value, DAYS_IN_PREGNANCY) ||
                                getMessage(
                                    intl,
                                    'mor.skjema.barn.form.termindato.validation.maxDate'
                                ),
                            beforeWeek22: (value) =>
                                isLessThanNDaysInTheFuture(
                                    value,
                                    DAYS_IN_PREGNANCY - DAYS_IN_TWENTYONE_WEEKS - 1
                                ) ||
                                getMessage(
                                    intl,
                                    'mor.skjema.barn.form.termindato.validation.beforeWeek22',
                                    { weekNr: getWeekOfPregnancy(value) }
                                ),
                        },
                    }}
                    render={({ onChange, value, name }) => (
                        <DateInput
                            id={name}
                            label={getMessage(intl, 'mor.skjema.barn.form.termindato.label')}
                            onChange={onChange}
                            value={value}
                            feil={errors.termindato?.message}
                            placeholder={getMessage(intl, 'form.date.placeholder')}
                            minDate={getNDaysInThePast(DAYS_IN_THREE_WEEKS)}
                            maxDate={getNDaysInTheFuture(DAYS_IN_PREGNANCY)}
                            showYearSelector={true}
                        />
                    )}
                />
            </SkjemaGruppe>
            <FormButtons
                submitText={getMessage(intl, 'mor.form.buttons.next')}
                cancelText={getMessage(intl, 'mor.form.buttons.cancel')}
                onCancel={props.onCancel}
            />
        </form>
    );
}

export default TermindatoForm;
