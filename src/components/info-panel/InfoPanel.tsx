import classNames from 'classnames';
import { ReactNode } from 'react';

import FamilieSvg from 'assets/icons/familie.svg?react';

import './InfoPanel.css';

interface InfoPanelProps {
    children: ReactNode;
    className?: string;
}

function InfoPanel({ children, className }: InfoPanelProps) {
    return (
        <div className={classNames('InfoPanel', className)}>
            <div className="InfoPanel__svg-wrapper">
                <FamilieSvg />
            </div>
            <div className="InfoPanel__content">{children}</div>
        </div>
    );
}

export default InfoPanel;
