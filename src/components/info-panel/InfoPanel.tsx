import React from 'react';
import { GuidePanel } from '@navikt/ds-react';
import './InfoPanel.css';

function InfoPanel({ children }: React.PropsWithChildren) {
    return <GuidePanel className="InfoPanel">{children}</GuidePanel>;
}

export default InfoPanel;
