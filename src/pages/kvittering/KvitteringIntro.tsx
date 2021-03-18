import { Success } from '@navikt/ds-icons';
import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage, useIntl } from 'react-intl';

import DatePresentation from 'components/date-presentation/DatePresentation';
import ExternalLink from 'components/external-link/ExternalLink';
import { Farskapserklaering } from 'types/farskapserklaering';
import { isBrukerFar } from 'utils/farskapserklaering';
import { getMessage } from 'utils/intl';

import './KvitteringIntro.less';

interface KvitteringIntroProps {
    erklaering: Farskapserklaering;
}

function KvitteringIntro({ erklaering }: KvitteringIntroProps) {
    return (
        <section className="KvitteringIntro">
            <Success id="success-icon" aria-label="Success icon" role="img" focusable={false} />
            {isBrukerFar(erklaering) ? (
                <KvitteringIntroFar erklaering={erklaering} />
            ) : (
                <KvitteringIntroMor erklaering={erklaering} />
            )}
        </section>
    );
}

function KvitteringIntroMor({ erklaering }: { erklaering: Farskapserklaering }) {
    const intl = useIntl();

    return (
        <div>
            <Normaltekst>
                <FormattedMessage id="kvittering.intro.mor.1" />
                {erklaering.dokument?.signertAvMor && (
                    <>
                        {' '}
                        <DatePresentation date={erklaering.dokument.signertAvMor} />
                    </>
                )}
                .
            </Normaltekst>
            <Normaltekst>
                <FormattedMessage id="kvittering.intro.mor.2" />
            </Normaltekst>
            <Normaltekst>
                <FormattedMessage id="kvittering.intro.mor.3" />
                <ExternalLink href={getMessage(intl, 'kvittering.intro.mor.link')} />
            </Normaltekst>
        </div>
    );
}

function KvitteringIntroFar({ erklaering }: { erklaering: Farskapserklaering }) {
    return (
        <Normaltekst>
            <FormattedMessage id="kvittering.intro.far" />
            {erklaering.dokument?.signertAvFar && (
                <>
                    {' '}
                    <DatePresentation date={erklaering.dokument.signertAvFar} />
                </>
            )}
            .
        </Normaltekst>
    );
}

export default KvitteringIntro;
