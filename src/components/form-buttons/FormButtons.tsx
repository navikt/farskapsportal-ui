import { Button } from '@navikt/ds-react';

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
            <Button type="submit" variant="primary" loading={submitSpinner}>
                {submitText}
            </Button>
            <Button type="button" variant="secondary" onClick={onCancel}>
                {cancelText}
            </Button>
        </ButtonContainer>
    );
}

export default FormButtons;
