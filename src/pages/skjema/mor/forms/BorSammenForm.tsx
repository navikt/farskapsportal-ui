import { Radio, RadioGruppe } from 'nav-frontend-skjema';
import { useForm } from 'react-hook-form';
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
    const { handleSubmit, errors, register } = useForm<BorSammenFormInput>({
        defaultValues: {
            borSammen: props.defaultBorSammen,
        },
        shouldFocusError: false,
    });

    return (
        <form onSubmit={handleSubmit(props.onSubmit)} className="BorSammenForm">
            <RadioGruppe
                legend={getMessage(intl, 'mor.skjema.borSammen.title')}
                feil={errors.borSammen?.message}
            >
                <Radio
                    name="borSammen"
                    value="YES"
                    label={getMessage(intl, 'mor.skjema.borSammen.label.yes')}
                    radioRef={register}
                />
                <Radio
                    name="borSammen"
                    value="NO"
                    label={getMessage(intl, 'mor.skjema.borSammen.label.no')}
                    radioRef={register({
                        required: getMessage(intl, 'mor.skjema.borSammen.validation.required'),
                    })}
                />
            </RadioGruppe>
            <FormButtons
                submitText={getMessage(intl, 'mor.form.buttons.next')}
                cancelText={getMessage(intl, 'mor.form.buttons.cancel')}
                onCancel={props.onCancel}
            />
        </form>
    );
}

export default BorSammenForm;
