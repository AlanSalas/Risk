import React, { Component } from 'react';
import { 
  FlatList,
  Text, 
  View, 
 } from 'react-native';
 import { List, ListItem } from 'react-native-elements';

 import AuditoriaBox  from './AuditoriaBox'

export default class AuditoriasList extends Component {
  state = {
    selected : null
  }


  _keyExtractor = (item, index) => `list-item-${index}`;

  _renderItem = (item, index, enableShare) => (
    <AuditoriaBox
      id={item.id}
      index={index}
      onPressItem={this.props._onPressItem}
      auditoria={item}
      enableShare={enableShare}
    />
  );

  _onRefresh = () => {
    if(this.props.onRefresh){
      this.props.onRefresh();
    }
    return null
  }

  render() {
    const { auditorias, enableShare } = this.props;
    return (
        <FlatList
        data={auditorias}
        renderItem={({ item, index }) => this._renderItem(item, index, enableShare)}
        keyExtractor={this._keyExtractor} // dont'forget to declare _keyExtractor
        onEndReachedThreshold={0.5}
        onRefresh={this._onRefresh}
        refreshing={false}
        />
    );
  }
}