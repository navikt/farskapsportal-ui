import classNames from 'classnames';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { ReactNode } from 'react';

import { ReactComponent as FamilieSvg } from 'assets/icons/familie.svg';

import './InfoPanel.less';

interface InfoPanelProps {
    children: ReactNode;
    className?: string;
}

function InfoPanel({ children, className }: InfoPanelProps) {
    return (
        <div className={classNames('InfoPanel', className)}>
            <Veilederpanel type="plakat" svg={<FamilieSvg />} kompakt={true}>
                {children}
            </Veilederpanel>
        </div>
    );
}

export default InfoPanel;
