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
            console.log('In fetchUser catch');
            console.log('error');
            console.log(error);
            if (error.feilkode && isUserNotPermitted(error)) {
                console.log('SetUserNotPermitted');
                dispatch(setUserNotPermitted(error.feilkode));
            } else if (error.code !== 401 && error.code !== 403) {
                dispatch(setUserFailure(error));
            }
        });
};
