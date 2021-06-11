import {Hovedknapp, Knapp} from 'nav-frontend-knapper';
import {Systemtittel} from 'nav-frontend-typografi';
import {FormattedMessage} from 'react-intl';

import ButtonContainer from 'components/button-container/ButtonContainer';
import FarskapserklaeringPresentation from 'components/farskapserklaering-presentation/FarskapserklaeringPresentation';
import {Farskapserklaering} from 'types/farskapserklaering';
import Panel from "nav-frontend-paneler";

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
            <Panel border>
                <FarskapserklaeringPresentation
                    farskapserklaering={farskapserklaering}
                    showBorSammen={false}
                    showTitle={false}
                />
            </Panel>
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
