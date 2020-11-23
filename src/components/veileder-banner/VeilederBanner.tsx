import { ReactNode } from 'react';

import SpeechBubble from './SpeechBubble';
import Veileder, { VeilederProps } from './Veileder';

import './VeilederBanner.less';

interface VeilederBannerProps {
    title: string;
    text: ReactNode;
    veileder?: VeilederProps;
}

function VeilederBanner({ title, text, veileder }: VeilederBannerProps) {
    return (
        <div className="VeilederBanner">
            <SpeechBubble title={title} text={text} />
            <Veileder {...veileder} />
        </div>
    );
}

export default VeilederBanner;
