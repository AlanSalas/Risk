import { ofType } from 'redux-observable';
import { AsyncStorage } from 'react-native'; 
import { ajax } from 'rxjs/ajax';
import { debounceTime, mergeMap, map, filter, takeUntil } from 'rxjs/operators';
import {from} from 'rxjs'
import { SURVEY_ANSWER_UPDATED, UPDATE_SURVEY_ANSWER, CANCEL_UPDATE_SURVEY_ANSWER } from './types';
import AppSettings from '../../settings/api.settings';
import httpClient from '../../helpers/httpclient';
const answerUpdated = payload => {
    if( payload) {
        return { type: SURVEY_ANSWER_UPDATED, payload }
    
    }
   
}
const updateAnswerApi  = async (request)  => {
    const token = await AsyncStorage.getItem('@auth:token');
    try {
        
        if (token !== null) {
           
            const response = await httpClient.post(`${AppSettings.API_URL}/surveyAnswers/upsertCustom?access_token=${token}`, request);
           
            return response;
        } else {
            
        }

    } catch (error) {
        return null;
    }

}
/*
ajax(
        {
            url: `${AppSettings.API_URL}/auditAnswers/upsertCustom?access_token=${action.payload.token}`,
            method: 'POST',
            body: action.payload,
            crossDomain: true,
            headers: {
                "Content-Type": 'application/json'
            },
            responseType: 'json'
        }
        
        )
*/

export default  updateSurveyAnswerEpic = action$ => action$.pipe (
    ofType(UPDATE_SURVEY_ANSWER),
    debounceTime(300),
    mergeMap(action => 
        from(updateAnswerApi(action.payload))
        .pipe(
        map(response => answerUpdated(response)),
        takeUntil(action$.pipe(
          filter(action => action.type === CANCEL_UPDATE_SURVEY_ANSWER)
        ))
      ))
 )