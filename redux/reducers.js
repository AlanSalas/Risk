
import { combineReducers } from 'redux';
import AppNavigation from '../navigation/AppNavigation';
import loginReducer from '../redux/login/reducer';
import auditsReducer from '../redux/audits/reducer';
import surveysReducer from '../redux/surveys/reducer';
import globalReducer from '../redux/global/reducer';

const navReducer = (state, action) => {
  const newState = AppNavigation.router.getStateForAction(action, state)
  return newState || state
}


const rootReducer = combineReducers({
  nav: navReducer,
  login: loginReducer,
  audits: auditsReducer,
  surveys: surveysReducer,
  global: globalReducer
});

export default rootReducer;
