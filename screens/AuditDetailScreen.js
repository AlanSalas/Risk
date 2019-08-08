import { StyleSheet, View, Text, ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';

import { Icon } from 'react-native-elements';
import { connect } from "react-redux";
import { bindActionCreators, compose } from 'redux';
import * as actions from '../redux/audits/actions';
import QuestionsList from '../components/AuditDetail/QuestionList'

class AuditDetailScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `Auditoria ${navigation.state.params.title}`,
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

    constructor(props) {
        super(props);
        const { currentAudit, getAuditDetail } = this.props;
        getAuditDetail(currentAudit);        
    }

    render() {
        const {audit } = this.props;
        if(!audit){
            return null
        }
        return (
        <View style={styles.container}>
            <Text style={styles.title}>Respuestas</Text>
            <QuestionsList questions={audit.auditAnswers} />
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        width: null,
        height: null,        
        paddingLeft:20,
        paddingRight:20,
        paddingTop:20,
        backgroundColor:"#ffffff"
    },
    title:{
        fontSize:25,
        color:"#000000",
        fontWeight: 'bold',
        marginBottom: 20
    }
});


const mapStateToProps = (state) => {
    return {
        authError: state.audits.authError,
        fetchError: state.audits.fetchError,
        currentAudit: state.audits.currentAudit,
        audit: state.audits.audit,
        loading: state.audits.loadingAudits
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getAuditDetail: actions.getAuditDetail }, dispatch);
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(AuditDetailScreen);
