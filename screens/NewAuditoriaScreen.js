import { StyleSheet, View, Text, ScrollView, TouchableHighlight, TouchableOpacity , ActivityIndicator} from 'react-native';
import React, { Component } from 'react';
import { IndicatorViewPager } from 'rn-viewpager';

import { Icon } from 'react-native-elements';
import { connect } from "react-redux";
import { bindActionCreators, compose } from 'redux';
import * as actions from '../redux/audits/actions';
import { Button } from 'react-native-elements';
import { showMessage, hideMessage } from "react-native-flash-message";
import QuestionsAuditoriaList from '../components/NewAuditoria/QuestionsAuditoriaList'

class NewAuditoriaScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Auditoria",
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
        const { currentAuditTemplate, currentAuditId, getAuditDetail, getAnswers } = this.props;
        getAuditDetail(currentAuditTemplate);
        getAnswers(currentAuditId);
    }
    onPressItem = (questionId, answerId) => {
       
    };

    _finishAudit() {
        this.props.completeAudit(this.props.currentAuditId);
        this.props.navigation.navigate('home');
    };
    _showMessage = (message, success) => {
        showMessage({
            message: message,
            type: !success ? "danger" : "success",
        });
    }

    componentWillReceiveProps(nextProps, prevProps) {
        if (nextProps.completed) {
            this._showMessage('Auditoría guardada con éxito', true);
            this.props.navigation.navigate('home');
        }
    }

    render() {
        const { audit, currentAudit, currentAuditId, updateAns, cancelAns, answers } = this.props;
        const Activity = () => {
            if (!audit) {
                return (
                    <View style={[styles.activityContainer, styles.horizontal]}>
                        <ActivityIndicator size="large" color="#dd6401" />
                    </View>
                );
            } else {
                return null;
            }
        }

        if (!audit) {
            return (
                <View style={[styles.activityContainer, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#dd6401" />
                </View>
            );;
        } else {




            const currentSection = this.state.currentPage + 1;
            const totalSections = audit.auditQuestionGroups ? audit.auditQuestionGroups.length : 0;
            const auditQuestionGroups = audit.auditQuestionGroups;
            let viewPagerObject;
            const lengthTabs = auditQuestionGroups.length;
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
                if (event.position !== currentPage) {
                    this.setState({ currentPage: event.position })
                }
            };

            const handleComplete = () => {
                this._finishAudit();
            }

            let sectionNodes = auditQuestionGroups.map(function (section, index) {
                let lastView = false;
                if (lengthTabs === index + 1) {
                    lastView = true;
                }
                return (
                    <View key={`section-${section.name}-${currentAuditId}`} style={styles.tabContainer}>
                        <View style={styles.viewContainer}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <Text style={styles.sectionTitle}>{section.name}</Text>
                                <QuestionsAuditoriaList onPressItem={this.onPressItem} questions={section.auditQuestions} auditId={currentAuditId} updateAnswer={updateAns} cancelAnswer={cancelAns} answers={answers} />
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
                    <Activity></Activity>
                    <View style={styles.topBar}>
                        <Text style={styles.titleAuditoria}>Auditoria {audit.name}</Text>
                        <Text style={styles.porcent}>{currentSection}/{totalSections}</Text>
                    </View>
                    <IndicatorViewPager
                        ref={(viewPager) => { viewPagerObject = viewPager }}
                        style={styles.viewPager}
                        onPageScroll={_onSwipe}
                        onPa
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
});


const mapStateToProps = (state) => {
    return {
        authError: state.audits.authError,
        fetchError: state.audits.fetchError,
        currentAudit: state.audits.currentAuditTemplate,
        currentAuditTemplate: state.audits.currentAuditTemplate,
        currentAuditId: state.audits.currentAuditId,
        audit: state.audits.auditTemplate,
        loading: state.audits.loadingAudits,
        answers: state.audits.currentAnswers,
        completed: state.audits.completedAudit,
        loadingTemplateDetail: state.audits.loadingTemplateDetail
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getAuditDetail: actions.getTemplateAuditDetail,
        updateAns: actions.updateAnswer,
        cancelAns: actions.cancelAnswerUpdated,
        getAnswers: actions.getAnswers,
        completeAudit: actions.completeAudit
    }, dispatch);
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(NewAuditoriaScreen);
