import { ReactNode } from 'react';
import cls from 'classnames';

import Banner from 'components/banner/Banner';
import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs';
import { Breadcrumb } from 'types/breadcrumbs';

import './Page.less';

interface PageProps {
    children: ReactNode;
    titleId: string;
    breadcrumbs?: Breadcrumb[];
    className?: string;
}

function Page({ breadcrumbs, children, className, titleId }: PageProps) {
    return (
        <div className={cls('Page', className)}>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <Banner titleId={titleId} />
            <div role="main" className="Page__content">
                {children}
            </div>
        </div>
    );
}

export default Page;
