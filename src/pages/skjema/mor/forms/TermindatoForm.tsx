import { Controller, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import DateInput from 'components/date-input/DateInput';
import FormButtons from 'components/form-buttons/FormButtons';
import {
    DAYS_IN_EIGHTEEN_WEEKS_PLUS_3,
    DAYS_IN_PREGNANCY,
    DAYS_IN_THREE_WEEKS,
} from 'utils/constants';
import {
    getNDaysInTheFuture,
    getNDaysInThePast,
    getWeekOfPregnancy,
    isLessThanNDaysInTheFuture,
    isLessThanNDaysInThePast,
} from 'utils/date';
import { getMessage } from 'utils/intl';
import { Heading } from '@navikt/ds-react';

import './TermindatoForm.css';

export interface TermindatoFormInput {
    termindato: string;
}

export interface TermindatoFormProps {
    defaultTermindato: string;
    onSubmit: (data: TermindatoFormInput) => void;
    onCancel: () => void;
}

function TermindatoForm(props: TermindatoFormProps) {
    const intl = useIntl();
    const { handleSubmit, control, formState: { errors } } = useForm<TermindatoFormInput>({
        defaultValues: {
            termindato: props.defaultTermindato,
        },
        shouldFocusError: false,
    });

    return (
        <form onSubmit={handleSubmit(props.onSubmit)} className="TermindatoForm">
            <fieldset className="TermindatoForm__fieldset">
                <legend>
                    <Heading level="2" size="small">{getMessage(intl, 'skjema.mor.barn.title')}</Heading>
                </legend>
                <p className="TermindatoForm__description">{getMessage(intl, 'skjema.mor.barn.description')}</p>
                <Controller
                    name="termindato"
                    control={control}
                    rules={{
                        required: getMessage(
                            intl,
                            'skjema.mor.barn.termindato.validation.required'
                        ),
                        pattern: {
                            value: /\d{4}-\d{2}-\d{2}/,
                            message: getMessage(
                                intl,
                                'skjema.mor.barn.termindato.validation.pattern'
                            ),
                        },
                        validate: {
                            minDate: (value) =>
                                isLessThanNDaysInThePast(value, DAYS_IN_THREE_WEEKS + 1) ||
                                getMessage(intl, 'skjema.mor.barn.termindato.validation.minDate'),
                            maxDate: (value) =>
                                isLessThanNDaysInTheFuture(value, DAYS_IN_PREGNANCY) ||
                                getMessage(intl, 'skjema.mor.barn.termindato.validation.maxDate'),
                            beforeWeek22: (value) =>
                                isLessThanNDaysInTheFuture(value, DAYS_IN_EIGHTEEN_WEEKS_PLUS_3) ||
                                getMessage(
                                    intl,
                                    'skjema.mor.barn.termindato.validation.beforeWeek22',
                                    { weekNr: getWeekOfPregnancy(value) }
                                ),
                        },
                    }}
                    render={({ field: { onChange, value, name } }) => (
                        <DateInput
                            id={name}
                            label={getMessage(intl, 'termindato')}
                            onChange={onChange}
                            value={value}
                            feil={errors.termindato?.message}
                            placeholder={getMessage(intl, 'form.date.placeholder')}
                            minDate={getNDaysInThePast(DAYS_IN_THREE_WEEKS)}
                            maxDate={getNDaysInTheFuture(DAYS_IN_EIGHTEEN_WEEKS_PLUS_3)}
                            showYearSelector={true}
                        />
                    )}
                />
            </fieldset>
            <FormButtons
                submitText={getMessage(intl, 'skjema.next')}
                cancelText={getMessage(intl, 'skjema.cancel')}
                onCancel={props.onCancel}
            />
        </form>
    );
}

export default TermindatoForm;
