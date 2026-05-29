import { Alert, Checkbox, CheckboxGroup } from '@navikt/ds-react';
import { useForm, Controller } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import FormButtons from 'components/form-buttons/FormButtons';
import { getMessage } from 'utils/intl';

import { BodyShort, Heading } from '@navikt/ds-react';

import './FarBekreftForm.css';

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
    const { control, handleSubmit, formState: { errors } } = useForm<FarBekreftFormInput>({
        defaultValues: {
            readAndUnderstood: false,
            cannotWithdraw: false,
        },
        shouldFocusError: false,
    });

    return (
        <form onSubmit={handleSubmit(props.onSubmit)} className="FarBekreftForm">
            <Heading level="2" size="small">{getMessage(intl, 'skjema.far.confirm.title')}</Heading>
            {checkboxIds.map((id) => (
                <Controller
                    key={id}
                    name={id}
                    control={control}
                    rules={{
                        required: getMessage(intl, 'skjema.confirm.validation.required'),
                    }}
                    render={({ field: { onChange, value } }) => (
                        <CheckboxGroup
                            legend={getMessage(intl, `skjema.far.confirm.${id}.label`)}
                            hideLegend
                            error={errors[id]?.message}
                        >
                            <Checkbox
                                checked={value}
                                onChange={(e) => onChange(e.target.checked)}
                            >
                                {getMessage(intl, `skjema.far.confirm.${id}.label`)}
                            </Checkbox>
                        </CheckboxGroup>
                    )}
                />
            ))}
            <Alert variant="info">
                <BodyShort>
                    <FormattedMessage id="skjema.confirm.signeringPostenInfo" />
                </BodyShort>
            </Alert>
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
