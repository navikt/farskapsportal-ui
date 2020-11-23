import { Hovedknapp, Knapp } from 'nav-frontend-knapper';

import './FormButtons.less';

interface FormButtonsProps {
    submitText: string;
    cancelText: string;
    onCancel: () => void;
    submitSpinner?: boolean;
}

function FormButtons({ submitText, cancelText, onCancel, submitSpinner }: FormButtonsProps) {
    return (
        <div className="FormButtons">
            <Hovedknapp htmlType="submit" spinner={submitSpinner} autoDisableVedSpinner={true}>
                {submitText}
            </Hovedknapp>
            <Knapp htmlType="button" onClick={onCancel}>
                {cancelText}
            </Knapp>
        </div>
    );
}

export default FormButtons;
