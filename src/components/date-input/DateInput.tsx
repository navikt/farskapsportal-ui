import { DatePicker, useDatepicker } from '@navikt/ds-react';
import { formatISO, parseISO } from 'date-fns';
import { ReactNode } from 'react';

interface DateInputProps {
    id: string;
    className?: string;
    label: string;
    value?: string;
    onChange: (date?: string) => void;
    feil?: ReactNode;
    placeholder?: string;
    minDate?: string;
    maxDate?: string;
    showYearSelector?: boolean;
}

function DateInput(props: DateInputProps) {
    const selectedDate = props.value ? parseISO(props.value) : undefined;
    const fromDate = props.minDate ? parseISO(props.minDate) : undefined;
    const toDate = props.maxDate ? parseISO(props.maxDate) : undefined;

    const { datepickerProps, inputProps } = useDatepicker({
        defaultSelected: selectedDate,
        fromDate,
        toDate,
        onDateChange: (date) =>
            props.onChange(date ? formatISO(date, { representation: 'date' }) : undefined),
    });

    return (
        <DatePicker {...datepickerProps} dropdownCaption={props.showYearSelector}>
            <DatePicker.Input
                {...inputProps}
                id={props.id}
                label={props.label}
                placeholder={props.placeholder}
                error={props.feil}
                className={props.className}
            />
        </DatePicker>
    );
}

export default DateInput;
