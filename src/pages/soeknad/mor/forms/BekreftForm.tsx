import { useIntl } from 'react-intl';
import { useForm, Controller } from 'react-hook-form';
import { BekreftCheckboksPanel, SkjemaGruppe } from 'nav-frontend-skjema';

import FormButtons from 'components/form-buttons/FormButtons';
import { getMessage } from 'utils/intl';

import './BekreftForm.less';

export interface BekreftFormInput {
    farCorrect: boolean;
    cannotWithdraw: boolean;
}

interface BekreftFormProps {
    isPending: boolean;
    onSubmit: () => void;
    onCancel: () => void;
}

function BekreftForm(props: BekreftFormProps) {
    const intl = useIntl();
    const { control, handleSubmit, errors } = useForm<BekreftFormInput>({
        defaultValues: {
            farCorrect: false,
            cannotWithdraw: false,
        },
        shouldFocusError: false,
    });

    return (
        <form onSubmit={handleSubmit(props.onSubmit)} className="BekreftForm">
            <SkjemaGruppe legend={getMessage(intl, 'mor.soeknad.confirm.title')}>
                <Controller
                    name="farCorrect"
                    control={control}
                    rules={{
                        required: getMessage(intl, 'mor.soeknad.confirm.form.validation.required'),
                    }}
                    render={({ onChange, value, name }) => (
                        <BekreftCheckboksPanel
                            label={getMessage(intl, 'mor.soeknad.confirm.form.farCorrect.label')}
                            checked={value}
                            onChange={(e) => onChange((e.target as HTMLInputElement).checked)}
                            feil={errors.farCorrect?.message}
                            inputProps={{ name }}
                        />
                    )}
                />
                <Controller
                    name="cannotWithdraw"
                    control={control}
                    rules={{
                        required: getMessage(intl, 'mor.soeknad.confirm.form.validation.required'),
                    }}
                    render={({ onChange, value, name }) => (
                        <BekreftCheckboksPanel
                            label={getMessage(
                                intl,
                                'mor.soeknad.confirm.form.cannotWithdraw.label'
                            )}
                            checked={value}
                            onChange={(e) => onChange((e.target as HTMLInputElement).checked)}
                            feil={errors.cannotWithdraw?.message}
                            inputProps={{ name }}
                        />
                    )}
                />
            </SkjemaGruppe>
            <FormButtons
                submitText={getMessage(intl, 'mor.form.buttons.submit')}
                cancelText={getMessage(intl, 'mor.form.buttons.cancel')}
                onCancel={props.onCancel}
                submitSpinner={props.isPending}
            />
        </form>
    );
}

export default BekreftForm;
