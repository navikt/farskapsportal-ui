import { TextField } from '@navikt/ds-react';
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
    return (
        <TextField
            id={props.id}
            type={"date" as never}
            label={props.label}
            value={props.value ?? ''}
            onChange={(e) => props.onChange(e.target.value || undefined)}
            error={props.feil as string | undefined}
            min={props.minDate}
            max={props.maxDate}
            className={props.className}
        />
    );
}

export default DateInput;
