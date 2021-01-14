import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

import Spinner from 'components/spinner/Spinner';
import { redirectLoginCookie } from 'utils/cookies';

function RedirectAfterLogin(props: { children: JSX.Element }) {
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

    return loading ? <Spinner /> : props.children;
}

export default RedirectAfterLogin;
