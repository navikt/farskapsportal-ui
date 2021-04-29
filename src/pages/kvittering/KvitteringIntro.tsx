import {Success} from '@navikt/ds-icons';
import Panel from 'nav-frontend-paneler';
import {Normaltekst} from 'nav-frontend-typografi';
import {FormattedMessage, useIntl} from 'react-intl';

import ExternalLink from 'components/external-link/ExternalLink';
import {Farskapserklaering} from 'types/farskapserklaering';
import {isBrukerFar} from 'utils/farskapserklaering';
import {formatDate, getMessage} from 'utils/intl';

import {useStore} from "../../store/Context";
import {Path} from "../../types/path";

import './KvitteringIntro.less';

interface KvitteringIntroProps {
    erklaering: Farskapserklaering;
}

function KvitteringIntro({ erklaering }: KvitteringIntroProps) {
    return (
        <Panel className="KvitteringIntro" border={true}>
            <Success id="success-icon" aria-label="Success icon" role="img" focusable={false} />
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

// TODO: change oversikt link ?
function KvitteringIntroMor({ erklaering }: { erklaering: Farskapserklaering }) {
    const intl = useIntl();
    const [{ language }] = useStore();
    const oversiktLinkPath = `/${language}${Path.Oversikt}`;

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
                <FormattedMessage id="kvittering.intro.mor.4"/>
                <a href={oversiktLinkPath} >
                    {getMessage(intl, 'kvittering.intro.mor.link')}
                </a>
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
                    <a href={oversiktLinkPath}>
                        {getMessage(intl, 'kvittering.intro.mor.link')}
                    </a>
                </Normaltekst>
                <ExternalLink href={getMessage(intl, 'kvittering.intro.mor.link')} />
            </>
        );
    };

    return erklaering.dokument?.signertAvFar
        ? farSignert(erklaering.dokument.signertAvFar)
        : farIkkeSignert();
}

// TODO: change oversikt link ?
function KvitteringIntroFar({ erklaering }: { erklaering: Farskapserklaering }) {
    const intl = useIntl();
    const [{ language }] = useStore();
    const oversiktLinkPath = `/${language}${Path.Oversikt}`;

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
                <a href={oversiktLinkPath}>
                    {getMessage(intl, 'kvittering.intro.far.link')}
                </a>
            </Normaltekst>
        </>
    );
}

export default KvitteringIntro;
