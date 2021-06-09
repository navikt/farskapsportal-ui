import {Element, Normaltekst, Systemtittel} from 'nav-frontend-typografi';
import {FormattedMessage} from 'react-intl';

import DatePresentation from 'components/date-presentation/DatePresentation';
import {formatFoedselsnummer} from 'utils/foedselsnummer';

import './BarnPresentation.less';

interface BarnPresentationProps {
    foedselsnummer: string | null;
    termindato: string | null;
}

function BarnPresentation(props: BarnPresentationProps) {
    return (
        <div className="BarnPresentation">
            <Systemtittel>
                <FormattedMessage id="skjema.mor.barn.title" />
            </Systemtittel>
            {props.foedselsnummer && (
                <>
                    <Normaltekst>
                        <FormattedMessage id="foedselsnummer" />:
                    </Normaltekst>
                    <Element>{formatFoedselsnummer(props.foedselsnummer)}</Element>
                </>
            )}
            {props.termindato && (
                <>
                    <Normaltekst>
                        <FormattedMessage id="termindato" />:
                    </Normaltekst>
                    <Element>
                        <DatePresentation date={props.termindato} />
                    </Element>
                </>
            )}
        </div>
    );
}

export default BarnPresentation;
