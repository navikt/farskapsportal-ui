import { FormattedMessage } from 'react-intl';
import { Hovedknapp } from 'nav-frontend-knapper';

import { Path } from 'types/path';
import { UserInfo } from 'types/user';
import { useNavigateTo } from 'utils/hooks/useNavigateTo';

interface ToSkjemaButtonProps {
    userInfo: UserInfo;
}

function ToSkjemaButton({ userInfo }: ToSkjemaButtonProps) {
    const navigateTo = useNavigateTo();

    if (!userInfo.kanOppretteFarskapserklaering) {
        return null;
    }

    const goToSkjema = () => {
        navigateTo(Path.Skjema);
    };

    return (
        <Hovedknapp htmlType="button" onClick={goToSkjema}>
            <FormattedMessage id="oversikt.goToSkjemaButton" />
        </Hovedknapp>
    );
}

export default ToSkjemaButton;
