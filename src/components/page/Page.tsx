import { ReactNode } from 'react';
import cls from 'classnames';

import Banner from 'components/banner/Banner';

import './Page.less';

interface PageProps {
    children: ReactNode;
    titleId: string;
    className?: string;
}

function Page({ children, className, titleId }: PageProps) {
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
