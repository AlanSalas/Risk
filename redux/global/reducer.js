import {
    SELECT_CURRENT_LANGUAGE, LOADING_LANGUAGES, LANGUAGES_FAILED, LANGUAGES_COMPLETED
} from "./types";

const INITIAL_STATE = {
    currentLanguage: 1,
    loadingLanguages: false,
    languagesFailed: false,
    languages: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SELECT_CURRENT_LANGUAGE:
            return { ...state,
                currentLanguage: action.payload
            }
        case LOADING_LANGUAGES:
            return {...state,
                loadingLanguages: true
            }
        case LANGUAGES_FAILED:
            return {
                ...state,
                loadingLanguages: false,
                languagesFailed: true
            }
        case LANGUAGES_COMPLETED:
            return {
                ...state, 
                loadingLanguages: false,
                languagesFailed: false,
                languages: action.payload
            }
        default:
            return state;
    }
}