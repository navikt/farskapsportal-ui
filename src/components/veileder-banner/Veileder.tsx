import VeilederSvg from 'assets/icons/veileder.svg?react';

import './Veileder.css';

export interface VeilederProps {
    type?: 'happy' | 'unsure' | 'hesitant';
}

function Veileder({ type = 'happy' }: VeilederProps) {
    const svgClassName = `Veileder Veileder--${type}`;

    return <VeilederSvg className={svgClassName} />;
}

export default Veileder;
