import Panel from 'nav-frontend-paneler';
import { Element, Innholdstittel, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

import DatePresentation from 'components/date-presentation/DatePresentation';
import { Farskapserklaering } from 'types/farskapserklaering';
import { isBorSammen } from 'utils/farskapserklaering';
import { formatFoedselsnummer } from 'utils/foedselsnummer';
import { getNameFromForelder } from 'utils/name';

import './FarskapserklaeringPresentation.less';

interface FarskapserklaeringPresentationProps {
    farskapserklaering: Farskapserklaering;
    showTitle?: boolean;
    showBorSammen?: boolean;
    border?: boolean;
}

function FarskapserklaeringPresentation({
    farskapserklaering,
    showTitle = true,
    showBorSammen = true,
    border,
}: FarskapserklaeringPresentationProps) {
    return (
        <Panel className="FarskapserklaeringPresentation" border={border}>
            {showTitle && (
                <Innholdstittel tag="p" className="FarskapserklaeringPresentation__title">
                    <FormattedMessage id="farskapserklaering" />
                </Innholdstittel>
            )}
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
                            <FormattedMessage id="termindato" />{' '}
                            <DatePresentation date={farskapserklaering.barn.termindato} />
                        </Normaltekst>
                    </>
                ) : (
                    <>
                        <Element>
                            <FormattedMessage id="farskapserklaering.bornChildren" />
                        </Element>
                        <Normaltekst>
                            <FormattedMessage id="foedselsnummer" />{' '}
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
                        <FormattedMessage id="mor" />
                    </Element>
                    <Normaltekst>{getNameFromForelder(farskapserklaering.mor)}</Normaltekst>
                    <Normaltekst>
                        {formatFoedselsnummer(farskapserklaering.mor?.foedselsnummer ?? '')}
                    </Normaltekst>
                </div>
                <div>
                    <Element>
                        <FormattedMessage id="far" />
                    </Element>
                    <Normaltekst>{getNameFromForelder(farskapserklaering.far)}</Normaltekst>
                    <Normaltekst>
                        {formatFoedselsnummer(farskapserklaering.far?.foedselsnummer ?? '')}
                    </Normaltekst>
                </div>
            </div>
            {showBorSammen && (
                <>
                    <Undertittel tag="p" className="FarskapserklaeringPresentation__borSammen">
                        <FormattedMessage id="farskapserklaering.borSammen" />
                    </Undertittel>
                    <Normaltekst>
                        <FormattedMessage
                            id={
                                isBorSammen(farskapserklaering)
                                    ? 'farskapserklaering.borSammen.yes'
                                    : 'farskapserklaering.borSammen.no'
                            }
                        />
                    </Normaltekst>
                </>
            )}
        </Panel>
    );
}

export default FarskapserklaeringPresentation;
