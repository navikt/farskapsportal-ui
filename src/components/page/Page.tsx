import { ReactNode } from 'react';

import { Breadcrumb } from 'types/breadcrumbs';
import { useDekoratorBreadcrumbs } from 'utils/hooks/useDekoratorBreadcrumbs';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import AlertStripe from 'nav-frontend-alertstriper';

import './Page.less';

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
            <Sidetittel>
                <FormattedMessage id={titleId} />
            </Sidetittel>
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
            <AlertStripe type="advarsel">
                <Normaltekst>
                    <FormattedMessage id={alertTextId} />
                </Normaltekst>
            </AlertStripe>
        </div>
    );
}

export default Page;
