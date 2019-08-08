/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Button } from 'react-native';

export default class ButtonWidget extends Component {

_onPress = () => {
    this.props.onPressItem(this.props.id);
};

  render() {
    const { text, color, accessibilityLabel } = this.props;
    return (
        <Button
        onPress={this._onPress}
        title={text}
        color={color}
        accessibilityLabel={accessibilityLabel}
        />
      );
  }
}