import { ReactNode } from 'react';

import Banner from 'components/banner/Banner';
import { Breadcrumb } from 'types/breadcrumbs';
import { useDekoratorBreadcrumbs } from 'utils/hooks/useDekoratorBreadcrumbs';

interface PageProps {
    children: ReactNode;
    titleId: string;
    breadcrumbs?: Breadcrumb[];
}

function Page({ breadcrumbs, children, titleId }: PageProps) {
    useDekoratorBreadcrumbs(breadcrumbs);

    return (
        <>
            <Banner titleId={titleId} />
            <div role="main">{children}</div>
        </>
    );
}

export default Page;
