import { Normaltekst } from 'nav-frontend-typografi';
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
                <>
                    <FoedtIUtlandet />
                    <BarnetDoer />
                </>
            );
        } else {
            if (isTermindato) {
                return (
                    <>
                        {!isSignedByFar(erklaering) && <FarSignererIkkeTermindato />}
                        <FoedtIUtlandet />
                        <BarnetDoer />
                    </>
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
            <Normaltekst>
                <FormattedMessage id="kvittering.hvaSkjerHvis.farSignererIkke.termindato.text" />
            </Normaltekst>
        </KvitteringInfoPanelContent>
    );
}

function FarSignererIkkeFoedselsnummer() {
    return (
        <KvitteringInfoPanelContent titleId="kvittering.hvaSkjerHvis.farSignererIkke.title">
            <Normaltekst>
                <FormattedMessage id="kvittering.hvaSkjerHvis.farSignererIkke.foedselsnummer.text" />
            </Normaltekst>
        </KvitteringInfoPanelContent>
    );
}

function FoedtIUtlandet() {
    return (
        <KvitteringInfoPanelContent titleId="kvittering.hvaSkjerHvis.foedtIUtlandet.title">
            <Normaltekst>
                <FormattedMessage id="kvittering.hvaSkjerHvis.foedtIUtlandet.text" />
            </Normaltekst>
        </KvitteringInfoPanelContent>
    );
}

function BarnetDoer() {
    return (
        <KvitteringInfoPanelContent titleId="kvittering.hvaSkjerHvis.barnetDoer.title">
            <Normaltekst>
                <FormattedMessage id="kvittering.hvaSkjerHvis.barnetDoer.text" />
            </Normaltekst>
        </KvitteringInfoPanelContent>
    );
}

export default HvaSkjerHvisPanel;
