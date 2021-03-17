import { useIntl } from 'react-intl';
import { useForm, Controller } from 'react-hook-form';
import { BekreftCheckboksPanel, SkjemaGruppe } from 'nav-frontend-skjema';

import FormButtons from 'components/form-buttons/FormButtons';
import { getMessage } from 'utils/intl';

import './FarBekreftForm.less';

interface FarBekreftFormInput {
    readAndUnderstood: boolean;
    cannotWithdraw: boolean;
}

interface FarBekreftFormProps {
    onSubmit: () => void;
    onCancel: () => void;
}

const checkboxIds: (keyof FarBekreftFormInput)[] = ['readAndUnderstood', 'cannotWithdraw'];

function FarBekreftForm(props: FarBekreftFormProps) {
    const intl = useIntl();
    const { control, handleSubmit, errors } = useForm<FarBekreftFormInput>({
        defaultValues: {
            readAndUnderstood: false,
            cannotWithdraw: false,
        },
        shouldFocusError: false,
    });

    return (
        <form onSubmit={handleSubmit(props.onSubmit)} className="FarBekreftForm">
            <SkjemaGruppe>
                {checkboxIds.map((id) => (
                    <Controller
                        key={id}
                        name={id}
                        control={control}
                        rules={{
                            required: getMessage(intl, 'far.skjema.validation.required'),
                        }}
                        render={({ onChange, value, name }) => (
                            <BekreftCheckboksPanel
                                label={getMessage(intl, `far.skjema.${id}.label`)}
                                checked={value}
                                onChange={(e) => onChange((e.target as HTMLInputElement).checked)}
                                feil={errors[id]?.message}
                                inputProps={{ name }}
                            />
                        )}
                    />
                ))}
            </SkjemaGruppe>
            <FormButtons
                submitText={getMessage(intl, 'far.skjema.buttons.submit')}
                cancelText={getMessage(intl, 'far.skjema.buttons.cancel')}
                onCancel={props.onCancel}
            />
        </form>
    );
}

export default FarBekreftForm;
