import { BodyShort } from '@navikt/ds-react';
import { FormattedMessage, useIntl } from 'react-intl';

import ExternalLink from 'components/external-link/ExternalLink';
import InfoExpandablePanel from 'components/info-expandable-panel/InfoExpandablePanel';
import { Farskapserklaering } from 'types/farskapserklaering';
import { isBorSammen, isBrukerFar } from 'utils/farskapserklaering';
import { getMessage } from 'utils/intl';
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
        <InfoExpandablePanel titleId="kvittering.ytelserOgTjenester.title">
            {renderContent()}
        </InfoExpandablePanel>
    );
}

function ForeldrepengerSvangerskapspengerEngangsstoenad() {
    const intl = useIntl();

    return (
        <KvitteringInfoPanelContent titleId="kvittering.ytelserOgTjenester.foreldrepengerSvangerskapspengerEngangsstoenad.title">
            <BodyShort>
                <FormattedMessage id="kvittering.ytelserOgTjenester.foreldrepengerSvangerskapspengerEngangsstoenad.text" />
            </BodyShort>
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
            <BodyShort>
                <FormattedMessage id="kvittering.ytelserOgTjenester.barnetrygd.text" />
            </BodyShort>
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
            <BodyShort>
                <FormattedMessage id="kvittering.ytelserOgTjenester.utvidetBarnetrygd.text" />
            </BodyShort>
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
            <BodyShort>
                <FormattedMessage id="kvittering.ytelserOgTjenester.barnebidrag.text" />
            </BodyShort>
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
            <BodyShort>
                <FormattedMessage id="kvittering.ytelserOgTjenester.stoenadTilEnsligMorEllerFar.text" />
            </BodyShort>
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
