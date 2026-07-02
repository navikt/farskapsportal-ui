import { FormattedMessage } from 'react-intl';
import { Button } from '@navikt/ds-react';
import { Path } from 'types/path';
import { UserInfo } from 'types/user';
import { hasOngoingTermindatoErklaering } from 'utils/farskapserklaering';
import { useNavigateTo } from 'utils/hooks/useNavigateTo';

interface ToSkjemaButtonProps {
    userInfo: UserInfo;
}

function ToSkjemaButton({ userInfo }: ToSkjemaButtonProps) {
    const navigateTo = useNavigateTo();

    if (
        !userInfo.kanOppretteFarskapserklaering ||
        userInfo.fnrNyligFoedteBarnUtenRegistrertFar?.length ||
        hasOngoingTermindatoErklaering(userInfo)
    ) {
        return null;
    }

    const goToSkjema = () => {
        navigateTo(Path.Skjema);
    };

    return (
        <Button type="button" variant="primary" onClick={goToSkjema}>
            <FormattedMessage id="oversikt.goToSkjemaButton" />
        </Button>
    );
}

export default ToSkjemaButton;
