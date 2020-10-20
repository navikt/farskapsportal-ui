import React, { ReactNode } from 'react';
import { Datepicker } from 'nav-datovelger';
import {
    Label,
    SkjemaelementFeilmelding,
    SkjemaGruppeFeilContext,
    SkjemaGruppeFeilContextProps,
} from 'nav-frontend-skjema';
import cls from 'classnames';
import 'moment/locale/nb';

import { useStore } from 'store/Context';

interface DateInputProps {
    id: string;
    className?: string;
    label: string;
    value?: string;
    onChange: (date?: string) => void;
    feil?: ReactNode;
    placeholder?: string;
}

function DateInput(props: DateInputProps) {
    const [{ language }] = useStore();

    return (
        <SkjemaGruppeFeilContext.Consumer>
            {(context: SkjemaGruppeFeilContextProps) => {
                const feilmelding = context.feil || props.feil;

                return (
                    <div className={cls('skjemaelement', props.className)}>
                        <Label htmlFor={props.id}>{props.label}</Label>
                        <Datepicker
                            inputId={props.id}
                            onChange={props.onChange}
                            value={props.value}
                            locale={language}
                            inputProps={{
                                name: props.id,
                                placeholder: props.placeholder,
                                'aria-invalid': !!feilmelding,
                                pattern: undefined,
                            }}
                        />
                        {!context.feil && props.feil && (
                            <SkjemaelementFeilmelding>
                                {typeof feilmelding !== 'boolean' && feilmelding}
                            </SkjemaelementFeilmelding>
                        )}
                    </div>
                );
            }}
        </SkjemaGruppeFeilContext.Consumer>
    );
}

export default DateInput;
