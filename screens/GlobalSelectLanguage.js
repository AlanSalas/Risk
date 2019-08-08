import { StyleSheet, View, Text, Picker, TouchableOpacity, TouchableHighlight, ActivityIndicator } from 'react-native';
import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import { connect } from "react-redux";
import { bindActionCreators, compose } from 'redux';
import * as actions from '../redux/global/actions';
import * as auditActions from '../redux/audits/actions';

class GlobalSelectLanguageScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Seleccionar lenguaje',
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
        this.state = {
            language: props.current || 1
        }
        this.props.getLanguages()
    }

    handleLanguage = (optionSelected) => {

        this.setState({ language: optionSelected })
        this.props.selectLanguage(optionSelected);
        this.props.selectLanguageAudits();
        this.props.navigation.navigate('home');

    }

    render() {
        const { languages } = this.props;
        if(languages === 0) {
            return (  <View style={[styles.activityContainer, styles.horizontal]}>
                <ActivityIndicator size="large" color="#dd6401" />
            </View>)
        }
        return (
            <View style={styles.container}>
                <View style={styles.mainContainer}>
                    {/*<Text style={styles.titleSelectLanguage}>Selecciona un idioma:</Text>*/}
                    <Picker
                        selectedValue={this.state.language}
                        style={{ height: 50, width: '50%' }}
                        
                        onValueChange={(itemValue, itemIndex) => this.handleLanguage(itemValue)}>
                        {
                            languages.map((lang, index)=>{
                                return (<Picker.Item 
                                    key={`lang-${lang.name}-${lang.id}`}
                                    label={lang.name}
                                    value={lang.id} />)
                            })
                        }
                    </Picker>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        height: null
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
        current: state.global.currentLanguage,
        loading: state.global.loadingLanguages,
        failed: state.global.languagesFailed,
        languages: state.global.languages
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        selectLanguage: actions.selectCurrentLanguage,
        getLanguages: actions.getLanguages,
        selectLanguageAudits: auditActions.globalLanguageSelected
    }, dispatch);
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(GlobalSelectLanguageScreen);
