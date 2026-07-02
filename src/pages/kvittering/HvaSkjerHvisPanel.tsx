import { BodyShort, VStack } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';

import { Farskapserklaering } from 'types/farskapserklaering';
import InfoExpandablePanel from 'components/info-expandable-panel/InfoExpandablePanel';
import { isBrukerFar, isSignedByFar, isTermindatoErklaering } from 'utils/farskapserklaering';
import KvitteringInfoPanelContent from './KvitteringInfoPanelContent';

interface HvaSkjerHvisPanelProps {
    erklaering: Farskapserklaering;
}

function HvaSkjerHvisPanel({ erklaering }: HvaSkjerHvisPanelProps) {
    const isFar = isBrukerFar(erklaering);
    const isTermindato = isTermindatoErklaering(erklaering);

    if (isFar && !isTermindato) {
        return null;
    }

    if (!isFar && !isTermindato && isSignedByFar(erklaering)) {
        return null;
    }

    const renderContent = () => {
        if (isFar) {
            return (
                <VStack gap="space-32">
                    <FoedtIUtlandet />
                    <BarnetDoer />
                </VStack>
            );
        } else {
            if (isTermindato) {
                return (
                    <VStack gap="space-32">
                        {!isSignedByFar(erklaering) && <FarSignererIkkeTermindato />}
                        <FoedtIUtlandet />
                        <BarnetDoer />
                    </VStack>
                );
            } else {
                return <FarSignererIkkeFoedselsnummer />;
            }
        }
    };

    return (
        <InfoExpandablePanel titleId="kvittering.hvaSkjerHvis.title">
            {renderContent()}
        </InfoExpandablePanel>
    );
}

function FarSignererIkkeTermindato() {
    return (
        <KvitteringInfoPanelContent titleId="kvittering.hvaSkjerHvis.farSignererIkke.title">
            <BodyShort>
                <FormattedMessage id="kvittering.hvaSkjerHvis.farSignererIkke.termindato.text" />
            </BodyShort>
        </KvitteringInfoPanelContent>
    );
}

function FarSignererIkkeFoedselsnummer() {
    return (
        <KvitteringInfoPanelContent titleId="kvittering.hvaSkjerHvis.farSignererIkke.title">
            <BodyShort>
                <FormattedMessage id="kvittering.hvaSkjerHvis.farSignererIkke.foedselsnummer.text" />
            </BodyShort>
        </KvitteringInfoPanelContent>
    );
}

function FoedtIUtlandet() {
    return (
        <KvitteringInfoPanelContent titleId="kvittering.hvaSkjerHvis.foedtIUtlandet.title">
            <BodyShort>
                <FormattedMessage id="kvittering.hvaSkjerHvis.foedtIUtlandet.text" />
            </BodyShort>
        </KvitteringInfoPanelContent>
    );
}

function BarnetDoer() {
    return (
        <KvitteringInfoPanelContent titleId="kvittering.hvaSkjerHvis.barnetDoer.title">
            <BodyShort>
                <FormattedMessage id="kvittering.hvaSkjerHvis.barnetDoer.text" />
            </BodyShort>
        </KvitteringInfoPanelContent>
    );
}

export default HvaSkjerHvisPanel;
