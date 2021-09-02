import {useIntl} from "react-intl";
import {useForm} from "react-hook-form";
import {Radio, RadioGruppe} from "nav-frontend-skjema";
import {Systemtittel} from "nav-frontend-typografi";
import {getMessage} from "../../../../utils/intl";
import FormButtons from "../../../../components/form-buttons/FormButtons";
import EkspanderbarInformasjon from "../../common/EkspanderbarInformasjon";


export type SpraakForFarskapserklaeringValue = 'NO' | 'EN' | null;

export interface SpraakForFarskapserklaeringInput {
    spraak: SpraakForFarskapserklaeringValue;
}

interface SpraakForFarskapserklaeringProps {
    titleId: string;
    onSubmit: (data: SpraakForFarskapserklaeringInput) => void;
    onCancel: () => void;
}

function SpraakForFarskapserklaeringForm(props: SpraakForFarskapserklaeringProps) {
    const intl = useIntl();
    const { handleSubmit, errors, register } = useForm<SpraakForFarskapserklaeringInput>({
        defaultValues: {
            spraak: null,
        },
        shouldFocusError: false,
    });

    return (
        <form onSubmit={handleSubmit(props.onSubmit)} className="SpraakForFarskapserklaeringForm">
            <RadioGruppe
                legend={<Systemtittel>{getMessage(intl, props.titleId)}</Systemtittel>}
                description={getMessage(intl, 'skjema.mor.spraak.description')}
                feil={errors.spraak?.message}
            >
                <Radio
                    name="spraak"
                    value="NO"
                    label={getMessage(intl, 'skjema.mor.spraak.label.norwegian')}
                    radioRef={register}
                />
                <Radio
                    name="spraak"
                    value="EN"
                    label={getMessage(intl, 'skjema.mor.spraak.label.english')}
                    radioRef={register({
                        required: getMessage(intl, 'skjema.mor.praak.validation.required'),
                    })}
                />
            </RadioGruppe>
            <FormButtons
                submitText={getMessage(intl, 'skjema.next')}
                cancelText={getMessage(intl, 'skjema.cancel')}
                onCancel={props.onCancel}
            />
        </form>
    )
}

export default SpraakForFarskapserklaeringForm;