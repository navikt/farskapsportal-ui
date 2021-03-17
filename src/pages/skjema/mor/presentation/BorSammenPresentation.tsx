import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

import { BorSammenValue } from '../forms/BorSammenForm';

import './BorSammenPresentation.less';

interface BorSammenPresentationProps {
    borSammen: BorSammenValue;
}

function BorSammenPresentation(props: BorSammenPresentationProps) {
    return (
        <div className="BorSammenPresentation">
            <Undertittel>
                <FormattedMessage id="mor.skjema.borSammen.title" />
            </Undertittel>
            <Normaltekst>
                <FormattedMessage
                    id={
                        props.borSammen === 'YES'
                            ? 'mor.skjema.borSammen.label.yes'
                            : 'mor.skjema.borSammen.label.no'
                    }
                />
            </Normaltekst>
        </div>
    );
}

export default BorSammenPresentation;
