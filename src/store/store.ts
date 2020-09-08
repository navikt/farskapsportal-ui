import { AuthInfo, FetchAuthInfo } from 'types/auth';
import { HTTPError } from 'types/error';

export const initialState: Store = {
    authInfo: { status: 'PENDING' } as FetchAuthInfo,
};

export interface Store {
    authInfo: FetchAuthInfo;
}

export type Action =
    | {
          type: 'SET_AUTH_SUCCESS';
          payload: AuthInfo;
      }
    | {
          type: 'SET_AUTH_FAILURE';
          payload: HTTPError;
      };

export const reducer = (state: Store, action: Action): Store => {
    switch (action.type) {
        case 'SET_AUTH_SUCCESS':
            return {
                ...state,
                authInfo: {
                    status: 'SUCCESS',
                    data: action.payload,
                },
            };
        case 'SET_AUTH_FAILURE':
            return {
                ...state,
                authInfo: {
                    status: 'FAILURE',
                    error: action.payload,
                },
            };
        default:
            return state;
    }
};
