import { Radio, RadioGroup } from '@navikt/ds-react';
import { Controller, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import FormButtons from 'components/form-buttons/FormButtons';
import { getMessage } from 'utils/intl';
import EkspanderbarInformasjon from './EkspanderbarInformasjon';
import { BodyShort, Heading } from '@navikt/ds-react';

import './BorSammenForm.css';
import FormattedMessageWithExternalLink from '../../../components/formatted-message-with-external-link/FormattedMessageWithExternalLink';

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
    const { control, handleSubmit, formState: { errors } } = useForm<BorSammenFormInput>({
        defaultValues: {
            borSammen: props.defaultBorSammen,
        },
        shouldFocusError: false,
    });

    return (
        <form onSubmit={handleSubmit(props.onSubmit)} className="BorSammenForm">
            <Controller
                name="borSammen"
                control={control}
                rules={{ required: getMessage(intl, 'skjema.borSammen.validation.required') }}
                render={({ field: { onChange, value } }) => (
                    <RadioGroup
                        legend={<Heading level="2" size="small">{getMessage(intl, props.titleId)}</Heading>}
                        description={
                            <EkspanderbarInformasjon
                                intro={
                                    <BodyShort>
                                        {getMessage(intl, 'skjema.borSammen.description.intro')}
                                    </BodyShort>
                                }
                                content={
                                    <BodyShort>
                                        <FormattedMessageWithExternalLink
                                            textId="skjema.borSammen.description.content"
                                            linkId="skjema.borSammen.description.content.link"
                                        />
                                    </BodyShort>
                                }
                            />
                        }
                        onChange={onChange}
                        value={value ?? ''}
                        error={errors.borSammen?.message}
                    >
                        <Radio value="YES">{getMessage(intl, 'skjema.borSammen.label.yes')}</Radio>
                        <Radio value="NO">{getMessage(intl, 'skjema.borSammen.label.no')}</Radio>
                    </RadioGroup>
                )}
            />
            <FormButtons
                submitText={getMessage(intl, 'skjema.next')}
                cancelText={getMessage(intl, 'skjema.cancel')}
                onCancel={props.onCancel}
            />
        </form>
    );
}

export default BorSammenForm;
