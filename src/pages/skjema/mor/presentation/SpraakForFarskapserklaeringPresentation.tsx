import {Normaltekst, Systemtittel} from "nav-frontend-typografi";
import {FormattedMessage} from "react-intl";
import {SpraakForFarskapserklaeringValue} from "../forms/SpraakForFarskapserklaeringForm";


interface SpraakForFarskapserklaeringPresentationProps {
    titleId: string;
    spraak: SpraakForFarskapserklaeringValue;
}

function SpraakForFarskapserklaeringPresentation({ titleId, spraak }: SpraakForFarskapserklaeringPresentationProps) {
    return (
        <div className="SpraakForFarskapserklaeringPresentation">
            <Systemtittel>
                <FormattedMessage id={titleId} />
            </Systemtittel>
            <Normaltekst>
                <FormattedMessage
                    id={
                        spraak === 'NO'
                            ? 'skjema.mor.spraak.label.norwegian'
                            : 'skjema.mor.spraak.label.english'
                    }
                />
            </Normaltekst>
        </div>
    );
}

export default SpraakForFarskapserklaeringPresentation;
