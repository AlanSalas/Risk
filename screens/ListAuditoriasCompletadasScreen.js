import { StyleSheet, View, Text, ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';

import { Icon } from 'react-native-elements';
import { connect } from "react-redux";
import { bindActionCreators, compose } from 'redux';
import * as actions from '../redux/audits/actions';
import AuditoriasList from '../components/HomeView/AuditoriasList'

class ListAuditoriasCompletadasScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title:`${navigation.state.params.title}`,
        headerLeft: (
            <View style={{paddingLeft:15}}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}>
                    <Icon color="#FFFFFF" name="close" />
                </TouchableOpacity>
            </View>
        ),
        headerRight: null
    })
    handleAuditClick = (audit) => {
        this.props.selectCurrentAudit(audit.id);
        this.props.navigation.navigate('auditDetail',{title: audit.name});
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
            <AuditoriasList auditorias={company.audits}  _onPressItem={this.handleAuditClick} enableShare={true} />
        );
    }
}

const styles = StyleSheet.create({

});


const mapStateToProps = (state) => {
    return {
        authError: state.audits.authError,
        fetchError: state.audits.fetchError,
        currentCompany: state.audits.currentCompany,
        company: state.audits.company,
        loading: state.audits.loadingAudits
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getAuditsByCompany: actions.getAuditsByCompany,
        selectCurrentAudit: actions.selectCurrentAudit }, dispatch);
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(ListAuditoriasCompletadasScreen);
