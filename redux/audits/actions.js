import {
    AUDIT_LIST,
    COMPLETED_AUDIT_LIST,
    FETCH_ERROR,
    NOT_AUTH,
    LOADING_AUDIT_COMPLETE_LIST,
    LOADING_AUDIT_LIST,
    COMPLETED_AUDIT_TEMPLATE_DETAIL,
    COMPLETED_AUDIT_DETAIL,
    SELECT_CURRENT_TEMPLATE_AUDIT,
    SELECT_CURRENT_AUDIT,
    COMPLETED_COMPANY_DETAIL,
    CANCEL_UPDATE_ANSWER,
    UPDATE_ANSWER,
    COMPLETED_ANSWER_LIST,
    ERROR_ANSWER_LIST,
    AUDIT_COMPLETED,
    LOADING_AUDIT_TEMPLATE,
    COMPLETE_AUDIT,
    GLOBAL_LANGUAGE_SELECTED
} from './types';
import {
    AsyncStorage
} from "react-native"
import httpClient from './../../helpers/httpclient';
import AppSettings from '../../settings/api.settings';

const groupByCompany = (audits) => {
    const companies = [];
    for (let i = 0; i < audits.length; i++) {
        const audit = audits[i];
        if(audit.company) {
            const selected = companies.find(a => {
                return a.id = audit.company.id
            });
           
            if (!selected) {
                const company = {
                    id: audit.company.id,
                    name: audit.company.name,
                    audits: [audit]
                }
                companies.push(company);
                
            } else {
                
                selected.audits.push(audit)
            }
        }
       
    }
    
    return companies;
}

export const getAuditsByCompany = () => async dispatch => {
    try {
        
        const loadingType = LOADING_AUDIT_COMPLETE_LIST
        dispatch({
            type: loadingType,
            payload: ''
        })
        const token = await AsyncStorage.getItem('@auth:token');
        if (token !== null) {
            const request = {
                access_token: token,
            }
            const response = await httpClient.get(`${AppSettings.API_URL}/audits/own`, request);
            const completedAudits = response.filter(a => {
                return a.status.name == 'Done'
            })
            
           
            const byCompany = groupByCompany(completedAudits);
            
            
            dispatch({
                type: COMPLETED_AUDIT_LIST,
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
export const getAudits = (completed) => async dispatch => {
    try {
        const loadingType = LOADING_AUDIT_LIST;
        dispatch({
            type: loadingType,
            payload: ''
        })
        const token = await AsyncStorage.getItem('@auth:token');
        if (token !== null) {
            const request = {
                access_token: token,
            }
            const response = await httpClient.get(`${AppSettings.API_URL}/audits/own`, request);

            const pendingAudits = response.filter(a => {
                return a.status.name != 'Done'
            })
            dispatch({
                type: AUDIT_LIST,
                payload: pendingAudits
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

export const getTemplateAuditDetail = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: LOADING_AUDIT_TEMPLATE, payload: false})
        const token = await AsyncStorage.getItem('@auth:token');
        const currentLanguage = getState().global.currentLanguage;
        if (token !== null) {
            const request = {
                access_token: token,
                auditTemplateId: id,
                languageId: currentLanguage
            }
            const response = await httpClient.get(`${AppSettings.API_URL}/auditTemplates/detail`, request);
            dispatch({
                type: COMPLETED_AUDIT_TEMPLATE_DETAIL,
                payload: response
            })

        } else {
            dispatch({
                type: NOT_AUTH,
                payload: ''
            })
        }

    } catch (error) {
        console.log(error)
        dispatch({
            type: FETCH_ERROR,
            payload: ''
        })
    }
}
export const selectCurrentAuditTemplate = (templateId, id) => ({
    type: SELECT_CURRENT_TEMPLATE_AUDIT,
    payload: {templateId, id}
})
export const selectCurrentAudit = id => ({
    type: SELECT_CURRENT_AUDIT,
    id
})

export const selectCurrentCompany = (companyId) => async (dispatch, getState) => {
    try {
        const companies = getState().audits.completedAuditList;
        let currentCompany = {};
        companies.forEach(company => {
            const selectedIndex = companyId.toString().indexOf(company.id.toString());
            if (selectedIndex === 0) {
                currentCompany = company;
            }
        });
        dispatch({ type: COMPLETED_COMPANY_DETAIL, payload: currentCompany  });
    } catch (e) {
        console.log(e)
        dispatch({
            type: FETCH_ERROR,
            payload: ''
        })
    }
  };


  export const getAuditDetail = (id) => async (dispatch, getState) => {
    try {
        const token = await AsyncStorage.getItem('@auth:token');
        const currentLanguage = getState().global.currentLanguage;
        if (token !== null) {
            const request = {
                access_token: token,
                auditId: id,
                languageId: currentLanguage
            }
            const response = await httpClient.get(`${AppSettings.API_URL}/audits/detail`, request);
            dispatch({
                type: COMPLETED_AUDIT_DETAIL,
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

export const getAnswers = (auditId) => async dispatch => {
    try {
        dispatch({type: LOADING_AUDIT_TEMPLATE, payload: false})
        const token = await AsyncStorage.getItem('@auth:token');
        if (token !== null) {
            const request = {
                access_token: token
            }
            const url = `${AppSettings.API_URL}/audits/${auditId}/auditAnswers`;
            const response = await httpClient.get(url, request);
            dispatch({
                type: COMPLETED_ANSWER_LIST,
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
            type: ERROR_ANSWER_LIST,
            payload: ''
        })
    }
}

export const completeAudit = (auditId) => async dispatch => {
    try {
        dispatch({
            type: COMPLETE_AUDIT,
            payload: ''
        })
        const token = await AsyncStorage.getItem('@auth:token');
        if (token !== null) {
            //todo: generic way to get status done
            const request = {
                statusId : 3
            }
            const url = `${AppSettings.API_URL}/audits/${auditId}?access_token=${token}`;
            const response = await httpClient.patch(url, request);
            dispatch({
                type: AUDIT_COMPLETED,
                payload: response
            })

        } else {
            dispatch({
                type: NOT_AUTH,
                payload: ''
            })
        }

    } catch (error) {
        //todo:handle action result
        console.log(error);
    }
}


export const cancelAnswerUpdated = () => ({
    type: CANCEL_UPDATE_ANSWER
});
export const updateAnswer = payload => ({
    type: UPDATE_ANSWER,
    payload
});

export const globalLanguageSelected = () => ({
    type: GLOBAL_LANGUAGE_SELECTED
});
