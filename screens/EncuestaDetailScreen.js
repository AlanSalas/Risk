import { StyleSheet, View, Text, ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from "react-redux";
import { bindActionCreators, compose } from 'redux';
import * as actions from '../redux/audits/actions';
import SurveyDetail from '../components/SurveyDetail/SingleView';

class EncuestaDetailScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
        headerLeft: (
            <TouchableOpacity style={{ paddingLeft: 15 }}
                onPress={() => navigation.goBack()}>
                <Icon color="#FFFFFF" name="close" />
            </TouchableOpacity>
        ),
        headerRight: null
    })
    constructor(props) {
        super(props);
    }

    render() {
        const { surveyTemplate, loading } = this.props;
        if (loading) {
            return (<View style={[styles.activityContainer, styles.horizontal]}>
                <ActivityIndicator size="large" color="#dd6401" />
            </View>)
        }
        if (surveyTemplate) {
            return (
                <SurveyDetail survey={surveyTemplate} />
            );
        } else {
            return null;
        }

    }
}

const styles = StyleSheet.create({

});


const mapStateToProps = (state) => {
    return {
        authError: state.surveys.authError,
        fetchError: state.surveys.fetchError,
        surveyTemplate: state.surveys.surveyTemplateResult,
        loading: state.surveys.loadingSurveyTemplateResult
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getAuditsByCompany: actions.getAuditsByCompany }, dispatch);
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(EncuestaDetailScreen);
