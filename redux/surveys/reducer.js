import {
    SURVEY_TEMPLATE_LIST,
    LOADING_SURVEY_TEMPLATE_LIST,
    FETCH_ERROR,
    NOT_AUTH,
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
    CREATE_SURVEY_COMPLETED
} from './types';


const INITIAL_STATE = {
    surveyTemplates: [],
    surveyTemplatesByCompany: [],
    authError: false,
    fetchError: false,
    loadingSurveyTemplatesByCompany: false,
    loadingSurveyTemplates: false,
    currentAudit: null,
    audit: null,
    company: null,
    currentLanguage: 1,
    surveyTemplateResult: null, 
    loadingSurveyTemplateResult: false,
    currentSurveyTemplate: null,
    loadinfSurveyTemplateDetail: false,
    surveyTemplateDetail: null,
    loadingCreateSurvey: false,
    currentSurveyId: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case SURVEY_TEMPLATE_LIST:
            return { ...state,
                surveyTemplates: action.payload,
                loadingSurveyTemplates: false
            };

        case FETCH_ERROR:
            return { ...state,
                fetchError: true,
                loadingSurveyTemplates: false,

            };
        case NOT_AUTH:
            return { ...state,
                authError: true
            };
        case LOADING_SURVEY_TEMPLATE_LIST:
            return { ...state,
                loadingSurveyTemplates: true
            }
        case LOADING_SURVEY_TEMPLATE_BY_COMPANY:
            return {
                ...state,
                loadingSurveyTemplatesByCompany: true
            }
        case SURVEY_TEMPLATE_BY_COMPANY:
            return {
                ...state, 
                loadingSurveyTemplatesByCompany: false,
                surveyTemplatesByCompany: action.payload
            }
        case COMPANY_SELECTED:
            return {
                ...state,
                company: action.payload
            }
        case SELECT_CURRENT_LANGUAGE:
            
                return {
                    ...state,
                    currentLanguage: action.id
                };
            
        case LOADING_SURVEY_RESULT:
            return {
                ...state,
                loadingSurveyTemplateResult: true,
                surveyTemplateResult: null
            }
        case SURVE_RESULT_COMPLETED:
            return {
                ...state, 
                loadingSurveyTemplateResult: false,
                surveyTemplateResult: action.payload
            }
        case SELECT_SURVEY_TEMPLATE:
            return {
                ...state,
                currentSurveyTemplate: action.payload
            }
        case LOADING_SURVEY_TEMPLATE_DETAIL:
            return {
                ...state,
                loadinfSurveyTemplateDetail: true,
                surveyTemplateDetail: null
            }
        case SURVEY_TEMPLATE_DETAIL_COMPLETED:
            return {
                ...state, 
                loadinfSurveyTemplateDetail: false,
                surveyTemplateDetail: action.payload
            }
        case LOADING_CREATE_SURVEY:
            return {
                ...state,
                loadingCreateSurvey: true,
                currentSurveyId: null
            }
        case CREATE_SURVEY_COMPLETED:
            return  {
                ...state,
                loadingCreateSurvey: false,
                currentSurveyId: action.payload
            }
        
        
        default:
            return state;
    }
}