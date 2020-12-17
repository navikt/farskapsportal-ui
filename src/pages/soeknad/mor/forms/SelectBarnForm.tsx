import { useIntl } from 'react-intl';
import { Controller, useForm } from 'react-hook-form';
import { RadioPanelGruppe, SkjemaGruppe } from 'nav-frontend-skjema';

import FormButtons from 'components/form-buttons/FormButtons';
import { getMessage } from 'utils/intl';

export interface SelectBarnFormInput {
    foedselsnummer: string;
}

export interface SelectBarnFormProps {
    defaultFoedselsnummer: string | null;
    barn: string[];
    onSubmit: (data: SelectBarnFormInput) => void;
    onCancel: () => void;
}

function SelectBarnForm(props: SelectBarnFormProps) {
    const intl = useIntl();
    const { control, errors, handleSubmit } = useForm<SelectBarnFormInput>({
        defaultValues: {
            foedselsnummer: props.defaultFoedselsnummer ?? '',
        },
        shouldFocusError: false,
    });

    return (
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <SkjemaGruppe legend={getMessage(intl, 'mor.soeknad.barn.title')}>
                <Controller
                    name="foedselsnummer"
                    control={control}
                    rules={{
                        required: 'Påkrevd',
                    }}
                    render={({ onChange, value, name }) => (
                        <RadioPanelGruppe
                            name={name}
                            legend="Velg fødselsnummer"
                            radios={props.barn.map((b) => ({ label: b, value: b }))}
                            checked={value}
                            onChange={onChange}
                            feil={errors.foedselsnummer?.message}
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

export default SelectBarnForm;
