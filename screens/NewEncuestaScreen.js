import { StyleSheet, View, Text, ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import { ActivityIndicator, Image } from 'react-native';
import { IndicatorViewPager } from 'rn-viewpager';

import { Icon, Button } from 'react-native-elements';
import { connect } from "react-redux";
import { bindActionCreators, compose } from 'redux';
import * as actions from '../redux/surveys/actions';
import QuestionsEncuestaList from '../components/NewEncuesta/QuestionsEncuestaList';

class NewEncuestaScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Encuesta",
        headerLeft: (
            <TouchableOpacity style={{ paddingLeft: 15 }}
                onPress={() => navigation.goBack()}>
                <Icon color="#FFFFFF" name="close" />
            </TouchableOpacity>
        ),
        headerRight: null
    })
    state = {
        currentPage: 0,
        porcentComplete: 0
    }
    constructor(props) {
        super(props);
        const { getSurveyTemplate, currentSurveyTemplate, currentLanguage, createSurvey } = this.props;
        getSurveyTemplate(currentSurveyTemplate, currentLanguage);
        createSurvey(currentSurveyTemplate);



    }
    onPressItem = (questionId, answerId) => {
 
    };

    _finishAudit = () => {
        this.props.navigation.navigate('encuestas');
    };


    render() {
        const { surveyTemplate, loadingCreateSurvey, loading, updateAns, cancelAns, currentSurveyId } = this.props;
        const currentSection = this.state.currentPage + 1;
        if (loadingCreateSurvey || loading) {
            return (<View style={[styles.activityContainer, styles.horizontal]}>
                <ActivityIndicator size="large" color="#dd6401" />
            </View>)
        }
        if (!surveyTemplate) {
            return null
        }
        const surveyQuestionGroups = surveyTemplate.surveyQuestionGroups;
        let viewPagerObject;
        const lengthTabs = surveyQuestionGroups ? surveyQuestionGroups.length : 0;
        const _onPressNextButton = () => {
            const currentPage = this.state.currentPage;
            const nextPage = currentPage + 1;
            if (nextPage < lengthTabs) {
                this.setState({ currentPage: nextPage })
                viewPagerObject.setPage(nextPage)
            }
        };
        const _onPressBackButton = () => {
            const currentPage = this.state.currentPage;
            const nextPage = currentPage - 1;
            if (nextPage > -1) {
                this.setState({ currentPage: nextPage })
                viewPagerObject.setPage(nextPage)
            }
        };
        const _onSwipe = (event) => {
            const currentPage = this.state.currentPage;
            if(event.position !== currentPage) {
                this.setState({ currentPage: event.position })
            }       
        };
        const handleComplete = () => {
            this._finishAudit();
        }
        const totalSections = surveyQuestionGroups ? surveyQuestionGroups.length : 0;
        let sectionNodes = surveyQuestionGroups.map(function (section, index) {
            let lastView = false;
            if (lengthTabs === index + 1) {
                lastView = true;
            }
            return (
                <View key={"section-" + section.name} style={styles.tabContainer}>
                    <View style={styles.viewContainer}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Text style={styles.sectionTitle}>{section.name}</Text>
                            <QuestionsEncuestaList onPressItem={this.onPressItem} questions={section.surveyQuestions} updateAnswer={updateAns} cancelAnswer={cancelAns} surveyId={currentSurveyId} />
                            {lastView &&
                                <Button
                                    title="Completar"
                                    titleStyle={{ fontWeight: "700" }}
                                    buttonStyle={{
                                        width: null,
                                        height: 45,
                                        backgroundColor: "#dd6401",
                                        borderColor: "#dd6401",
                                        borderWidth: 0,
                                        borderRadius: 0
                                    }}
                                    containerStyle={{ marginTop: 20 }}
                                    onPress={handleComplete}
                                />
                            }
                        </ScrollView>
                    </View>
                </View>
            );
        });

        return (
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <Text style={styles.titleAuditoria}>Encuesta {surveyTemplate.name}</Text>
                    <Text style={styles.porcent}>{currentSection}/{totalSections}</Text>
                </View>
                <IndicatorViewPager
                    ref={(viewPager) => { viewPagerObject = viewPager }}
                    style={styles.viewPager}
                    onPageScroll={_onSwipe}
                >
                    {sectionNodes}
                </IndicatorViewPager>
                <View style={styles.bottomBar}>
                    <View style={styles.leftButton}>
                        <TouchableHighlight onPress={_onPressBackButton}>
                            <Icon color="#FFFFFF" name="navigate-before" />
                        </TouchableHighlight>
                    </View>
                    <View style={{ flex: 0.4 }}></View>
                    <View style={styles.rightButton}>
                        <TouchableHighlight onPress={_onPressNextButton}>
                            <Icon color="#FFFFFF" name="navigate-next" />
                        </TouchableHighlight>
                    </View>
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
        flex: 0.90,
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold"
    },
    porcent: {
        flex: 0.05,
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "right"
    },
    viewPager: {
        flex: 0.90,
    },
    tabContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "white",
        width: null,
        height: null,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    viewContainer: {
        width: null,
        height: null,
        margin: 5,
        borderRadius: 3,
        shadowColor: 'black',
        shadowOpacity: .2,
        shadowOffset: {
            height: 5,
            width: 5
        },
        elevation: 5,
        padding: 10
    },
    sectionTitle: {
        fontSize: 20,
        color: '#000000',
        fontWeight: 'bold',
        marginBottom: 10
    },
    bottomBar: {
        flex: 0.05,
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#000000',
        width: null,
        alignItems: 'center'
    },
    leftButton: {
        flex: 0.3,
        borderRightColor: "#ffffff",
        borderRightWidth: 1,
        alignItems: 'center'
    },
    rightButton: {
        flex: 0.3,
        borderLeftColor: "#ffffff",
        borderLeftWidth: 1,
        alignItems: 'center'
    },
    buttonContainer: {
        height: null,
        backgroundColor: '#ffa500',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        padding: 10,
        width: null,
        borderRadius: 3,
        shadowColor: 'black',
        shadowOpacity: .2,
        shadowOffset: {
            height: 2,
            width: 2
        },
        elevation: 2
    },
    textFinishAuditoria: {
        color: "#FFFFFF",
        fontSize: 14
    }
});


const mapStateToProps = (state) => {
    return {
        authError: state.surveys.authError,
        fetchError: state.surveys.fetchError,
        surveyTemplate: state.surveys.surveyTemplateDetail,
        loading: state.surveys.loadinfSurveyTemplateDetail,
        loadingCreateSurvey: state.surveys.loadingCreateSurvey,
        currentSurveyTemplate: state.surveys.currentSurveyTemplate,
        currentLanguage: state.surveys.currentLanguage,
        currentSurveyId: state.surveys.currentSurveyId
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getSurveyTemplate: actions.getSurveyTemplateDetail,
        updateAns: actions.updateAnswer,
        cancelAns: actions.cancelAnswerUpdated,
        createSurvey: actions.createSurvey
    }, dispatch);
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(NewEncuestaScreen);
