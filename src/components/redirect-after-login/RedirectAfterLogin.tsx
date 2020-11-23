import { ReactNode, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

import Spinner from 'components/spinner/Spinner';
import { redirectLoginCookie } from 'utils/cookies';

interface RedirectAfterLoginProps {
    children: ReactNode;
}

function RedirectAfterLogin(props: RedirectAfterLoginProps) {
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        const redirectTo = Cookies.get(redirectLoginCookie);
        if (redirectTo) {
            Cookies.remove(redirectLoginCookie);
            history.replace(redirectTo);
        }
        setLoading(false);
    }, [history]);

    return loading ? <Spinner /> : <>{props.children}</>;
}

export default RedirectAfterLogin;
