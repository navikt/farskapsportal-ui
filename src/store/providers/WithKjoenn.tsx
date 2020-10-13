import React, { ReactNode, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';

import { checkAuthFetchUser } from 'api/api';
import Error from 'components/error/Error';
import Spinner from 'components/spinner/Spinner';
import { setUserFailure, setUserSuccess } from 'store/actions';
import { useStore } from 'store/Context';
import { AlertError } from 'types/error';
import { Kjoenn } from 'types/kjoenn';
import { UserInfo } from 'types/user';

interface Props {
    kjoenn: Kjoenn;
    children: ReactNode;
}

function WithKjoenn(props: Props) {
    const [{ userInfo }, dispatch] = useStore();

    useEffect(() => {
        if (userInfo.status === 'PENDING') {
            checkAuthFetchUser()
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
            if (userInfo.data === props.kjoenn) {
                return <>{props.children}</>;
            } else {
                if (userInfo.data === Kjoenn.Kvinne) {
                    return <Redirect to="/mor" />;
                } else if (userInfo.data === Kjoenn.Mann) {
                    return <Redirect to="/far" />;
                } else {
                    return (
                        <AlertStripeFeil>
                            <FormattedMessage id="login.error" />
                        </AlertStripeFeil>
                    );
                }
            }
        case 'FAILURE':
            return <Error error={userInfo.error} />;
    }
}

export default WithKjoenn;
