import { StyleSheet, View, Text, Picker, TouchableOpacity, TouchableHighlight, Image } from 'react-native';
import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import { connect } from "react-redux";
import { bindActionCreators, compose } from 'redux';
import * as actions from '../redux/surveys/actions';

class NewEncuestaSelectLanguageScreen extends Component {
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
    state = {
        language: null
    }
    constructor(props) {
        super(props);
    }

    handleLanguage = (optionSelected) => {
        if (optionSelected != "") {
            this.setState({ language: optionSelected })
            this.props.selectLanguage(optionSelected);
            this.props.navigation.navigate('newEncuesta');
        }
    }

    _onPress = (value) => {
        
    };

    renderFaces = (auditQuestionOptions, selectedOption) => {
        let imageMap = {
            1: require('../assets/images/answers/faces/1.png'),
            2: require('../assets/images/answers/faces/2.png'),
            3: require('../assets/images/answers/faces/3.png'),
            4: require('../assets/images/answers/faces/4.png'),
            5: require('../assets/images/answers/faces/5.png'),
        }
        let answers = [];
        for (let i = 1; i <= 5; i++) {
            answers.push(
                <View key={`option-${i}`} style={styles.viewButton}>
                    <TouchableHighlight onPress={event => {
                        this._onPress(i)
                    }}>
                        <Image source={imageMap[i]} style={styles.face} />
                    </TouchableHighlight>
                </View>
            )
        }
        return answers;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.mainContainer}>
                    <Text style={styles.titleSelectLanguage}>Selecciona un idioma:</Text>
                    <Picker
                        selectedValue={this.state.language}
                        style={{ height: 50, width: 200 }}
                        onValueChange={(itemValue, itemIndex) => this.handleLanguage(itemValue)}>
                        <Picker.Item enabled={false} label="Idioma" value="" />
                        <Picker.Item label="Español" value="2" />
                        <Picker.Item label="Ingles" value="1" />
                    </Picker>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    topBar: {
        flex: 0.05,
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#ffa500',
        width: null,
        alignItems: 'center'
    },
    titleAuditoria: {
        flex: 1,
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold"
    },
    porcent: {
        flex: 1,
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "right"
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleSelectLanguage: {
        color: "#000000",
        fontSize: 18,
        marginBottom: 10
    },
    facesContainer: {
        flex: 1,
        flexDirection: "row"
    },
    face: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        margin: 10
    },

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
    return bindActionCreators({
        getAuditDetail: actions.getAuditDetail,
        selectLanguage: actions.selectCurrentLanguage,
        getSurveyTemplate: actions.getSurveyTemplateDetail
    }, dispatch);
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(NewEncuestaSelectLanguageScreen);
