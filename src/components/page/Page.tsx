import { ReactNode } from 'react';
import cls from 'classnames';

import Banner from 'components/banner/Banner';
import { Breadcrumb } from 'types/breadcrumbs';
import { useDekoratorBreadcrumbs } from 'utils/hooks/useDekoratorBreadcrumbs';

import './Page.less';

interface PageProps {
    children: ReactNode;
    titleId: string;
    breadcrumbs?: Breadcrumb[];
    className?: string;
}

function Page({ breadcrumbs, children, className, titleId }: PageProps) {
    useDekoratorBreadcrumbs(breadcrumbs);

    return (
        <div className={cls('Page', className)}>
            <Banner titleId={titleId} />
            <div role="main" className="Page__content">
                {children}
            </div>
        </div>
    );
}

export default Page;
