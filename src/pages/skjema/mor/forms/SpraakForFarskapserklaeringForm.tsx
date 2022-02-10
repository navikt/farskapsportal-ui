import { useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import { Radio, RadioGruppe } from 'nav-frontend-skjema';
import { Systemtittel } from 'nav-frontend-typografi';
import { getMessage } from '../../../../utils/intl';
import FormButtons from '../../../../components/form-buttons/FormButtons';
import { Skriftspraak } from '../../../../types/skriftspraak';

import './SpraakForFarskapserklaeringForm.less';

export interface SpraakForFarskapserklaeringFormInput {
    spraak: Skriftspraak | null;
}

interface SpraakForFarskapserklaeringFormProps {
    onSubmit: (data: SpraakForFarskapserklaeringFormInput) => void;
    onCancel: () => void;
}

function SpraakForFarskapserklaeringForm(props: SpraakForFarskapserklaeringFormProps) {
    const intl = useIntl();
    const { handleSubmit, errors, register } = useForm<SpraakForFarskapserklaeringFormInput>({
        defaultValues: {
            spraak: null,
        },
        shouldFocusError: false,
    });

    return (
        <form onSubmit={handleSubmit(props.onSubmit)} className="SpraakForFarskapserklaeringForm">
            <RadioGruppe
                legend={<Systemtittel>{getMessage(intl, 'skjema.mor.spraak.title')}</Systemtittel>}
                description={getMessage(intl, 'skjema.mor.spraak.description')}
                feil={errors.spraak?.message}
            >
                <div className="SpraakForFarskapserklaeringForm__radiogruppe__values">
                    <Radio
                        name="spraak"
                        value={Skriftspraak.Bookmaal}
                        label={getMessage(intl, 'skjema.mor.spraak.label.norwegian')}
                        radioRef={register}
                    />
                    <Radio
                        name="spraak"
                        value={Skriftspraak.Nynorsk}
                        label={getMessage(intl, 'skjema.mor.spraak.label.nynorsk')}
                        radioRef={register({
                            required: getMessage(intl, 'skjema.mor.spraak.validation.required'),
                        })}
                    />
                    <Radio
                        name="spraak"
                        value={Skriftspraak.Engelsk}
                        label={getMessage(intl, 'skjema.mor.spraak.label.english')}
                        radioRef={register({
                            required: getMessage(intl, 'skjema.mor.spraak.validation.required'),
                        })}
                    />
                </div>
            </RadioGruppe>
            <FormButtons
                submitText={getMessage(intl, 'skjema.next')}
                cancelText={getMessage(intl, 'skjema.cancel')}
                onCancel={props.onCancel}
            />
        </form>
    );
}

export default SpraakForFarskapserklaeringForm;
