import Panel from 'nav-frontend-paneler';
import { Element, Innholdstittel, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

import DatePresentation from 'components/date-presentation/DatePresentation';
import { Farskapserklaering } from 'types/farskapserklaering';
import { formatFoedselsnummer } from 'utils/foedselsnummer';
import { getNameFromForelder } from 'utils/name';

import './FarskapserklaeringPresentation.less';

interface FarskapserklaeringPresentationProps {
    farskapserklaering: Farskapserklaering;
}

function FarskapserklaeringPresentation({
    farskapserklaering,
}: FarskapserklaeringPresentationProps) {
    return (
        <Panel className="FarskapserklaeringPresentation">
            <Innholdstittel tag="p" className="FarskapserklaeringPresentation__title">
                <FormattedMessage id="farskapserklaering.title" />
            </Innholdstittel>
            <Undertittel tag="p">
                <FormattedMessage id="farskapserklaering.aboutChildren" />
            </Undertittel>
            <div className="FarskapserklaeringPresentation__barn">
                {farskapserklaering.barn?.termindato ? (
                    <>
                        <Element>
                            <FormattedMessage id="farskapserklaering.expectingChildren" />
                        </Element>
                        <Normaltekst>
                            <FormattedMessage id="farskapserklaering.termindato" />{' '}
                            <DatePresentation date={farskapserklaering.barn.termindato} />
                        </Normaltekst>
                    </>
                ) : (
                    <>
                        <Element>
                            <FormattedMessage id="farskapserklaering.bornChildren" />
                        </Element>
                        <Normaltekst>
                            <FormattedMessage id="farskapserklaering.foedselsnummer" />{' '}
                            {formatFoedselsnummer(farskapserklaering.barn?.foedselsnummer ?? '')}
                        </Normaltekst>
                    </>
                )}
            </div>
            <Undertittel tag="p">
                <FormattedMessage id="farskapserklaering.parents" />
            </Undertittel>
            <div className="FarskapserklaeringPresentation__foreldre">
                <div className="FarskapserklaeringPresentation__foreldre__mor">
                    <Element>
                        <FormattedMessage id="farskapserklaering.mother" />
                    </Element>
                    <Normaltekst>{getNameFromForelder(farskapserklaering.mor)}</Normaltekst>
                    <Normaltekst>
                        {formatFoedselsnummer(farskapserklaering.mor?.foedselsnummer ?? '')}
                    </Normaltekst>
                </div>
                <div>
                    <Element>
                        <FormattedMessage id="farskapserklaering.father" />
                    </Element>
                    <Normaltekst>{getNameFromForelder(farskapserklaering.far)}</Normaltekst>
                    <Normaltekst>
                        {formatFoedselsnummer(farskapserklaering.far?.foedselsnummer ?? '')}
                    </Normaltekst>
                </div>
            </div>
        </Panel>
    );
}

export default FarskapserklaeringPresentation;
