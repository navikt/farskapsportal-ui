import { Systemtittel } from 'nav-frontend-typografi';
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
            <Systemtittel>
                <FormattedMessage id="skjema.far.lesOpplysninger.title" />
            </Systemtittel>
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
