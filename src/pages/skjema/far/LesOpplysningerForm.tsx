import {Systemtittel} from 'nav-frontend-typografi';
import {FormattedMessage, useIntl} from 'react-intl';
import FarskapserklaeringPresentation from 'components/farskapserklaering-presentation/FarskapserklaeringPresentation';
import {Farskapserklaering} from 'types/farskapserklaering';
import {getMessage} from "../../../utils/intl";
import {BekreftCheckboksPanel} from "nav-frontend-skjema";
import {Controller, useForm} from "react-hook-form";
import FormButtons from "../../../components/form-buttons/FormButtons";

import './LesOpplysningerForm.less';

interface LesOpplysningerFormInput {
    readAndAccepted: boolean;
}

interface LesOpplysningerFormProps {
    farskapserklaering: Farskapserklaering;
    onSubmit: () => void;
    onCancel: () => void;
}

function LesOpplysningerForm({ farskapserklaering, onCancel, onSubmit }: LesOpplysningerFormProps) {
    const intl = useIntl();
    const { control, handleSubmit, errors } = useForm<LesOpplysningerFormInput>({
        defaultValues: {
            readAndAccepted: false,
        },
        shouldFocusError: false,
    });

    return (
        <form className="LesOpplysningerForm" onSubmit={handleSubmit(onSubmit)}>
            <Systemtittel>
                <FormattedMessage id="skjema.far.lesOpplysninger.title" />
            </Systemtittel>
            <FarskapserklaeringPresentation
                farskapserklaering={farskapserklaering}
                showBorSammen={false}
                showTitle={false}
                border={true}
            />
            <Controller
                name="readAndAccepted"
                control={control}
                rules={{
                    required: getMessage(intl, 'skjema.far.lesOpplysninger.validation.required'),
                }}
                render={({ onChange, value, name }) => (
                    <BekreftCheckboksPanel
                        className="BekreftCheckBoksPanel"
                        label={getMessage(intl, `skjema.far.lesOpplysninger.confirm.label`)}
                        checked={value}
                        onChange={(e) => onChange((e.target as HTMLInputElement).checked)}
                        feil={errors.readAndAccepted?.message}
                        inputProps={{ name }}
                    />
                )}
            />
            <FormButtons
                submitText={getMessage(intl, 'skjema.next')}
                cancelText={getMessage(intl, 'skjema.cancel')}
                onCancel={onCancel}
            />
        </form>
    );
}

export default LesOpplysningerForm;
