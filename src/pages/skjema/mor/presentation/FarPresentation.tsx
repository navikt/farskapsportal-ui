import { BodyShort, Heading, Label, VStack } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';

import { formatFoedselsnummer } from 'utils/foedselsnummer';

interface FarPresentationProps {
    navn: string;
    foedselsnummer: string;
}

function FarPresentation(props: FarPresentationProps) {
    return (
        <VStack gap="space-16">
            <Heading level="2" size="small" spacing>
                <FormattedMessage id="skjema.mor.far.title" />
            </Heading>
            <div>
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
        </VStack>
    );
}

export default FarPresentation;
