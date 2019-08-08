
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  NetInfo,
  Text,
  ActivityIndicator
} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from "react-redux";
import { bindActionCreators, compose } from 'redux';
import * as actions from '../redux/surveys/actions';
import EncuestasList from '../components/EncuestasView/EncuestasList'

class EncuestasTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: true,
      isConnected: true
    };
    this.props.getSurveysTemplate();
  }
  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }
  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }
  componentWillReceiveProps(nextProps) {
  }

  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({ isConnected });
    } else {
      this.setState({ isConnected });
    }
  };

  handleAuditoria = (id, title) => {
    this.props.selectSurveyTemplate(id);
    this.props.navigation.navigate('selectLanguageEncuesta', { title });
  };
  _onRefresh = () => {
    this.props.getSurveysTemplate();
  }
  render() {
    const MiniOfflineSign = () => {
      return (
        <View style={styles.offlineContainer}>
          <Text style={styles.offlineText}>No Internet Connection</Text>
        </View>
      );
    }
    const Activity = () => {
      if (this.props.loading) {
        return (
          <View style={[styles.activityContainer, styles.horizontal]}>
            <ActivityIndicator size="large" color="#dd6401" />
          </View>
        );
      }

      if (!this.props.hasValue) {
        return (
          <View style={[styles.activityContainer, styles.horizontal, { paddingTop: '50%', justifyContent: 'flex-start',flexDirection: 'column'}]}>
            <Text style={{ color: 'gray', alignSelf: 'center', paddingBottom: 20 }}>No hay encuestas asignadas</Text>
            <Button
              large
              icon={{ name: 'refresh', type: 'font-awesome', color: 'white' }}
              title='Actualizar' 
              style={{alignSelf: 'flex-end', paddingTop: 20}}
              backgroundColor={"#9E9E9E"}
              buttonStyle={{ backgroundColor : "#9E9E9E"}}
              onPress={this._onRefresh}
              />
          </View>
        );
      }
      return null;
    }
    const RenderList = (props) => {
      const hasValue = props.hasValue;
      if (hasValue) {
        return <EncuestasList onRefresh={this._onRefresh} surveyTemplates={this.props.surveyTemplates} _onPressItem={this.handleAuditoria} />
      } else {
        return null;
      }
    }
    if (!this.state.isConnected) {
      return <MiniOfflineSign />;
    }
    return (
      <View style={styles.container}>
        <Activity />
        <RenderList hasValue={this.props.hasValue} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 0,
    paddingRight: 0,
    width: '100%'
  },
  activityContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  welcome: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    backgroundColor: 'transparent',
    color: 'white',

  },
  logo: {
    width: 280,
    height: 150,
    marginBottom: 15,
    resizeMode: 'contain'
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  },
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    top: 30
  },
  offlineText: { color: '#fff' }

});


const mapStateToProps = (state) => {
  return {
    authError: state.surveys.authError,
    fetchError: state.surveys.fetchError,
    surveyTemplates: state.surveys.surveyTemplates,
    hasValue: state.surveys.surveyTemplates.length > 0,
    loading: state.surveys.loadingSurveyTemplates
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getSurveysTemplate: actions.getSurveysTemplate,
    selectSurveyTemplate: actions.selectSurveyTemplate
  }, dispatch);
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(EncuestasTab);
