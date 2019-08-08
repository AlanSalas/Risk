import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import {
  StyleSheet,
  View,
  StatusBar,
  NativeModules,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import { AppLoading, Font } from 'expo';
import FontAwesome from './node_modules/@expo/vector-icons/fonts/FontAwesome.ttf';
import Ionicons from './node_modules/@expo/vector-icons/fonts/Ionicons.ttf'
import AppNavigation from './navigation/AppNavigation';
import FlashMessage from "react-native-flash-message";

import moment from 'moment';



export default class App extends React.Component {
  state = {
    fontLoaded: false
  };

  getLanguageCode() {
    let systemLanguage = 'en';
    if (Platform.OS === 'android') {
      systemLanguage = NativeModules.I18nManager.localeIdentifier;
    } else {
      //systemLanguage = 'NativeModules.SettingsManager.settings.AppleLocale';
    }
    const languageCode = systemLanguage.toLowerCase().replace('_', '-');//systemLanguage.substring(0, 2);
    return languageCode;
  }

  async componentWillMount() {
    try {
      //moment.locale(this.getLanguageCode())
      await Font.loadAsync({
        FontAwesome,
        'Material Icons': require('./node_modules/@expo/vector-icons/fonts/MaterialIcons.ttf'),
        'MaterialIcons': require('./node_modules/@expo/vector-icons/fonts/MaterialIcons.ttf'),
        Ionicons
      });
      this.setState({ fontLoaded: true });
    } catch (error) {
      console.log('error loading icon fonts', error);
    }
  }

  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    }
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
    return (
      <Provider store={store}>
        <KeyboardAvoidingView
          behavior="padding"
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 0,
            paddingTop: 0,
          }}
          // keyboardVerticalOffset={keyboardVerticalOffset}
          enabled
        >
          <View style={styles.container}>
            <StatusBar barStyle='light-content' />
            <AppNavigation />
            <FlashMessage position="top" />
          </View>
        </KeyboardAvoidingView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
})