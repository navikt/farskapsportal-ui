import classNames from 'classnames';
import { ReactNode } from 'react';

import './ContentContainer.less';

interface ContentContainerProps {
    children: ReactNode;
    className?: string;
}

function ContentContainer({ children, className }: ContentContainerProps) {
    return <div className={classNames('ContentContainer', className)}>{children}</div>;
}

export default ContentContainer;
