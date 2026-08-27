import { Alert, Checkbox, CheckboxGroup, ErrorMessage, Heading, VStack } from '@navikt/ds-react';
import { useForm, Controller } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import FormButtons from 'components/form-buttons/FormButtons';
import { getMessage } from 'utils/intl';

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
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FarBekreftFormInput>({
        mode: 'onSubmit',
        defaultValues: {
            readAndUnderstood: false,
            cannotWithdraw: false,
        },
        shouldFocusError: false,
    });

    return (
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <VStack gap="space-16">
                <Heading level="2" size="medium" spacing>
                    {getMessage(intl, 'skjema.far.confirm.title')}
                </Heading>
                <CheckboxGroup legend={getMessage(intl, 'skjema.far.confirm.title')} hideLegend>
                    {checkboxIds.map((id) => (
                        <Controller
                            key={id}
                            name={id}
                            control={control}
                            rules={{
                                required: getMessage(intl, 'skjema.confirm.validation.required'),
                            }}
                            render={({ field: { onChange, value } }) => (
                                <Checkbox
                                    value={id}
                                    checked={value}
                                    onChange={(e) => onChange(e.target.checked)}
                                    error={!!errors[id]}
                                >
                                    {getMessage(intl, `skjema.far.confirm.${id}.label`)}
                                </Checkbox>
                            )}
                        />
                    ))}
                </CheckboxGroup>
                {checkboxIds.some((id) => errors[id]) && (
                    <ErrorMessage showIcon>
                        {getMessage(intl, 'skjema.confirm.validation.required')}
                    </ErrorMessage>
                )}
                <Alert variant="info">
                    <FormattedMessage id="skjema.confirm.signeringPostenInfo" />
                </Alert>
                <FormButtons
                    submitText={getMessage(intl, 'skjema.submit')}
                    cancelText={getMessage(intl, 'skjema.cancel')}
                    onCancel={props.onCancel}
                    submitSpinner={props.isPending}
                />
            </VStack>
        </form>
    );
}

export default FarBekreftForm;
