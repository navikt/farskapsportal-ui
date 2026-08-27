import { Alert, Checkbox, CheckboxGroup, ErrorMessage, Heading, VStack } from '@navikt/ds-react';
import { useForm, Controller } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import FormButtons from 'components/form-buttons/FormButtons';
import { getMessage } from 'utils/intl';

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
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<MorBekreftFormInput>({
        mode: 'onSubmit',
        defaultValues: {
            farCorrect: false,
            cannotWithdraw: false,
        },
        shouldFocusError: false,
    });

    return (
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <VStack gap="space-16">
                <Heading level="2" size="medium" spacing>
                    {getMessage(intl, 'skjema.mor.confirm.title')}
                </Heading>
                <CheckboxGroup legend={getMessage(intl, 'skjema.mor.confirm.title')} hideLegend>
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
                                    {getMessage(intl, `skjema.mor.confirm.${id}.label`)}
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

export default MorBekreftForm;
