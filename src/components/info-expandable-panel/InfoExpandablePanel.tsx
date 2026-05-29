import { Accordion, Heading } from '@navikt/ds-react';
import { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

import './InfoExpandablePanel.css';

interface InfoExpandablePanelProps {
    children: ReactNode;
    titleId: string;
}

function InfoExpandablePanel({ children, titleId }: InfoExpandablePanelProps) {
    return (
            <Accordion.Item>
                <Accordion.Header>
                    <Heading level="3" size="small">
                        <FormattedMessage id={titleId} />
                    </Heading>
                </Accordion.Header>
                <Accordion.Content>{children}</Accordion.Content>
            </Accordion.Item>
    );
}

export default InfoExpandablePanel;
