import { BekreftCheckboksPanel, SkjemaGruppe } from 'nav-frontend-skjema';
import { useForm, Controller } from 'react-hook-form';
import {FormattedMessage, useIntl} from 'react-intl';

import FormButtons from 'components/form-buttons/FormButtons';
import { getMessage } from 'utils/intl';

import {Normaltekst} from "nav-frontend-typografi";
import AlertStripe from "nav-frontend-alertstriper";

import './FarBekreftForm.less';

interface FarBekreftFormInput {
    readAndUnderstood: boolean;
    cannotWithdraw: boolean;
}

interface FarBekreftFormProps {
    isPending: boolean;
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
            <SkjemaGruppe legend={getMessage(intl, 'skjema.far.confirm.title')}>
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
                                label={getMessage(intl, `skjema.far.confirm.${id}.label`)}
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
                    <FormattedMessage id="skjema.confirm.signeringPostenInfo"/>
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

export default FarBekreftForm;
