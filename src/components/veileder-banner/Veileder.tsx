import VeilederSvg from 'assets/icons/veileder.svg?react';

import './Veileder.css';

export interface VeilederProps {
    type?: 'happy' | 'unsure' | 'hesitant';
}

function Veileder({ type = 'happy' }: VeilederProps) {
    const svgClassName = `Veileder Veileder--${type}`;

    return (
        <VeilederSvg
            className={svgClassName}
            style={{ maxWidth: '8.5rem', marginBottom: '-4.25rem' }}
        />
    );
}

export default Veileder;
