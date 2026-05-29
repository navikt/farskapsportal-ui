import { ReactNode } from 'react';
import { BodyShort, Label } from '@navikt/ds-react';

import './SpeechBubble.css';

interface SpeechBubbleProps {
    title: string;
    text: ReactNode;
}

function SpeechBubble({ title, text }: SpeechBubbleProps) {
    return (
        <div className="SpeechBubble">
            <Label>{title}</Label>
            <BodyShort>{text}</BodyShort>
        </div>
    );
}

export default SpeechBubble;
