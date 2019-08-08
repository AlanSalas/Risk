import {
    AsyncStorage
} from "react-native"
import httpClient from './../../helpers/httpclient';
import AppSettings from '../../settings/api.settings';
import {
    FETCH_ERROR,
    LOADING_SURVEY_TEMPLATE_LIST,
    SURVEY_TEMPLATE_LIST,
    SELECT_CURRENT_LANGUAGE,
    LOADING_SURVEY_TEMPLATE_BY_COMPANY,
    SURVEY_TEMPLATE_BY_COMPANY,
    COMPANY_SELECTED,
    LOADING_SURVEY_RESULT,
    SURVE_RESULT_COMPLETED,
    SELECT_SURVEY_TEMPLATE,
    LOADING_SURVEY_TEMPLATE_DETAIL,
    SURVEY_TEMPLATE_DETAIL_COMPLETED,
    LOADING_CREATE_SURVEY,
    CREATE_SURVEY_COMPLETED,
    CANCEL_UPDATE_SURVEY_ANSWER,
    UPDATE_SURVEY_ANSWER
} from "./types";

const groupByCompany = (surveyTemplates) => {
    const companies = [];
    for (let i = 0; i < surveyTemplates.length; i++) {
        const surveyTemplate = surveyTemplates[i];
        const selected = companies.find(a => {
            return a.id = surveyTemplate.company.id
        });
        if (!selected) {
            const company = {
                id: surveyTemplate.company.id,
                name: surveyTemplate.company.name,
                surveyTemplates: [surveyTemplate]
            }
            companies.push(company);
        } else {
            selected.surveyTemplates.push(surveyTemplate)
        }
    }
    return companies;
}

export const getSurveyTemplatesByCompany = () => async dispatch => {
    try {

        const loadingType = LOADING_SURVEY_TEMPLATE_BY_COMPANY
        dispatch({
            type: loadingType,
            payload: ''
        })
        const token = await AsyncStorage.getItem('@auth:token');
        if (token !== null) {
            const request = {
                access_token: token,
                actives: false
            }
            const response = await httpClient.get(`${AppSettings.API_URL}/surveyTemplates/own`, request);

            const byCompany = groupByCompany(response);
            dispatch({
                type: SURVEY_TEMPLATE_BY_COMPANY,
                payload: byCompany
            })

        } else {
            dispatch({
                type: NOT_AUTH,
                payload: ''
            })
        }

    } catch (error) {
        dispatch({
            type: FETCH_ERROR,
            payload: ''
        })
    }
}
/**
 * Return audits
 * @param {boolean} completed indicates if return completed audits
 */
export const getSurveysTemplate = () => async dispatch => {
    try {
        const loadingType = LOADING_SURVEY_TEMPLATE_LIST;
        dispatch({
            type: loadingType,
            payload: ''
        })
        const token = await AsyncStorage.getItem('@auth:token');
        if (token !== null) {
            const request = {
                access_token: token
            }
            const response = await httpClient.get(`${AppSettings.API_URL}/surveyTemplates/own`, request);
            dispatch({
                type: SURVEY_TEMPLATE_LIST,
                payload: response
            })

        } else {
            dispatch({
                type: NOT_AUTH,
                payload: ''
            })
        }

    } catch (error) {
        dispatch({
            type: FETCH_ERROR,
            payload: ''
        })
    }
}

export const getSurveyTemplateDetail = (id, languageId) => async dispatch => {
    try {
        dispatch({
            type: LOADING_SURVEY_TEMPLATE_DETAIL,
            payload: ''
        })
        const token = await AsyncStorage.getItem('@auth:token');
        if (token !== null) {
            const request = {
                access_token: token,
                SurveytemplateId: id,
                languageId: languageId
            }
            const response = await httpClient.get(`${AppSettings.API_URL}/surveyTemplates/detail`, request);
            dispatch({
                type: SURVEY_TEMPLATE_DETAIL_COMPLETED,
                payload: response
            })

        } else {
            dispatch({
                type: NOT_AUTH,
                payload: ''
            })
        }

    } catch (error) {
        dispatch({
            type: FETCH_ERROR,
            payload: ''
        })
    }

}

export const selectCurrentAudit = id => ({
    type: SELECT_CURRENT_AUDIT,
    id
})

export const selectCurrentCompany = (companyId) => async (dispatch, getState) => {
    try {
        const companies = getState().surveys.surveyTemplatesByCompany;
        let currentCompany = {};
        companies.forEach(company => {
            const selectedIndex = companyId.toString().indexOf(company.id.toString());
            if (selectedIndex === 0) {
                currentCompany = company;
            }
        });
        dispatch({
            type: COMPANY_SELECTED,
            payload: currentCompany
        });
    } catch (e) {
        console.log(e)
        dispatch({
            type: FETCH_ERROR,
            payload: ''
        })
    }
};

export const selectCurrentLanguage = id => ({
    type: SELECT_CURRENT_LANGUAGE,
    id
})

export const getSurveyTemplateResult = (surveyTemplateId, languageId) => async (dispatch, getState) => {
    try {

        dispatch({
            type: LOADING_SURVEY_RESULT,
            payload: ''
        })
        const token = await AsyncStorage.getItem('@auth:token');
        if (token !== null) {
            const request = {
                access_token: token,
                surveyTemplateId,
                languageId
            }
            const response = await httpClient.get(`${AppSettings.API_URL}/surveyTemplates/result`, request);
            dispatch({
                type: SURVE_RESULT_COMPLETED,
                payload: response
            })

        } else {
            dispatch({
                type: NOT_AUTH,
                payload: ''
            })
        }

    } catch (error) {
        dispatch({
            type: FETCH_ERROR,
            payload: ''
        })
    }
}

export const selectSurveyTemplate = id => ({
    type: SELECT_SURVEY_TEMPLATE,
    payload: id
})

export const createSurvey = (surveyTemplateId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: LOADING_CREATE_SURVEY,
            payload: ''
        })
        const token = await AsyncStorage.getItem('@auth:token');
        if (token !== null) {
            const request = {
                access_token: token,
                surveyTemplateId 
            }
            const response = await httpClient.post(`${AppSettings.API_URL}/surveys`, request);
            dispatch({
                type: CREATE_SURVEY_COMPLETED,
                payload: response && response.id ? response.id : null
            })

        } else {
            dispatch({
                type: NOT_AUTH,
                payload: ''
            })
        }

    } catch (error) {
        dispatch({
            type: FETCH_ERROR,
            payload: ''
        })
    }
}

export const cancelAnswerUpdated = () => ({
    type: CANCEL_UPDATE_SURVEY_ANSWER
});
export const updateAnswer = payload => ({
    type: UPDATE_SURVEY_ANSWER,
    payload
});
