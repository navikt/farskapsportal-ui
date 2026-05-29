import { BodyShort, Heading, Label } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';

import { formatFoedselsnummer } from 'utils/foedselsnummer';

import './FarPresentation.css';

interface FarPresentationProps {
    navn: string;
    foedselsnummer: string;
}

function FarPresentation(props: FarPresentationProps) {
    return (
        <div className="FarPresentation">
            <Heading level="2" size="small">
                <FormattedMessage id="skjema.mor.far.title" />
            </Heading>
            <div className="FarPresentation__navn">
                <BodyShort>
                    <FormattedMessage id="navn" />:
                </BodyShort>
                <Label>{props.navn}</Label>
            </div>
            <div>
                <BodyShort>
                    <FormattedMessage id="foedselsnummer" />:
                </BodyShort>
                <Label>{formatFoedselsnummer(props.foedselsnummer)}</Label>
            </div>
        </div>
    );
}

export default FarPresentation;
