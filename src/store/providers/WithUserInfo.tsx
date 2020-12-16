import { useEffect } from 'react';

import { checkAuthFetchUser } from 'api/api';
import Error from 'components/error/Error';
import Spinner from 'components/spinner/Spinner';
import { setUserFailure, setUserSuccess } from 'store/actions';
import { useStore } from 'store/Context';
import { AlertError } from 'types/error';
import { UserInfo } from 'types/user';

interface Props {
    children: (data: UserInfo) => JSX.Element | null;
}

function WithUserInfo(props: Props) {
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
        case 'FAILURE':
            return <Error error={userInfo.error} />;
        case 'SUCCESS':
            return props.children(userInfo.data);
    }
}

export default WithUserInfo;
