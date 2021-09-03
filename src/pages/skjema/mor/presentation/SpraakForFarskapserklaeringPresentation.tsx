import { Element, Systemtittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import { Skriftspraak } from '../../../../types/skriftspraak';

import './SpraakForFarskapserklaeringPresentation.less';

interface SpraakForFarskapserklaeringPresentationProps {
    spraak: Skriftspraak;
}

function SpraakForFarskapserklaeringPresentation({
    spraak,
}: SpraakForFarskapserklaeringPresentationProps) {
    return (
        <div className="SpraakForFarskapserklaeringPresentation">
            <Systemtittel>
                <FormattedMessage id="skjema.mor.spraak.title" />
            </Systemtittel>
            <Element>
                <FormattedMessage
                    id={
                        spraak === Skriftspraak.Bookmaal
                            ? 'skjema.mor.spraak.label.norwegian'
                            : 'skjema.mor.spraak.label.english'
                    }
                />
            </Element>
        </div>
    );
}

export default SpraakForFarskapserklaeringPresentation;
