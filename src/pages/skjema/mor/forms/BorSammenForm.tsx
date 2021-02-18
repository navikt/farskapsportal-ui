import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { Controller, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import FormButtons from 'components/form-buttons/FormButtons';
import { getMessage } from 'utils/intl';

import './BorSammenForm.less';

export type BorSammenValue = 'YES' | 'NO' | null;

export interface BorSammenFormInput {
    borSammen: BorSammenValue;
}

export interface BorSammenFormProps {
    defaultBorSammen: BorSammenValue;
    onSubmit: (data: BorSammenFormInput) => void;
    onCancel: () => void;
}

function BorSammenForm(props: BorSammenFormProps) {
    const intl = useIntl();
    const { handleSubmit, errors, control } = useForm<BorSammenFormInput>({
        defaultValues: {
            borSammen: props.defaultBorSammen,
        },
        shouldFocusError: false,
    });

    return (
        <form onSubmit={handleSubmit(props.onSubmit)} className="BorSammenForm">
            <Controller
                name="borSammen"
                control={control}
                rules={{
                    required: getMessage(intl, 'mor.skjema.borSammen.validation.required'),
                }}
                render={({ onChange, value, name }) => (
                    <RadioPanelGruppe
                        name={name}
                        legend={getMessage(intl, 'mor.skjema.borSammen.title')}
                        radios={[
                            {
                                label: getMessage(intl, 'mor.skjema.borSammen.label.yes'),
                                value: 'YES',
                                id: 'yes',
                            },
                            {
                                label: getMessage(intl, 'mor.skjema.borSammen.label.no'),
                                value: 'NO',
                                id: 'no',
                            },
                        ]}
                        checked={value}
                        onChange={onChange}
                        feil={errors.borSammen?.message}
                    />
                )}
            />
            <FormButtons
                submitText={getMessage(intl, 'mor.form.buttons.next')}
                cancelText={getMessage(intl, 'mor.form.buttons.cancel')}
                onCancel={props.onCancel}
            />
        </form>
    );
}

export default BorSammenForm;
