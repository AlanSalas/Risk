import {
    CHECK_AUTHORIZATION,
    AUTH_USER,
    AUTH_ERROR,
    RESET_AUTH_ERROR,
    HAS_STORED_CREDENTIALS,
    STORED_CREDENTIALS_DELETED,
    LOGIN_LOADING, 
    COMPLETED
} from './types';
import {
    AsyncStorage
} from "react-native"
import httpClient from './../../helpers/httpclient'
import AppSettings from '../../settings/api.settings';

export const checkAuthorization = () => {
    return {
        type: CHECK_AUTHORIZATION,
        payload: ''
    }
}
export const login = (formProps) => async dispatch => {
    try {
        dispatch({
            type: LOGIN_LOADING, 
            payload: null
        })
        const response = await httpClient.post(`${AppSettings.API_URL}/users/login`, formProps);
        const {
            id,
            userId
        } = response;
        if (id && userId) {
            await AsyncStorage.setItem('@auth:token', id);
            if (formProps.remember) {
                await AsyncStorage.setItem('@auth:username', formProps.username);
                await AsyncStorage.setItem('@auth:password', formProps.password);

            }
            dispatch({
                type: AUTH_USER,
                payload: id
            });
        } else {
            dispatch({
                type: AUTH_ERROR,
                payload: 'Invalid login credentials'
            });
        }
    } catch (e) {
        console.log(e);
        dispatch({
            type: AUTH_ERROR,
            payload: 'Invalid login credentials'
        });
    }
};

export const logout = () => {
    return {
        type: AUTH_USER,
        payload: ''
    };
};

export const resetError = () => {
    return {
        type: RESET_AUTH_ERROR,
        payload: ''
    };
}

export const CheckIfExistsCredentials = () => async dispatch => {
    const username = await AsyncStorage.getItem('@auth:username');
    const password = await AsyncStorage.getItem('@auth:password');
    if(username && password) {
        dispatch({
            type: HAS_STORED_CREDENTIALS,
            payload : { username , password }
        })
    }
}

export const DeleteStoredCredentials = () =>  async dispatch => {
    AsyncStorage.removeItem('@auth:username')
    AsyncStorage.removeItem('@auth:password')
    dispatch({
        type: STORED_CREDENTIALS_DELETED,
        payload : { }
    })
}