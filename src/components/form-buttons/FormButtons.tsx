import React from 'react';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';

import './FormButtons.less';

interface FormButtonsProps {
    submitText: string;
    cancelText: string;
    onCancel: () => void;
}

function FormButtons({ submitText, cancelText, onCancel }: FormButtonsProps) {
    return (
        <div className="FormButtons">
            <Hovedknapp htmlType="submit">{submitText}</Hovedknapp>
            <Knapp htmlType="button" onClick={onCancel}>
                {cancelText}
            </Knapp>
        </div>
    );
}

export default FormButtons;
