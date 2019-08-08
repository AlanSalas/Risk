import {
  AUTH_USER,
  AUTH_ERROR,
  RESET_AUTH_ERROR,
  HAS_STORED_CREDENTIALS,
  STORED_CREDENTIALS_DELETED,
  LOGIN_LOADING,
  COMPLETED
} from './types';

const INITIAL_STATE = {
  authenticated: '',
  errorMessage: '',
  isAuth: false,
  authError: false,
  storedCredentials: null,
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...state,
        authenticated: action.payload,
        isAuth: true,
        authError: false,
        loading: false
      };
    case AUTH_ERROR:
      return { ...state,
        errorMessage: action.payload,
        isAuth: false,
        authError: true,
        loading: false
      };
    case RESET_AUTH_ERROR:
      return { ...state,
        errorMessage: action.payload,
        isAuth: false,
        authError: false
      };
    case HAS_STORED_CREDENTIALS:
      return { ...state,
        storedCredentials: action.payload
      }
    case STORED_CREDENTIALS_DELETED:
      return { ...state,
        storedCredentials: null
      }
    case LOGIN_LOADING:
      return { ...state,
        loading: true
      }
    default:
      return state;
  }
}