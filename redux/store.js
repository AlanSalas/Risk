import {
    createStore,
    applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import {
    createEpicMiddleware,
    combineEpics
} from 'redux-observable';
import reducers from './reducers';
import updateAnswerEpic from './audits/epic';
import updateSurveyAnswerEpic from './surveys/epic'
const a = [updateSurveyAnswerEpic,updateAnswerEpic]
const rootEpic = combineEpics(...a);
const epicMiddleware = createEpicMiddleware();
const middlewares = [thunk, epicMiddleware]
const store = createStore(reducers, {

}, applyMiddleware(...middlewares));
epicMiddleware.run(rootEpic);




export {
    store
};