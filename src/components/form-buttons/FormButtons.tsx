import { Hovedknapp, Knapp } from 'nav-frontend-knapper';

import ButtonContainer from 'components/button-container/ButtonContainer';

interface FormButtonsProps {
    submitText: string;
    cancelText: string;
    onCancel: () => void;
    submitSpinner?: boolean;
}

function FormButtons({ submitText, cancelText, onCancel, submitSpinner }: FormButtonsProps) {
    return (
        <ButtonContainer>
            <Hovedknapp htmlType="submit" spinner={submitSpinner} autoDisableVedSpinner={true}>
                {submitText}
            </Hovedknapp>
            <Knapp htmlType="button" onClick={onCancel}>
                {cancelText}
            </Knapp>
        </ButtonContainer>
    );
}

export default FormButtons;
