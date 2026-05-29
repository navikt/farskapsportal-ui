import { BodyShort, Heading } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';

import { BorSammenValue } from './BorSammenForm';

import './BorSammenPresentation.css';

interface BorSammenPresentationProps {
    titleId: string;
    borSammen: BorSammenValue;
}

function BorSammenPresentation({ titleId, borSammen }: BorSammenPresentationProps) {
    return (
        <div className="BorSammenPresentation">
            <Heading level="2" size="small">
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
