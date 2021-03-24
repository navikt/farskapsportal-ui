import { ReactNode } from 'react';

import './ButtonContainer.less';

interface ButtonContainerProps {
    children: ReactNode;
}

function ButtonContainer({ children }: ButtonContainerProps) {
    return <div className="ButtonContainer">{children}</div>;
}

export default ButtonContainer;
