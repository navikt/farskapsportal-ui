import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Spinner from 'components/spinner/Spinner';
import { getCookie, redirectLoginCookie, removeCookie } from 'utils/cookies';

function RedirectAfterLogin(props: { children: JSX.Element }) {
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        const redirectTo = getCookie(redirectLoginCookie);
        if (redirectTo) {
            removeCookie(redirectLoginCookie);
            history.replace(redirectTo);
        }
        setLoading(false);
    }, [history]);

    return loading ? <Spinner /> : props.children;
}

export default RedirectAfterLogin;
