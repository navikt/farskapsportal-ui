import { Heading } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';

import FarskapserklaeringPresentation from 'components/farskapserklaering-presentation/FarskapserklaeringPresentation';
import { Farskapserklaering } from 'types/farskapserklaering';

import './LesOpplysningerPresentation.css';

interface LesOpplysningerPresentationProps {
    farskapserklaering: Farskapserklaering;
}

function LesOpplysningerPresentation({ farskapserklaering }: LesOpplysningerPresentationProps) {
    return (
        <div className="LesOpplysningerPresentation">
            <Heading level="2" size="small">
                <FormattedMessage id="skjema.far.lesOpplysninger.title" />
            </Heading>
            <FarskapserklaeringPresentation
                farskapserklaering={farskapserklaering}
                showBorSammen={false}
                showTitle={false}
                border={true}
            />
        </div>
    );
}

export default LesOpplysningerPresentation;
