import { Bleed, VStack } from '@navikt/ds-react';
import SpeechBubble from './SpeechBubble';
import Veileder, { VeilederProps } from './Veileder';

interface VeilederBannerProps {
    title: string;
    text: React.ReactNode;
    veileder?: VeilederProps;
}

function VeilederBanner({ title, text, veileder }: VeilederBannerProps) {
    return (
        <Bleed marginInline="full">
            <VStack
                className="VeilederBanner"
                align="center"
                marginBlock="space-0 space-64"
                paddingBlock="space-16 space-0"
                style={{ backgroundColor: '#c1b5d0' }}
            >
                <SpeechBubble title={title} text={text} />
                <Veileder {...veileder} />
            </VStack>
        </Bleed>
    );
}

export default VeilederBanner;
