import React, { ReactNode } from 'react';
import { Datovelger } from 'nav-datovelger';
import {
    Label,
    SkjemaelementFeilmelding,
    SkjemaGruppeFeilContext,
    SkjemaGruppeFeilContextProps,
} from 'nav-frontend-skjema';
import cls from 'classnames';

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
    return (
        <SkjemaGruppeFeilContext.Consumer>
            {(context: SkjemaGruppeFeilContextProps) => {
                const feilmelding = context.feil || props.feil;

                return (
                    <div className={cls('skjemaelement', props.className)}>
                        <Label htmlFor={props.id}>{props.label}</Label>
                        <Datovelger
                            id={props.id}
                            onChange={props.onChange}
                            valgtDato={props.value}
                            datoErGyldig={!feilmelding}
                            input={{
                                name: props.id,
                                placeholder: props.placeholder,
                            }}
                        />
                        {!context.feil && props.feil && (
                            <SkjemaelementFeilmelding>
                                {typeof feilmelding !== 'boolean' &&
                                    feilmelding}
                            </SkjemaelementFeilmelding>
                        )}
                    </div>
                );
            }}
        </SkjemaGruppeFeilContext.Consumer>
    );
}

export default DateInput;
