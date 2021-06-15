import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Systemtittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

import ButtonContainer from 'components/button-container/ButtonContainer';
import FarskapserklaeringPresentation from 'components/farskapserklaering-presentation/FarskapserklaeringPresentation';
import { Farskapserklaering } from 'types/farskapserklaering';

import './LesOpplysningerForm.less';

interface LesOpplysningerFormProps {
    farskapserklaering: Farskapserklaering;
    onSubmit: () => void;
    onCancel: () => void;
}

function LesOpplysningerForm({ farskapserklaering, onCancel, onSubmit }: LesOpplysningerFormProps) {
    return (
        <div className="LesOpplysningerForm">
            <Systemtittel>
                <FormattedMessage id="skjema.far.lesOpplysninger.title" />
            </Systemtittel>
            <FarskapserklaeringPresentation
                farskapserklaering={farskapserklaering}
                showBorSammen={false}
                showTitle={false}
                border={true}
            />
            <ButtonContainer>
                <Hovedknapp htmlType="button" onClick={onSubmit}>
                    <FormattedMessage id="skjema.next" />
                </Hovedknapp>
                <Knapp htmlType="button" onClick={onCancel}>
                    <FormattedMessage id="skjema.cancel" />
                </Knapp>
            </ButtonContainer>
        </div>
    );
}

export default LesOpplysningerForm;
