import { Success } from '@navikt/ds-icons';
import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage, useIntl } from 'react-intl';

import ExternalLink from 'components/external-link/ExternalLink';
import { Farskapserklaering } from 'types/farskapserklaering';
import { isBrukerFar } from 'utils/farskapserklaering';
import { formatDate, getMessage } from 'utils/intl';

import './KvitteringIntro.less';

interface KvitteringIntroProps {
    erklaering: Farskapserklaering;
}

function KvitteringIntro({ erklaering }: KvitteringIntroProps) {
    return (
        <section className="KvitteringIntro">
            <Success id="success-icon" aria-label="Success icon" role="img" focusable={false} />
            <div>
                {isBrukerFar(erklaering) ? (
                    <KvitteringIntroFar erklaering={erklaering} />
                ) : (
                    <KvitteringIntroMor erklaering={erklaering} />
                )}
            </div>
        </section>
    );
}

function KvitteringIntroMor({ erklaering }: { erklaering: Farskapserklaering }) {
    const intl = useIntl();

    const farSignert = (signertAvFar: string) => (
        <>
            <Normaltekst>
                <FormattedMessage
                    id="kvittering.intro.mor.farSignert"
                    values={{ date: formatDate(intl, signertAvFar) }}
                />{' '}
                {erklaering.barn?.termindato ? (
                    <>
                        <FormattedMessage
                            id="kvittering.intro.termindato"
                            values={{ termindato: formatDate(intl, erklaering.barn?.termindato) }}
                        />
                    </>
                ) : (
                    <>
                        <FormattedMessage
                            id="kvittering.intro.foedselsnummer"
                            values={{ fnr: erklaering.barn?.foedselsnummer ?? '' }}
                        />
                    </>
                )}
            </Normaltekst>
            <Normaltekst>
                <FormattedMessage id="kvittering.intro.mor.4" />
                <ExternalLink href={getMessage(intl, 'kvittering.intro.mor.link')} />
            </Normaltekst>
        </>
    );

    const farIkkeSignert = () => {
        return (
            <>
                <Normaltekst>
                    <FormattedMessage
                        id="kvittering.intro.mor.1"
                        values={{ date: formatDate(intl, erklaering.dokument?.signertAvMor ?? '') }}
                    />
                </Normaltekst>
                <Normaltekst>
                    <FormattedMessage id="kvittering.intro.mor.2" />
                </Normaltekst>
                <Normaltekst>
                    <FormattedMessage id="kvittering.intro.mor.3" />
                </Normaltekst>
                <Normaltekst>
                    <FormattedMessage id="kvittering.intro.mor.4" />
                    <ExternalLink href={getMessage(intl, 'kvittering.intro.mor.link')} />
                </Normaltekst>
            </>
        );
    };

    return erklaering.dokument?.signertAvFar
        ? farSignert(erklaering.dokument.signertAvFar)
        : farIkkeSignert();
}

function KvitteringIntroFar({ erklaering }: { erklaering: Farskapserklaering }) {
    const intl = useIntl();

    return (
        <>
            <Normaltekst>
                <FormattedMessage
                    id="kvittering.intro.far.1"
                    values={{ date: formatDate(intl, erklaering.dokument?.signertAvFar ?? '') }}
                />{' '}
                {erklaering.barn?.termindato ? (
                    <>
                        <FormattedMessage
                            id="kvittering.intro.termindato"
                            values={{ termindato: formatDate(intl, erklaering.barn?.termindato) }}
                        />
                    </>
                ) : (
                    <>
                        <FormattedMessage
                            id="kvittering.intro.foedselsnummer"
                            values={{ fnr: erklaering.barn?.foedselsnummer ?? '' }}
                        />
                    </>
                )}
            </Normaltekst>
            <Normaltekst>
                <FormattedMessage id="kvittering.intro.far.2" />
            </Normaltekst>
            <Normaltekst>
                <FormattedMessage id="kvittering.intro.far.3" />
                <ExternalLink href={getMessage(intl, 'kvittering.intro.far.link')} />
            </Normaltekst>
        </>
    );
}

export default KvitteringIntro;