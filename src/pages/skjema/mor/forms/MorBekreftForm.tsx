import { BekreftCheckboksPanel, SkjemaGruppe } from 'nav-frontend-skjema';
import { useForm, Controller } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import FormButtons from 'components/form-buttons/FormButtons';
import { getMessage } from 'utils/intl';

import './MorBekreftForm.less';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import AlertStripe from 'nav-frontend-alertstriper';

interface MorBekreftFormInput {
    farCorrect: boolean;
    cannotWithdraw: boolean;
}

interface MorBekreftFormProps {
    isPending: boolean;
    onSubmit: () => void;
    onCancel: () => void;
}

const checkboxIds: (keyof MorBekreftFormInput)[] = ['farCorrect', 'cannotWithdraw'];

function MorBekreftForm(props: MorBekreftFormProps) {
    const intl = useIntl();
    const { control, handleSubmit, errors } = useForm<MorBekreftFormInput>({
        defaultValues: {
            farCorrect: false,
            cannotWithdraw: false,
        },
        shouldFocusError: false,
    });

    return (
        <form onSubmit={handleSubmit(props.onSubmit)} className="MorBekreftForm">
            <SkjemaGruppe
                legend={<Systemtittel>{getMessage(intl, 'skjema.mor.confirm.title')}</Systemtittel>}
            >
                {checkboxIds.map((id) => (
                    <Controller
                        key={id}
                        name={id}
                        control={control}
                        rules={{
                            required: getMessage(intl, 'skjema.confirm.validation.required'),
                        }}
                        render={({ onChange, value, name }) => (
                            <BekreftCheckboksPanel
                                label={getMessage(intl, `skjema.mor.confirm.${id}.label`)}
                                checked={value}
                                onChange={(e) => onChange((e.target as HTMLInputElement).checked)}
                                feil={errors[id]?.message}
                                inputProps={{ name }}
                            />
                        )}
                    />
                ))}
            </SkjemaGruppe>
            <AlertStripe type="info">
                <Normaltekst>
                    <FormattedMessage id="skjema.confirm.signeringPostenInfo" />
                </Normaltekst>
            </AlertStripe>
            <FormButtons
                submitText={getMessage(intl, 'skjema.submit')}
                cancelText={getMessage(intl, 'skjema.cancel')}
                onCancel={props.onCancel}
                submitSpinner={props.isPending}
            />
        </form>
    );
}

export default MorBekreftForm;
