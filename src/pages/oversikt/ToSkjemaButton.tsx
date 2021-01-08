import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Hovedknapp } from 'nav-frontend-knapper';

import { Path } from 'types/path';
import { UserInfo } from 'types/user';

interface ToSkjemaButtonProps {
    userInfo: UserInfo;
}

function ToSkjemaButton({ userInfo }: ToSkjemaButtonProps) {
    const history = useHistory();

    if (!userInfo.kanOppretteFarskapserklaering) {
        return null;
    }

    const goToSkjema = () => {
        history.push(Path.Skjema);
    };

    return (
        <Hovedknapp htmlType="button" onClick={goToSkjema}>
            <FormattedMessage id="oversikt.goToSkjemaButton" />
        </Hovedknapp>
    );
}

export default ToSkjemaButton;
