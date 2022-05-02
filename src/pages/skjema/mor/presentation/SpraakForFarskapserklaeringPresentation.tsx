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
                <FormattedMessage id={mapSkriftspraakToTextId(spraak)} />
            </Element>
        </div>
    );
}

const mapSkriftspraakToTextId = (spraak: Skriftspraak): string => {
    switch (spraak) {
        case Skriftspraak.Bookmaal:
            return 'skjema.mor.spraak.label.norwegian';
        case Skriftspraak.Nynorsk:
            return 'skjema.mor.spraak.label.nynorsk';
        case Skriftspraak.Engelsk:
            return 'skjema.mor.spraak.label.english';
    }
};

export default SpraakForFarskapserklaeringPresentation;
