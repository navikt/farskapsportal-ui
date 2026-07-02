import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import Spinner from 'components/spinner/Spinner';
import { getCookie, redirectLoginCookie, removeCookie } from 'utils/cookies';

function RedirectAfterLogin(props: { children: JSX.Element }) {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const redirectTo = getCookie(redirectLoginCookie);
        if (redirectTo) {
            removeCookie(redirectLoginCookie);
            navigate(redirectTo, { replace: true });
        }
        setLoading(false);
    }, [navigate]);

    return loading ? <Spinner /> : props.children;
}

export default RedirectAfterLogin;
