import { ReactNode } from 'react';

import { Breadcrumb } from 'types/breadcrumbs';
import { useDekoratorBreadcrumbs } from 'utils/hooks/useDekoratorBreadcrumbs';
import {Sidetittel} from "nav-frontend-typografi";
import {FormattedMessage} from "react-intl";

import './Page.less'

interface PageProps {
    children: ReactNode;
    titleId: string;
    breadcrumbs?: Breadcrumb[];
}

function Page({ breadcrumbs, children, titleId }: PageProps) {
    useDekoratorBreadcrumbs(breadcrumbs);

    return (
        <div className="Page">
            <Sidetittel>
                <FormattedMessage id={titleId}/>
            </Sidetittel>
            <div role="main">{children}</div>
        </div>
    );
}

export default Page;
