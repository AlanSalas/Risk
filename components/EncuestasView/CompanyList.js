import React, { Component } from 'react';
import { 
  FlatList,
  Text, 
  View, 
 } from 'react-native';
 import { List, ListItem } from 'react-native-elements';

 import CompanyBox  from './CompanyBox'

export default class CompanyList extends Component {
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
    <CompanyBox
      id={item.id}
      index={index}
      onPressItem={this.props._onPressItem}
      //selected={!!this.state.selected.get(item.id)}
      company={item}
    />
  );

  render() {
    const { companies } = this.props;
    return (
        <FlatList
        style={{ paddingLeft: 1, paddingRight: 1}}
        contentContainerStyle={{alignItems: 'center'}} 
        data={companies}
        renderItem={({ item, index }) => this._renderItem(item, index)}
        keyExtractor={this._keyExtractor} // dont'forget to declare _keyExtractor
        />
    );
  }
}