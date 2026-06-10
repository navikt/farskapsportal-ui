import { BodyShort, Heading } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';

import { BorSammenValue } from './BorSammenForm';

interface BorSammenPresentationProps {
    titleId: string;
    borSammen: BorSammenValue;
}

function BorSammenPresentation({ titleId, borSammen }: BorSammenPresentationProps) {
    return (
        <div>
            <Heading level="2" size="small" spacing>
                <FormattedMessage id={titleId} />
            </Heading>
            <BodyShort>
                <FormattedMessage
                    id={
                        borSammen === 'YES'
                            ? 'skjema.borSammen.label.yes'
                            : 'skjema.borSammen.label.no'
                    }
                />
            </BodyShort>
        </div>
    );
}

export default BorSammenPresentation;
