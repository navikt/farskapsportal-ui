import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import ButtonContainer from 'components/button-container/ButtonContainer';
import Error from 'components/error/Error';
import { getNewRedirectUrl } from 'api/api';
import { AlertError } from 'types/error';
import { Path } from 'types/path';
import { useNavigateTo } from 'utils/hooks/useNavigateTo';

interface SignerButtonsProps {
    erklaeringId: string;
}

function SignerButtons({ erklaeringId }: SignerButtonsProps) {
    const navigateTo = useNavigateTo();
    const [isPending, setIsPending] = useState(false);
    const [apiError, setApiError] = useState<AlertError | undefined>();

    const onSubmit = () => {
        setIsPending(true);
        setApiError(undefined);

        getNewRedirectUrl(erklaeringId)
            .then((redirectUrl) => {
                window.location.assign(redirectUrl);
            })
            .catch((error: AlertError) => {
                setIsPending(false);
                setApiError(error);
            });
    };

    const onCancel = () => {
        navigateTo(Path.Oversikt);
    };

    return (
        <>
            <div aria-live="polite">{apiError && <Error error={apiError} />}</div>
            <ButtonContainer>
                <Hovedknapp
                    htmlType="button"
                    onClick={onSubmit}
                    spinner={isPending}
                    autoDisableVedSpinner={true}
                >
                    <FormattedMessage id="signer.submit" />
                </Hovedknapp>
                <Knapp htmlType="button" onClick={onCancel}>
                    <FormattedMessage id="signer.cancel" />
                </Knapp>
            </ButtonContainer>
        </>
    );
}

export default SignerButtons;
