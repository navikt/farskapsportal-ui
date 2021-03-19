import { Dispatch } from 'react';

import { Action, setUserFailure, setUserNotPermitted, setUserSuccess } from 'store/actions';
import { AlertError } from 'types/error';
import { UserInfo } from 'types/user';
import { isUserNotPermitted } from 'utils/feilkoder';
import { checkAuthFetchUser } from './api';

export const fetchUser = (dispatch: Dispatch<Action>) => {
    checkAuthFetchUser()
        .then((userInfo: UserInfo) => {
            dispatch(setUserSuccess(userInfo));
        })
        .catch((error: AlertError) => {
            if (error.feilkode && isUserNotPermitted(error)) {
                dispatch(setUserNotPermitted(error.feilkode));
            }

            if (error.code !== 401 && error.code !== 403) {
                dispatch(setUserFailure(error));
            }
        });
};
