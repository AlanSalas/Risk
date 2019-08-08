
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators, compose } from 'redux';
import * as actions from '../redux/surveys/actions';
import CompanyList from '../components/EncuestasView/CompanyList';

class EncuestasCompletadasTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: true,
      isConnected: true
    };
    this.props.getSurveyTemplatesByCompany();
  }
  handleCompany = (company) => {
    this.props.selectCurrentCompany(company.id);
    this.props.navigation.navigate('listEncuestasCompletadas', {title: company.name});
  };

  render() {
    if(this.props.companies && this.props.companies.length > 0) {
    return (
      <View style={styles.container}>
        <CompanyList companies={this.props.companies}  _onPressItem={this.handleCompany} />
      </View>
    );
    }else {
      return (
        <View style={[{ paddingTop: '50%', alignContent: 'center', justifyContent: 'center', flexDirection: 'column' }]}>
          <Text style={{ color: 'gray', alignSelf: 'center'}}>No hay encuestas completadas</Text>
        </View>)
    }
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 3,
    paddingRight: 3
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
  }

});

const mapStateToProps = (state) => {
  return {
    authError: state.surveys.authError,
    fetchError: state.surveys.fetchError,
    companies: state.surveys.surveyTemplatesByCompany,
    hasValue: state.surveys.surveyTemplatesByCompany.length > 0,
    loading: state.surveys.loadingSurveyTemplatesByCompany
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getSurveyTemplatesByCompany: actions.getSurveyTemplatesByCompany, 
                              selectCurrentCompany: actions.selectCurrentCompany}, 
                              dispatch);
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(EncuestasCompletadasTab);