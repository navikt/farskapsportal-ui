import React from 'react';

import { ReactComponent as VeilederSvg } from 'assets/icons/veileder.svg';

import './Veileder.less';

export interface VeilederProps {
    type?: 'happy' | 'unsure' | 'hesitant';
}

function Veileder({ type = 'happy' }: VeilederProps) {
    const svgClassName = `Veileder Veileder--${type}`;

    return <VeilederSvg className={svgClassName} />;
}

export default Veileder;
