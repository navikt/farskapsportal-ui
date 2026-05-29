import { BodyShort, Heading, Label } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';

import DatePresentation from 'components/date-presentation/DatePresentation';
import { formatFoedselsnummer } from 'utils/foedselsnummer';

import './BarnPresentation.css';

interface BarnPresentationProps {
    foedselsnummer: string | null;
    termindato: string | null;
}

function BarnPresentation(props: BarnPresentationProps) {
    return (
        <div className="BarnPresentation">
            <Heading level="2" size="small">
                <FormattedMessage id="skjema.mor.barn.title" />
            </Heading>
            {props.foedselsnummer && (
                <>
                    <BodyShort>
                        <FormattedMessage id="foedselsnummer" />:
                    </BodyShort>
                    <Label>{formatFoedselsnummer(props.foedselsnummer)}</Label>
                </>
            )}
            {props.termindato && (
                <>
                    <BodyShort>
                        <FormattedMessage id="termindato" />:
                    </BodyShort>
                    <Label>
                        <DatePresentation date={props.termindato} />
                    </Label>
                </>
            )}
        </div>
    );
}

export default BarnPresentation;
