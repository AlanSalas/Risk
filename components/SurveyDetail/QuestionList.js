import React, { Component } from 'react';
import {
  FlatList,
  Text,
  View,
  AsyncStorage
} from 'react-native';

import QuestionSurveyBox from './QuestionSurveyBox'

export default class QuestionSurveyList extends Component {
  state = {
    selected: null
  }

  onPressItem = async (questionId, answerId,text) => {
    
  };
  _keyExtractor = (item, index) => `list-item-${item.id}`;

  _renderItem = (item, index, counters) => (
    <QuestionSurveyBox
      id={item.id}
      onPressItem={this.onPressItem}
      question={item}
      counters={counters}
      total={this.props.totalAnswered}
    />
  );

  render() {
    const { questions, counters } = this.props;
      if(questions && questions.length) {
        return (<FlatList
        data={questions}
        onPressItem={this.props.onPressItem}
        renderItem={({ item, index }) => this._renderItem(item, index, counters)}
        keyExtractor={this._keyExtractor}
      />)
      } else {
        return null;
      }
  }
}