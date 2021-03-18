import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage, useIntl } from 'react-intl';

import ExternalLink from 'components/external-link/ExternalLink';
import { Farskapserklaering } from 'types/farskapserklaering';
import { isBorSammen, isBrukerFar } from 'utils/farskapserklaering';
import { getMessage } from 'utils/intl';
import KvitteringInfoPanel from './KvitteringInfoPanel';
import KvitteringInfoPanelContent from './KvitteringInfoPanelContent';

interface YtelserOgTjenesterPanelProps {
    erklaering: Farskapserklaering;
}

function YtelserOgTjenesterPanel({ erklaering }: YtelserOgTjenesterPanelProps) {
    const isFar = isBrukerFar(erklaering);
    const borSammen = isBorSammen(erklaering);

    const renderContent = () => {
        if (borSammen) {
            return (
                <>
                    <ForeldrepengerSvangerskapspengerEngangsstoenad />
                    <Barnetrygd />
                </>
            );
        } else {
            if (isFar) {
                return (
                    <>
                        <ForeldrepengerSvangerskapspengerEngangsstoenad />
                        <Barnetrygd />
                        <Barnebidrag />
                    </>
                );
            } else {
                return (
                    <>
                        <ForeldrepengerSvangerskapspengerEngangsstoenad />
                        <Barnetrygd />
                        <UtvidetBarnetrygd />
                        <Barnebidrag />
                        <StoenadTilEnsligMorEllerFar />
                    </>
                );
            }
        }
    };

    return (
        <KvitteringInfoPanel titleId="kvittering.ytelserOgTjenester.title">
            {renderContent()}
        </KvitteringInfoPanel>
    );
}

function ForeldrepengerSvangerskapspengerEngangsstoenad() {
    const intl = useIntl();

    return (
        <KvitteringInfoPanelContent titleId="kvittering.ytelserOgTjenester.foreldrepengerSvangerskapspengerEngangsstoenad.title">
            <Normaltekst>
                <FormattedMessage id="kvittering.ytelserOgTjenester.foreldrepengerSvangerskapspengerEngangsstoenad.text" />
            </Normaltekst>
            <ExternalLink
                href={getMessage(
                    intl,
                    'kvittering.ytelserOgTjenester.foreldrepengerSvangerskapspengerEngangsstoenad.link'
                )}
            />
        </KvitteringInfoPanelContent>
    );
}

function Barnetrygd() {
    const intl = useIntl();

    return (
        <KvitteringInfoPanelContent titleId="kvittering.ytelserOgTjenester.barnetrygd.title">
            <Normaltekst>
                <FormattedMessage id="kvittering.ytelserOgTjenester.barnetrygd.text" />
            </Normaltekst>
            <ExternalLink
                href={getMessage(intl, 'kvittering.ytelserOgTjenester.barnetrygd.link')}
            />
        </KvitteringInfoPanelContent>
    );
}

function UtvidetBarnetrygd() {
    const intl = useIntl();

    return (
        <KvitteringInfoPanelContent titleId="kvittering.ytelserOgTjenester.utvidetBarnetrygd.title">
            <Normaltekst>
                <FormattedMessage id="kvittering.ytelserOgTjenester.utvidetBarnetrygd.text" />
            </Normaltekst>
            <ExternalLink
                href={getMessage(intl, 'kvittering.ytelserOgTjenester.utvidetBarnetrygd.link')}
            />
        </KvitteringInfoPanelContent>
    );
}

function Barnebidrag() {
    const intl = useIntl();

    return (
        <KvitteringInfoPanelContent titleId="kvittering.ytelserOgTjenester.barnebidrag.title">
            <Normaltekst>
                <FormattedMessage id="kvittering.ytelserOgTjenester.barnebidrag.text" />
            </Normaltekst>
            <ExternalLink
                href={getMessage(intl, 'kvittering.ytelserOgTjenester.barnebidrag.link')}
            />
        </KvitteringInfoPanelContent>
    );
}

function StoenadTilEnsligMorEllerFar() {
    const intl = useIntl();

    return (
        <KvitteringInfoPanelContent titleId="kvittering.ytelserOgTjenester.stoenadTilEnsligMorEllerFar.title">
            <Normaltekst>
                <FormattedMessage id="kvittering.ytelserOgTjenester.stoenadTilEnsligMorEllerFar.text" />
            </Normaltekst>
            <ExternalLink
                href={getMessage(
                    intl,
                    'kvittering.ytelserOgTjenester.stoenadTilEnsligMorEllerFar.link'
                )}
            />
        </KvitteringInfoPanelContent>
    );
}

export default YtelserOgTjenesterPanel;
