import { HTTPError } from 'types/error';
import { FetchUserInfo, UserInfo } from 'types/user';

export const initialState: Store = {
    userInfo: { status: 'PENDING' } as FetchUserInfo,
};

export interface Store {
    userInfo: FetchUserInfo;
}

export type Action =
    | {
          type: 'SET_USER_SUCCESS';
          payload: UserInfo;
      }
    | {
          type: 'SET_USER_FAILURE';
          payload: HTTPError;
      };

export const reducer = (state: Store, action: Action): Store => {
    switch (action.type) {
        case 'SET_USER_SUCCESS':
            return {
                ...state,
                userInfo: {
                    status: 'SUCCESS',
                    data: action.payload,
                },
            };
        case 'SET_USER_FAILURE':
            return {
                ...state,
                userInfo: {
                    status: 'FAILURE',
                    error: action.payload,
                },
            };
        default:
            return state;
    }
};
