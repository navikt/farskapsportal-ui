import { FormattedMessage } from 'react-intl';
import { Hovedknapp } from 'nav-frontend-knapper';

import { Path } from 'types/path';
import { UserInfo } from 'types/user';
import { hasOngoingTermindatoErklaering } from 'utils/farskapserklaering';
import { useNavigateTo } from 'utils/hooks/useNavigateTo';

import './ToSkjemaButton.less';

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
        <Hovedknapp className="ToSkjemaButton" htmlType="button" onClick={goToSkjema}>
            <FormattedMessage id="oversikt.goToSkjemaButton" />
        </Hovedknapp>
    );
}

export default ToSkjemaButton;
