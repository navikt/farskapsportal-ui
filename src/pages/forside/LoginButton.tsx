import { FormattedMessage } from 'react-intl';
import { Hovedknapp } from 'nav-frontend-knapper';

import { Path } from 'types/path';
import { useNavigateTo } from 'utils/hooks/useNavigateTo';

import './LoginButton.less';

function LoginButton() {
    const navigateTo = useNavigateTo();

    const goToOversikt = () => {
        navigateTo(Path.Oversikt);
    };

    return (
        <Hovedknapp className="LoginButton" onClick={goToOversikt}>
            <FormattedMessage id="forside.loginButton" />
        </Hovedknapp>
    );
}

export default LoginButton;
