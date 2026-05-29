import { Farskapserklaering } from '../../types/farskapserklaering';
import { isSignedByFar } from '../../utils/farskapserklaering';
import { FormattedMessage } from 'react-intl';
import { BodyShort } from '@navikt/ds-react';
import { CheckmarkCircleFillIcon } from '@navikt/aksel-icons';

import './ProsessIndikator.css';

// TODO: Bytt ut med relevant komponent naar den er publisert

interface ProsessIndikatorProps {
    erklaering: Farskapserklaering;
}

// TODO: Check if erklaering has been archived and change icon?
function ProsessIndikator({ erklaering }: ProsessIndikatorProps) {
    const signedByFar = isSignedByFar(erklaering);

    return (
        <div className="ProsessIndikator">
            <ProsessSteg textId="kvittering.prosessIndikator.step.1" iconType="checked" />
            <div className="ProsessIndikator__line" />
            <ProsessSteg
                textId="kvittering.prosessIndikator.step.2"
                iconType={signedByFar ? 'checked' : 'circle'}
            />
            <div className="ProsessIndikator__line" />
            <ProsessSteg
                textId="kvittering.prosessIndikator.step.3"
                iconType={signedByFar ? 'circle' : 'dot'}
            />
        </div>
    );
}

type IconType = 'checked' | 'circle' | 'dot';

function ProsessSteg({ textId, iconType }: { textId: string; iconType: IconType }) {
    return (
        <span className="Step">
            <ProsessStegIcon iconType={iconType} />
            <BodyShort className={`Step__label ${iconType === 'circle' ? 'bold' : ''}`}>
                <FormattedMessage id={textId} />
            </BodyShort>
        </span>
    );
}

function ProsessStegIcon({ iconType }: { iconType: IconType }) {
    switch (iconType) {
        case 'checked':
            return (
                <CheckmarkCircleFillIcon
                    className="ProsessStegIcon"
                    aria-label="OK icon"
                    role="img"
                />
            );
        case 'circle':
            return (
                <div className="ProsessStegIcon__circle">
                    <div className="ProsessStegIcon__circle__inner" />
                </div>
            );
        case 'dot':
            return (
                <div className="ProsessStegIcon__circle white dot">
                    <div className="ProsessStegIcon__circle__inner gray" />
                </div>
            );
    }
}

export default ProsessIndikator;
