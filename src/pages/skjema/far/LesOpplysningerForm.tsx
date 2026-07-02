import { Checkbox, CheckboxGroup, Heading, VStack } from '@navikt/ds-react';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import FarskapserklaeringPresentation from 'components/farskapserklaering-presentation/FarskapserklaeringPresentation';
import FormButtons from '../../../components/form-buttons/FormButtons';
import { Farskapserklaering } from 'types/farskapserklaering';
import { getMessage } from '../../../utils/intl';

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
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LesOpplysningerFormInput>({
        mode: 'onSubmit',
        defaultValues: {
            readAndAccepted: false,
        },
        shouldFocusError: false,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap="space-16">
                <Heading level="2" size="medium" spacing>
                    <FormattedMessage id="skjema.far.lesOpplysninger.title" />
                </Heading>
                <FarskapserklaeringPresentation
                    farskapserklaering={farskapserklaering}
                    showBorSammen={false}
                    showTitle={true}
                    border={true}
                />
                <Controller
                    name="readAndAccepted"
                    control={control}
                    rules={{
                        required: getMessage(
                            intl,
                            'skjema.far.lesOpplysninger.validation.required',
                        ),
                    }}
                    render={({ field: { onChange, value } }) => (
                        <CheckboxGroup
                            legend={getMessage(intl, 'skjema.far.lesOpplysninger.confirm.label')}
                            hideLegend
                            error={errors.readAndAccepted?.message}
                        >
                            <Checkbox checked={value} onChange={(e) => onChange(e.target.checked)}>
                                {getMessage(intl, `skjema.far.lesOpplysninger.confirm.label`)}
                            </Checkbox>
                        </CheckboxGroup>
                    )}
                />
                <FormButtons
                    submitText={getMessage(intl, 'skjema.next')}
                    cancelText={getMessage(intl, 'skjema.cancel')}
                    onCancel={onCancel}
                />
            </VStack>
        </form>
    );
}

export default LesOpplysningerForm;
