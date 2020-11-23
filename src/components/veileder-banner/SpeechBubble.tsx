import { ReactNode } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import './SpeechBubble.less';

interface SpeechBubbleProps {
    title: string;
    text: ReactNode;
}

function SpeechBubble({ title, text }: SpeechBubbleProps) {
    return (
        <div className="SpeechBubble">
            <Element>{title}</Element>
            <Normaltekst>{text}</Normaltekst>
        </div>
    );
}

export default SpeechBubble;
