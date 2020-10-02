import React from 'react';
import { useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import { Feiloppsummering, FnrInput, Input, SkjemaGruppe } from 'nav-frontend-skjema';

import FormButtons from 'components/form-buttons/FormButtons';
import { mapErrors } from 'utils/form';
import { useFocus } from 'utils/hooks';
import { getMessage } from 'utils/intl';

export interface FarFormInput {
    navn: string;
    foedselsnummer: string;
}

interface FarFormProps {
    defaultNavn: string;
    defaultFoedselsnummer: string;
    onSubmit: (data: FarFormInput) => void;
    onCancel: () => void;
}

function FarForm({ defaultNavn, defaultFoedselsnummer, onSubmit, onCancel }: FarFormProps) {
    const intl = useIntl();
    const [feilRef, setFeiloppsummeringFocus] = useFocus();
    const { register, handleSubmit, errors, setError, formState } = useForm<FarFormInput>({
        defaultValues: {
            navn: defaultNavn,
            foedselsnummer: defaultFoedselsnummer,
        },
        shouldFocusError: false,
    });
    const { isSubmitted } = formState;

    const onError = () => {
        setFeiloppsummeringFocus();
    };

    const feil = mapErrors(errors, ['navn', 'foedselsnummer']);

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
            <SkjemaGruppe legend={getMessage(intl, 'mor.soeknad.far.title')}>
                <Input
                    id="navn"
                    name="navn"
                    label={getMessage(intl, 'mor.soeknad.far.form.navn.label')}
                    bredde="XXL"
                    inputRef={register({
                        required: {
                            value: true,
                            message: getMessage(
                                intl,
                                'mor.soeknad.far.form.navn.validation.required'
                            ),
                        },
                    })}
                    feil={errors.navn && errors.navn.message}
                />
                <FnrInput
                    id="foedselsnummer"
                    name="foedselsnummer"
                    label={getMessage(intl, 'mor.soeknad.far.form.foedselsnummer.label')}
                    bredde="S"
                    inputRef={register({
                        required: {
                            value: true,
                            message: getMessage(
                                intl,
                                'mor.soeknad.far.form.foedselsnummer.validation.required'
                            ),
                        },
                    })}
                    onValidate={(isValid) => {
                        if (isSubmitted && !isValid) {
                            setError('foedselsnummer', {
                                type: 'fnr',
                                message: getMessage(
                                    intl,
                                    'mor.soeknad.far.form.foedselsnummer.validation.fnr'
                                ),
                            });
                        }
                    }}
                    feil={errors.foedselsnummer && errors.foedselsnummer.message}
                />
            </SkjemaGruppe>
            {!!feil.length && (
                <Feiloppsummering
                    tittel={getMessage(intl, 'form.feiloppsummering')}
                    feil={feil}
                    innerRef={feilRef}
                />
            )}
            <FormButtons
                submitText={getMessage(intl, 'mor.form.buttons.next')}
                cancelText={getMessage(intl, 'mor.form.buttons.cancel')}
                onCancel={onCancel}
            />
        </form>
    );
}

export default FarForm;
