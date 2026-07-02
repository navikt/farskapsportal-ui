import { Button } from '@navikt/ds-react';
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
                <Button variant="secondary" type="button" onClick={onCancel}>
                    <FormattedMessage id="signer.cancel" />
                </Button>
                <Button
                    type="button"
                    variant="primary"
                    onClick={onSubmit}
                    loading={isPending}
                    disabled={isPending}
                >
                    <FormattedMessage id="signer.submit" />
                </Button>
            </ButtonContainer>
        </>
    );
}

export default SignerButtons;
