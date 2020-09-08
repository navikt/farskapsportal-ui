import React, { ReactNode, useEffect } from 'react';

import { checkAuthFetchAuth } from 'clients/apiClients';
import Error from 'components/error/Error';
import Spinner from 'components/spinner/Spinner';
import { useStore } from 'store/Context';
import { AuthInfo } from 'types/auth';
import { AlertError } from 'types/error';

interface Props {
    children: ReactNode;
}

function WithAuth(props: Props) {
    const [{ authInfo }, dispatch] = useStore();

    useEffect(() => {
        if (authInfo.status === 'PENDING') {
            checkAuthFetchAuth()
                .then((authInfo: AuthInfo) => {
                    dispatch({ type: 'SET_AUTH_SUCCESS', payload: authInfo });
                })
                .catch((error: AlertError) => {
                    if (error.code !== 401 && error.code !== 403) {
                        dispatch({ type: 'SET_AUTH_FAILURE', payload: error });
                    }
                });
        }
    }, [authInfo, dispatch]);

    switch (authInfo.status) {
        case 'PENDING':
            return <Spinner />;
        case 'SUCCESS':
            return <>{props.children}</>;
        case 'FAILURE':
            return <Error error={authInfo.error} />;
    }
}

export default WithAuth;
