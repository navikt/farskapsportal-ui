import Veilederpanel from 'nav-frontend-veilederpanel';
import { ReactNode } from 'react';

import { ReactComponent as FamilieSvg } from 'assets/icons/familie.svg';

interface InfoPanelProps {
    children: ReactNode;
}

function InfoPanel({ children }: InfoPanelProps) {
    return (
        <div className="InfoPanel">
            <Veilederpanel type="plakat" svg={<FamilieSvg />} kompakt={true}>
                {children}
            </Veilederpanel>
        </div>
    );
}

export default InfoPanel;
