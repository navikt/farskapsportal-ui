import { useIntl } from 'react-intl';
import { Controller, useForm } from 'react-hook-form';
import { Radio, RadioGroup } from '@navikt/ds-react';
import { Heading } from '@navikt/ds-react';
import { getMessage } from '../../../../utils/intl';
import FormButtons from '../../../../components/form-buttons/FormButtons';
import { Skriftspraak } from '../../../../types/skriftspraak';
import { useStore } from '../../../../store/Context';

import './SpraakForFarskapserklaeringForm.css';

export interface SpraakForFarskapserklaeringFormInput {
    spraak: Skriftspraak | null;
}

interface SpraakForFarskapserklaeringFormProps {
    onSubmit: (data: SpraakForFarskapserklaeringFormInput) => void;
    onCancel: () => void;
}

function SpraakForFarskapserklaeringForm(props: SpraakForFarskapserklaeringFormProps) {
    const intl = useIntl();
    const [{ language }] = useStore();
    const { control, handleSubmit, formState: { errors } } = useForm<SpraakForFarskapserklaeringFormInput>({
        defaultValues: {
            spraak: mapLanguageToSkriftspraak(language),
        },
        shouldFocusError: false,
    });

    return (
        <form onSubmit={handleSubmit(props.onSubmit)} className="SpraakForFarskapserklaeringForm">
            <Controller
                name="spraak"
                control={control}
                rules={{ required: getMessage(intl, 'skjema.mor.spraak.validation.required') }}
                render={({ field: { onChange, value } }) => (
                    <RadioGroup
                        legend={<Heading level="2" size="small">{getMessage(intl, 'skjema.mor.spraak.title')}</Heading>}
                        description={getMessage(intl, 'skjema.mor.spraak.description')}
                        onChange={onChange}
                        value={value ?? ''}
                        error={errors.spraak?.message}
                    >
                        <div className="SpraakForFarskapserklaeringForm__radiogruppe__values">
                            <Radio value={Skriftspraak.Bookmaal}>{getMessage(intl, 'skjema.mor.spraak.label.norwegian')}</Radio>
                            <Radio value={Skriftspraak.Nynorsk}>{getMessage(intl, 'skjema.mor.spraak.label.nynorsk')}</Radio>
                            <Radio value={Skriftspraak.Engelsk}>{getMessage(intl, 'skjema.mor.spraak.label.english')}</Radio>
                        </div>
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

const mapLanguageToSkriftspraak = (language: string): Skriftspraak | null => {
    switch (language) {
        case 'nb':
            return Skriftspraak.Bookmaal;
        case 'nn':
            return Skriftspraak.Nynorsk;
        case 'en':
            return Skriftspraak.Engelsk;
        default:
            return null;
    }
};

export default SpraakForFarskapserklaeringForm;
