import { useEffect } from 'react';
import { useIntl } from 'react-intl';

import { fetchUser } from 'api/fetchUser';
import ErrorPage from 'components/error-page/ErrorPage';
import NotPermitted from 'components/not-permitted/NotPermitted';
import Spinner from 'components/spinner/Spinner';
import { useStore } from 'store/Context';
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
            fetchUser(dispatch);
        }
    }, [userInfo, dispatch]);

    switch (userInfo.status) {
        case 'PENDING':
            return <Spinner />;
        case 'NOT_PERMITTED':
            return <NotPermitted feilkode={userInfo.data} />;
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
