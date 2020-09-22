import React, { ReactNode, useEffect } from 'react';

import { fetchUser } from 'api/api';
import Error from 'components/error/Error';
import Spinner from 'components/spinner/Spinner';
import { setUserFailure, setUserSuccess } from 'store/actions';
import { useStore } from 'store/Context';
import { AlertError } from 'types/error';
import { UserInfo } from 'types/user';

interface Props {
    children: ReactNode;
}

function WithAuth(props: Props) {
    const [{ userInfo }, dispatch] = useStore();

    useEffect(() => {
        if (userInfo.status === 'PENDING') {
            fetchUser()
                .then((userInfo: UserInfo) => {
                    dispatch(setUserSuccess(userInfo));
                })
                .catch((error: AlertError) => {
                    if (error.code !== 401 && error.code !== 403) {
                        dispatch(setUserFailure(error));
                    }
                });
        }
    }, [userInfo, dispatch]);

    switch (userInfo.status) {
        case 'PENDING':
            return <Spinner />;
        case 'SUCCESS':
            return <>{props.children}</>;
        case 'FAILURE':
            return <Error error={userInfo.error} />;
    }
}

export default WithAuth;
