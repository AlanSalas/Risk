import {
    SELECT_CURRENT_LANGUAGE,
    LANGUAGES_COMPLETED,
    LANGUAGES_FAILED,
    LOADING_LANGUAGES
} from "./types";
import {
    AsyncStorage
} from 'react-native';
import httpClient from './../../helpers/httpclient';
import AppSettings from '../../settings/api.settings';

export const selectCurrentLanguage = payload => ({
    type: SELECT_CURRENT_LANGUAGE,
    payload
});

export const getLanguages = () => async dispatch => {
    dispatch({
        type: LOADING_LANGUAGES,
        payload: ''
    })
    const token = await AsyncStorage.getItem('@auth:token');
    if (token !== null) {
        const request = {
            access_token: token,
        }
        const response = await httpClient.get(`${AppSettings.API_URL}/languages`, request);
        dispatch({
            type: LANGUAGES_COMPLETED,
            payload: response
        })
    } else {
        dispatch({
            type: LANGUAGES_FAILED,
            payload: ''
        })
    }
}