import React, { Component } from 'react';
import { 
  FlatList,
  Text, 
  View, 
 } from 'react-native';
 import { List, ListItem } from 'react-native-elements';

 import EncuestaBox  from './EncuestaBox'

export default class EncuestasList extends Component {
  state = {
    selected : null
  }


  _onPressItem = (id) => {
    // updater functions are preferred for transactional updates
    this.setState((state) => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return {selected};
    });
  };
 
  _keyExtractor = (item, index) => `list-item-${index}`;

  _renderItem = (item, index) => (
    <EncuestaBox
      id={item.id}
      index={index}
      onPressItem={this.props._onPressItem}
      //selected={!!this.state.selected.get(item.id)}
      surveyTemplate={item}
    />
  );
  _onRefresh = () => {
    if(this.props.onRefresh){
      this.props.onRefresh();
    }
    return null
  }

  render() {
    const { surveyTemplates } = this.props;
    return (
        <FlatList
        data={surveyTemplates}
        renderItem={({ item, index }) => this._renderItem(item, index)}
        keyExtractor={this._keyExtractor} // dont'forget to declare _keyExtractor
        onEndReachedThreshold={0.5}
        onRefresh={this._onRefresh}
        refreshing={false}
        />
    );
  }
}