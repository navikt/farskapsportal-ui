import { ReactNode } from 'react';
import { BodyShort, Box, Label } from '@navikt/ds-react';

import './SpeechBubble.css';

interface SpeechBubbleProps {
    title: string;
    text: ReactNode;
}

function SpeechBubble({ title, text }: SpeechBubbleProps) {
    return (
        <Box
            className="SpeechBubble"
            background="default"
            borderRadius="4"
            marginInline="auto"
            marginBlock="space-0 space-16"
            padding="space-16"
            position="relative"
            width="90%"
            maxWidth="30rem"
        >
            <Label>{title}</Label>
            <BodyShort>{text}</BodyShort>
        </Box>
    );
}

export default SpeechBubble;
