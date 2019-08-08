import React, { Component } from 'react';
import { 
  FlatList
 } from 'react-native';

 import AnswerBox  from './AnswerBox'

export default class QuestionsList extends Component {
  state = {
    selected : null
  }

  _keyExtractor = (item, index) => `list-item-${index}`;

  _renderItem = (item, index) => (
    <AnswerBox
      id={item.id}
      index={index}
      question={item}
    />
  );

  render() {
    const { questions } = this.props;

    return (
        <FlatList
        data={questions}
        renderItem={({ item, index }) => this._renderItem(item, index)}
        keyExtractor={this._keyExtractor} // dont'forget to declare _keyExtractor
        />
    );
  }
}