import {Success, SuccessFilled} from '@navikt/ds-icons';
import Panel from 'nav-frontend-paneler';
import {Normaltekst, Systemtittel} from 'nav-frontend-typografi';
import { FormattedMessage, useIntl } from 'react-intl';

import { Farskapserklaering } from 'types/farskapserklaering';
import { isBrukerFar } from 'utils/farskapserklaering';
import { formatDate, getMessage } from 'utils/intl';

import { useStore } from '../../store/Context';
import { Path } from '../../types/path';

import './KvitteringIntro.less';

interface KvitteringIntroProps {
    erklaering: Farskapserklaering;
}

function KvitteringIntro({ erklaering }: KvitteringIntroProps) {
    return (
        <Panel className="KvitteringIntro" border={true}>
            <SuccessFilled id="success-icon" aria-label="Success icon" role="img" focusable={false} />
            <div>
                {isBrukerFar(erklaering) ? (
                    <KvitteringIntroFar erklaering={erklaering} />
                ) : (
                    <KvitteringIntroMor erklaering={erklaering} />
                )}
            </div>
        </Panel>
    );
}

function KvitteringIntroMor({ erklaering }: { erklaering: Farskapserklaering }) {
    const intl = useIntl();

    const farSignert = (signertAvFar: string) => (
        <>
            <Systemtittel>
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
            </Systemtittel>
        </>
    );

    const farIkkeSignert = () => {
        return (
            <>
                <Systemtittel>
                    <FormattedMessage
                        id="kvittering.intro.mor.1"
                        values={{ date: formatDate(intl, erklaering.dokument?.signertAvMor ?? '') }}
                    />
                </Systemtittel>
                {/*<Normaltekst>*/}
                {/*    <FormattedMessage id="kvittering.intro.mor.2" />*/}
                {/*</Normaltekst>*/}
                {/*<Normaltekst>*/}
                {/*    <FormattedMessage id="kvittering.intro.mor.3" />*/}
                {/*</Normaltekst>*/}
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
            <Systemtittel>
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
            </Systemtittel>
            {/*<Normaltekst>*/}
            {/*    <FormattedMessage id="kvittering.intro.far.2" />*/}
            {/*</Normaltekst>*/}
        </>
    );
}

export default KvitteringIntro;
