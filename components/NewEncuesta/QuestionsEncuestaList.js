import React, { Component } from 'react';
import {
  FlatList,
  Text,
  View,
  AsyncStorage
} from 'react-native';
import { List, ListItem } from 'react-native-elements'

import QuestionEncuestaBox from './QuestionEncuestaBox'

export default class QuestionsEncuestaList extends Component {
  state = {
    selected: null
  }

  onPressItem = async (questionId, answerId,text) => {
    const a = {
      "textAnswer": text,
      "surveyId": this.props.surveyId,
      "surveyQuestionId": questionId,
      "surveyQuestionOptionId": answerId
    }
    this.props.cancelAnswer();
    this.props.updateAnswer(a)
  };
  _keyExtractor = (item, index) => `list-item-${item.id}`;

  _renderItem = (item, index) => (
    <QuestionEncuestaBox
      id={item.id}
      onPressItem={this.onPressItem}
      surveyQuestion={item}
    />
  );

  _renderItemWithAnswer =  (item, index, answers) => {
    //const { answers } = this.props;
    const answer = answers.find((a) => { return a.surveyQuestionId === item.id})
    return (<QuestionEncuestaBox
      id={item.id}
      onPressItem={this.onPressItem}
      auditQuestion={item}
      answer={answer}
    />);
  }

  render() {
    const { questions } = this.props;  
      if( (questions && questions.length > 0)) {
        return (<FlatList
        data={questions}
        onPressItem={this.props.onPressItem}
        renderItem={({ item, index }) => this._renderItem(item, index)}
        keyExtractor={this._keyExtractor}
      />)
      } else {
        return null;
      }
     
    
  }
}