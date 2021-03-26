import { Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

import FarskapserklaeringPresentation from 'components/farskapserklaering-presentation/FarskapserklaeringPresentation';
import { Farskapserklaering } from 'types/farskapserklaering';

import './LesOpplysningerPresentation.less';

interface LesOpplysningerPresentationProps {
    farskapserklaering: Farskapserklaering;
}

function LesOpplysningerPresentation({ farskapserklaering }: LesOpplysningerPresentationProps) {
    return (
        <div className="LesOpplysningerPresentation">
            <Undertittel>
                <FormattedMessage id="skjema.far.lesOpplysninger.title" />
            </Undertittel>
            <FarskapserklaeringPresentation
                farskapserklaering={farskapserklaering}
                showBorSammen={false}
            />
        </div>
    );
}

export default LesOpplysningerPresentation;
