import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Hovedknapp } from 'nav-frontend-knapper';

import { Path } from 'types/path';
import { UserInfo } from 'types/user';

interface ToSoeknadButtonProps {
    userInfo: UserInfo;
}

function ToSoeknadButton({ userInfo }: ToSoeknadButtonProps) {
    const history = useHistory();

    if (!userInfo.kanOppretteFarskapserklaering) {
        return null;
    }

    const goToSoeknad = () => {
        history.push(Path.Soeknad);
    };

    return (
        <Hovedknapp htmlType="button" onClick={goToSoeknad}>
            <FormattedMessage id="oversikt.goToSoeknadButton" />
        </Hovedknapp>
    );
}

export default ToSoeknadButton;
