import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import { Feiloppsummering, Input, SkjemaGruppe } from 'nav-frontend-skjema';
import { fnr } from '@navikt/fnrvalidator';

import { controlFatherInfo } from 'api/api';
import Error from 'components/error/Error';
import FormButtons from 'components/form-buttons/FormButtons';
import { AlertError } from 'types/error';
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
    const { register, handleSubmit, errors } = useForm<FarFormInput>({
        defaultValues: {
            navn: defaultNavn,
            foedselsnummer: defaultFoedselsnummer,
        },
        shouldFocusError: false,
    });
    const [isControlPending, setIsControlPending] = useState(false);
    const [isControlError, setIsControlError] = useState(false);
    const [apiError, setApiError] = useState<AlertError>();

    const controlInfoAndSubmit = (data: FarFormInput) => {
        setIsControlPending(true);
        setIsControlError(false);
        setApiError(undefined);

        controlFatherInfo(data)
            .then(() => {
                onSubmit(data);
            })
            .catch((error: AlertError) => {
                if (error.code === 400) {
                    setIsControlError(true);
                } else {
                    setApiError(error);
                }
            })
            .finally(() => {
                setIsControlPending(false);
            });
    };

    const onError = () => {
        setFeiloppsummeringFocus();
    };

    const feil = mapErrors(errors, ['navn', 'foedselsnummer']);

    return (
        <form onSubmit={handleSubmit(controlInfoAndSubmit, onError)}>
            <SkjemaGruppe
                legend={getMessage(intl, 'mor.soeknad.far.title')}
                feil={isControlError && getMessage(intl, 'mor.soeknad.far.form.error')}
            >
                <Input
                    id="navn"
                    name="navn"
                    label={getMessage(intl, 'mor.soeknad.far.form.navn.label')}
                    bredde="XXL"
                    inputRef={register({
                        required: getMessage(intl, 'mor.soeknad.far.form.navn.validation.required'),
                    })}
                    feil={errors.navn?.message}
                />
                <Input
                    id="foedselsnummer"
                    name="foedselsnummer"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    inputClassName="skjemaelement__input-fodselsnr"
                    label={getMessage(intl, 'mor.soeknad.far.form.foedselsnummer.label')}
                    bredde="S"
                    inputRef={register({
                        required: getMessage(
                            intl,
                            'mor.soeknad.far.form.foedselsnummer.validation.required'
                        ),
                        validate: (value: string) =>
                            fnr(value).status === 'valid' ||
                            getMessage(intl, 'mor.soeknad.far.form.foedselsnummer.validation.fnr'),
                    })}
                    feil={errors.foedselsnummer?.message}
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
                submitSpinner={isControlPending}
            />
            {apiError && <Error error={apiError} />}
        </form>
    );
}

export default FarForm;
