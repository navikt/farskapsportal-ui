import { ReactNode } from 'react';

import { Alert, BodyShort, Heading } from '@navikt/ds-react';
import { Breadcrumb } from 'types/breadcrumbs';
import { useDekoratorBreadcrumbs } from 'utils/hooks/useDekoratorBreadcrumbs';
import { FormattedMessage } from 'react-intl';

import './Page.css';

interface PageProps {
    children: ReactNode;
    titleId: string;
    breadcrumbs?: Breadcrumb[];
    alertTextId?: string;
}

function Page({ breadcrumbs, children, titleId, alertTextId }: PageProps) {
    useDekoratorBreadcrumbs(breadcrumbs);

    return (
        <div className="Page">
            <PageAlert alertTextId={alertTextId} />
            <Heading level="1" size="large">
                <FormattedMessage id={titleId} />
            </Heading>
            <div role="main">{children}</div>
        </div>
    );
}

function PageAlert({ alertTextId }: { alertTextId?: string }) {
    if (!alertTextId) {
        return null;
    }

    return (
        <div className="PageAlert">
            <Alert variant="warning">
                <BodyShort>
                    <FormattedMessage id={alertTextId} />
                </BodyShort>
            </Alert>
        </div>
    );
}

export default Page;
