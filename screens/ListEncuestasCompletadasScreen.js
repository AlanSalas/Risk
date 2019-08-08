import { StyleSheet, View, Text, ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';

import { Icon } from 'react-native-elements';
import { connect } from "react-redux";
import { bindActionCreators, compose } from 'redux';
import * as actions from '../redux/surveys/actions';
import AuditoriasList from '../components/HomeView/AuditoriasList'
import EncuestasList from '../components/EncuestasView/EncuestasList';

class ListEncuestasCompletadasScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
        headerLeft: (
            <TouchableOpacity style={{paddingLeft:15}}
                onPress={() => navigation.goBack()}>
                <Icon color="#FFFFFF" name="close" />
            </TouchableOpacity>
        ),
        headerRight: null
    })
    handleAuditClick = (id,name) => {
        this.props.getSurveyResult(id, this.props.language)
        this.props.navigation.navigate('surveyDetail', {title: name});
    };
    constructor(props) {
        super(props);
    }

    render() {
        const {company } = this.props;
        if(!company){
            return null
        }
        return (
            <EncuestasList surveyTemplates={company.surveyTemplates}  _onPressItem={this.handleAuditClick} />
        );
    }
}

const styles = StyleSheet.create({

});


const mapStateToProps = (state) => {
    return {
        authError: state.surveys.authError,
        fetchError: state.surveys.fetchError,
        currentCompany: state.surveys.currentCompany,
        company: state.surveys.company,
        language: state.global.currentLanguage,
        loading: state.surveys.loadingAudits
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getAuditsByCompany: actions.getAuditsByCompany, getSurveyResult: actions.getSurveyTemplateResult }, dispatch);
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(ListEncuestasCompletadasScreen);
