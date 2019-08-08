import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators, compose } from 'redux';
import * as actions from '../redux/login/actions';
import { Icon, Button, CheckBox } from 'react-native-elements';
import { showMessage, hideMessage } from "react-native-flash-message";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      username: '',
      password: '',
      resetError: false,
      credentials: null,
      checked: false
    };
    this.props.checkCredentials();
  }

  handleLogin = () => {
    if (!this.props.loading) {
      Keyboard.dismiss();
      this.props.login({ username: this.state.username, password: this.state.password, remember: this.state.checked });
      this.props.resetError();
      this.setState({ password: '' })
    }
  }

  handleTouchableWithoutFeedbackPress = () => {
    Keyboard.dismiss();
    hideMessage();
  }

  handleChange(value, name) {
    this.setState({ [name]: value });
  }

  showMessage = (message, success) => {
    showMessage({
      message: message,
      type: !success ? "danger" : "success",
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
      this.showMessage('Bienvenido', true);
      this.props.navigation.navigate('home');
    }
    if (nextProps.badCredentials) {
      this.showMessage('Login Failed', false);
    }
    if (nextProps.hasStoredCredentials) {
      this.setState({ ...nextProps.storedCredentials, checked: true })
    }
    /*if (nextProps.hasStoredCredentials && !this.state.checked) {
      this.props.deleteCredentials();
      this.setState({
        username: '',
        password: '',
      })
    }*/
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.hasStoredCredentials && !nextState.checked) {
      this.props.deleteCredentials();
      this.setState({
        username: '',
        password: '',
      })
    }
  }

  render() {
    
    return (
      <TouchableWithoutFeedback onPress={this.handleTouchableWithoutFeedbackPress} accessible={false}>
        <View style={{
          flex: 1,
        }}>
            <ImageBackground source={require('../assets/images/background.png')} style={styles.container}>
              <Image source={require('../assets/images/logo.png')} style={styles.logo} />
              <View style={styles.inputContainer}>
                <Icon
                  name='user'
                  type='font-awesome'
                  size={24}
                  color='#ffffff'
                />
                <TextInput style={styles.inputs}
                  placeholder="Usuario"
                  placeholderTextColor="#dd6401"
                  underlineColorAndroid='transparent'
                  selectionColor={'#dd6401'}
                  autoCapitalize='none'
                  onChangeText={event => { this.handleChange(event, 'username') }}
                  value={this.state.username}
                />
              </View>
              <View style={styles.inputContainer}>
                <Icon
                  name={Platform.OS === 'ios' ? 'ios-key' : 'md-key'}
                  type='ionicon'
                  size={24}
                  color='#ffffff'
                />
                <TextInput style={styles.inputs}
                  placeholder="Contraseña"
                  secureTextEntry={true}
                  placeholderTextColor="#dd6401"
                  selectionColor={'#dd6401'}
                  underlineColorAndroid='transparent'
                  onChangeText={event => { this.handleChange(event, 'password') }}
                  value={this.state.password}
                />
              </View>
              <View >
                <CheckBox
                  title='Recordar credenciales'
                  checked={this.state.checked}
                  onPress={() => this.setState({ checked: !this.state.checked })}
                  containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
                  textStyle={{ color: 'white', fontWeight: 'normal', fontSize: 14 }}
                  checkedColor='#dd6401'
                />
              </View>
              <Button
                title="Login"
                loading={this.props.loading}
                loadingProps={{ size: "large", color: "white" }}
                titleStyle={{ fontWeight: "700" }}
                buttonStyle={{
                  backgroundColor: "#dd6401",
                  width: 300,
                  height: 45,
                  borderWidth: 0,
                  borderRadius: 0
                }}
                containerStyle={{ marginTop: 20 }}
                onPress={this.handleLogin}
                disabled={!(this.state.password && this.state.username) && !this.props.loading}
              />
              {/*
              <Button
                title="¿Olvidaste tu contraseña?"
                titleStyle={{ fontWeight: "700", fontSize:14 }}
                clear={true}
                buttonStyle={{
                  width: 200,
                  height: 30,
                  borderColor: "transparent",
                  borderWidth: 0,
                  borderRadius: 0
                }}
                containerStyle={{ marginTop: 20 }}
                onPress={() => {
                 
                  showMessage({
                    message: "Simple message",
                    type: "info",
                  });
                }}
              />
              */}

            </ImageBackground >
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 280,
    height: 150,
    marginBottom: 15,
    resizeMode: 'contain'
  },
  inputContainer: {
    borderRadius: 0,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#606060'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    color: '#FFFFFF',
    flex: 1,

  }
});

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.login.isAuth,
    badCredentials: state.login.authError,
    hasStoredCredentials: state.login.storedCredentials !== null,
    storedCredentials: state.login.storedCredentials,
    loading: state.login.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    login: actions.login,
    resetError: actions.resetError,
    checkCredentials: actions.CheckIfExistsCredentials,
    deleteCredentials: actions.DeleteStoredCredentials
  }, dispatch);
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(LoginScreen);
