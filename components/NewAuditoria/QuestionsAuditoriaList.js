import React, { Component } from 'react';
import {
  FlatList,
  Text,
  View,
  AsyncStorage
} from 'react-native';
import { List, ListItem } from 'react-native-elements'

import QuestionAuditoriaBox from './QuestionAuditoriaBox'

export default class QuestionsAuditoriaList extends Component {
  state = {
    selected: null
  }

  onPressItem = async (questionId, answerId,text) => {
    const a = {
      "textAnswer": text,
      "auditId": this.props.auditId,
      "auditQuestionId": questionId,
      "auditQuestionOptionId": answerId
    }
    this.props.cancelAnswer();
    this.props.updateAnswer(a)
  };
  _keyExtractor = (item, index) => `list-item-${item.id}`;

  _renderItem = (item, index) => (
    <QuestionAuditoriaBox
      id={item.id}
      onPressItem={this.onPressItem}
      auditQuestion={item}
    />
  );

  _renderItemWithAnswer =  (item, index, answers) => {
    //const { answers } = this.props;
    const answer = answers.find((a) => { return a.auditQuestionId === item.id})
    return (<QuestionAuditoriaBox
      id={item.id}
      onPressItem={this.onPressItem}
      auditQuestion={item}
      answer={answer}
    />);
  }

  render() {
    const { questions, answers } = this.props;   
      if((answers  ) && (questions && questions.length > 0)) {
        return (<FlatList
        data={questions}
        onPressItem={this.props.onPressItem}
        renderItem={({ item, index }) => this._renderItemWithAnswer(item, index, answers)}
        keyExtractor={this._keyExtractor}
      />)
      } else {
        return null;
      }
     
    
  }
}