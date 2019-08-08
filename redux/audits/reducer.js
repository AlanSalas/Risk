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
    UPDATE_ANSWER,
    CANCEL_UPDATE_ANSWER,
    ANSWER_UPDATED,
    COMPLETED_ANSWER_LIST,
    ERROR_ANSWER_LIST,
    ADD_ANSWER_TO_LIST,
    AUDIT_COMPLETED,
    LOADING_AUDIT_TEMPLATE,
    COMPLETE_AUDIT,
    GLOBAL_LANGUAGE_SELECTED
} from './types';

const INITIAL_STATE = {
    pendingAuditList: [],
    completedAuditList: [],
    authError: false,
    fetchError: false,
    loadingCompleteAudits: false,
    loadingAudits: false,
    currentAuditTemplate: null,
    loadingTemplateDetail: false,
    currentAudit: null,
    currentAuditId: null,
    auditTemplate: null,
    audit: null,
    company: null,
    savingAnswer: false,
    currentAnswers: null,
    completedAudit: false,
    loadingCompleteId: false
};

const removeFromArray = (arr, id) => {
    if (arr && arr.length > 0) {
        return arr.filter((ele) => {
            return ele.id !== id;
        });
    } else {
        return []
    }

}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case AUDIT_LIST:
            return { ...state,
                pendingAuditList: action.payload,
                loadingAudits: false,
                completedAudit: false
            };
        case COMPLETED_AUDIT_LIST:
            return { ...state,
                completedAuditList: action.payload,
                loadingCompleteAudits: false,
                completedAudit: false
            };
        case FETCH_ERROR:
            return { ...state,
                fetchError: true,
                loadingAudits: false,
                loadingCompleteAudits: false
            };
        case NOT_AUTH:
            return { ...state,
                authError: true
            };
        case LOADING_AUDIT_LIST:
            return { ...state,
                loadingAudits: true
            }
        case LOADING_AUDIT_COMPLETE_LIST:
            return { ...state,
                loadingCompleteAudits: true
            }

        case SELECT_CURRENT_TEMPLATE_AUDIT:
            {
                return {
                    ...state,
                    currentAuditTemplate: action.payload.templateId,
                    currentAuditId: action.payload.id
                };
            }
        case SELECT_CURRENT_AUDIT:
            {
                return {
                    ...state,
                    currentAudit: action.id,
                    completedAudit: false
                };
            }
        case COMPLETED_COMPANY_DETAIL:
            return { ...state,
                company: action.payload
            }
        case COMPLETED_AUDIT_TEMPLATE_DETAIL:
            return { ...state,
                auditTemplate: action.payload,
                loadingTemplateDetail: false
            }
        case COMPLETED_AUDIT_DETAIL:
            return { ...state,
                audit: action.payload
            }
        case UPDATE_ANSWER:

            return { ...state,
                savingAnswer: true
            }
        case CANCEL_UPDATE_ANSWER:
            return { ...state,
                savingAnswer: false
            };
        case ANSWER_UPDATED:
            const inArray = state.currentAnswers ? state.currentAnswers.find((a) => {
                return a.id === action.payload.id
            }) : null;
            let answerList = state.currentAnswers;
            if (inArray) {
                answerList = removeFromArray(answerList, inArray.id);
            }
            answerList = [...answerList, action.payload];
            return { ...state,
                currentAnswers: answerList,
                savingAnswer: false
            }
        case COMPLETED_ANSWER_LIST:
            return { ...state,
                currentAnswers: action.payload,
                loadingTemplateDetail: false
            }
        case ERROR_ANSWER_LIST:
            return { ...state,
                currentAnswers: [],
                fetchError: true
            }
        case ADD_ANSWER_TO_LIST:
            return { ...state,
                currentAnswers: [...state.currentAnswers, action.payload]
            }
        case COMPLETE_AUDIT:
            return {
                ...state,
                loadingCompleteId: true,
                pendingAuditList: [],
                completedAuditList: []
            }
        case AUDIT_COMPLETED:
            const inArrayCompleted = state.pendingAuditList ? state.pendingAuditList.find((a) => {
                return a.id === action.payload.id
            }) : null;
            let pendingAuditList = state.currentAnswers;
            if (inArrayCompleted) {
                pendingAuditList = removeFromArray(pendingAuditList, inArray.id);
            } //Bug
            // pendingAuditList = [...pendingAuditList, action.payload];
            return { ...state,
                completedAudit: true,
                loadingCompleteId: false,
                pendingAuditList: pendingAuditList
            }
        case LOADING_AUDIT_TEMPLATE:
            return {
                ...state,
                loadingTemplateDetail: true,
                currentAnswers: null,
                auditTemplate: null
            }
        case GLOBAL_LANGUAGE_SELECTED:
            return {
                ...state,
                currentAnswers: null,
                auditTemplate: null
                //pendingAuditList: []

            }
        default:
            return state;
    }
}