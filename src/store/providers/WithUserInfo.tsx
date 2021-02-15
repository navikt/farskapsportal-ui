import { useEffect } from 'react';
import { useIntl } from 'react-intl';

import { checkAuthFetchUser } from 'api/api';
import ErrorPage from 'components/error-page/ErrorPage';
import Spinner from 'components/spinner/Spinner';
import { setUserFailure, setUserSuccess } from 'store/actions';
import { useStore } from 'store/Context';
import { AlertError } from 'types/error';
import { UserInfo } from 'types/user';
import { getMessage } from 'utils/intl';

interface Props {
    children: (data: UserInfo) => JSX.Element | null;
}

function WithUserInfo(props: Props) {
    const intl = useIntl();
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
            return (
                <ErrorPage
                    banner={{
                        title: getMessage(intl, 'withUserInfoError.banner.title'),
                        text: getMessage(intl, 'withUserInfoError.banner.text'),
                    }}
                    title={getMessage(intl, 'withUserInfoError.title')}
                    text={getMessage(intl, 'withUserInfoError.text')}
                />
            );
        case 'SUCCESS':
            return props.children(userInfo.data);
    }
}

export default WithUserInfo;
