import { Radio, RadioGruppe } from 'nav-frontend-skjema';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import FormButtons from 'components/form-buttons/FormButtons';
import { getMessage } from 'utils/intl';
import EkspanderbarInformasjon from './EkspanderbarInformasjon';

import './BorSammenForm.less';

export type BorSammenValue = 'YES' | 'NO' | null;

export interface BorSammenFormInput {
    borSammen: BorSammenValue;
}

export interface BorSammenFormProps {
    titleId: string;
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
                legend={getMessage(intl, props.titleId)}
                description={
                    <EkspanderbarInformasjon
                        introText={getMessage(intl, 'skjema.borSammen.description.intro')}
                        contentText={getMessage(intl, 'skjema.borSammen.description.content')}
                    />
                }
                feil={errors.borSammen?.message}
            >
                <Radio
                    name="borSammen"
                    value="YES"
                    label={getMessage(intl, 'skjema.borSammen.label.yes')}
                    radioRef={register}
                />
                <Radio
                    name="borSammen"
                    value="NO"
                    label={getMessage(intl, 'skjema.borSammen.label.no')}
                    radioRef={register({
                        required: getMessage(intl, 'skjema.borSammen.validation.required'),
                    })}
                />
            </RadioGruppe>
            <FormButtons
                submitText={getMessage(intl, 'skjema.next')}
                cancelText={getMessage(intl, 'skjema.cancel')}
                onCancel={props.onCancel}
            />
        </form>
    );
}

export default BorSammenForm;
