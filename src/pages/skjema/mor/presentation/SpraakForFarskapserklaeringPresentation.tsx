import { Heading, Label } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';
import { Skriftspraak } from '../../../../types/skriftspraak';

interface SpraakForFarskapserklaeringPresentationProps {
    spraak: Skriftspraak;
}

function SpraakForFarskapserklaeringPresentation({
    spraak,
}: SpraakForFarskapserklaeringPresentationProps) {
    return (
        <div>
            <Heading level="2" size="small" spacing>
                <FormattedMessage id="skjema.mor.spraak.title" />
            </Heading>
            <Label>
                <FormattedMessage id={mapSkriftspraakToTextId(spraak)} />
            </Label>
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
