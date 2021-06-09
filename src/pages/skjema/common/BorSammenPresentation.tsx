import {Normaltekst, Systemtittel} from 'nav-frontend-typografi';
import {FormattedMessage} from 'react-intl';

import {BorSammenValue} from './BorSammenForm';

import './BorSammenPresentation.less';

interface BorSammenPresentationProps {
    titleId: string;
    borSammen: BorSammenValue;
}

function BorSammenPresentation({ titleId, borSammen }: BorSammenPresentationProps) {
    return (
        <div className="BorSammenPresentation">
            <Systemtittel>
                <FormattedMessage id={titleId} />
            </Systemtittel>
            <Normaltekst>
                <FormattedMessage
                    id={
                        borSammen === 'YES'
                            ? 'skjema.borSammen.label.yes'
                            : 'skjema.borSammen.label.no'
                    }
                />
            </Normaltekst>
        </div>
    );
}

export default BorSammenPresentation;
