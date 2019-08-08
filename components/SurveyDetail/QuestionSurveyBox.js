/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight
} from 'react-native';

export default class QuestionSurveyBox extends Component {

    constructor(props) {
        super(props);
    }
    _getPercentage(total, answers ) {
        const answered = answers || 0;
        const percentage = (answered*100)/(total || 1);
        return Math.round(percentage * 100) / 100
    }
    renderOptions = (auditQuestionOptions, questionId,  counters) => {
        
        let answers = auditQuestionOptions.map((option, index) => {
            const percentage =  this._getPercentage(this.props.total,counters[`Q${questionId}A${option.id}`])
            return (
                <View key={`option-${option.id}`} style={styles.containerRow}>
                        <Text style={styles.optionTitle}>{option.option}</Text>
                        <Text style={styles.optionDescription}>{`${percentage} %`}</Text>
                </View>
            );
        }, this);
        return answers;
    }

    renderFaces = (auditQuestionOptions, questionId, counters) => {
        let imageMap = {
            1: require('../../assets/images/answers/faces/1.png'),
            2: require('../../assets/images/answers/faces/2.png'),
            3: require('../../assets/images/answers/faces/3.png'),
            4: require('../../assets/images/answers/faces/4.png'),
            5: require('../../assets/images/answers/faces/5.png'),
          }        
        let answers  = [];
        for(let i = 1; i<=5;i++){
            const percentage =  this._getPercentage(this.props.total,counters[`Q${questionId}A${i}`])
            answers.push(
                <View key={`face-${i}`} style={styles.containerRow}>
                        <Image source={imageMap[i]} style={styles.face} />
                        <Text style={styles.optionDescription}>{`${percentage} %`}</Text>
                </View>
            )
        }
        return answers;
    }       

    _renderAnswer = (auditQuestion, counters) => {
        switch (auditQuestion.questionType.name) {
            case 'options':
                return this.renderOptions(auditQuestion.surveyQuestionOptions, auditQuestion.id, counters);
            case 'faces':
                return this.renderFaces(auditQuestion.surveyQuestionOptions, auditQuestion.id, counters);
        }
    }


    render() {
        const { question, counters } = this.props;
        if (question) {
            return (
                <View style={styles.card}>
                    <Text style={styles.title}>{question.question}</Text>
                    <View style={styles.answersContainer}>
                        {this._renderAnswer(question, counters)}
                    </View>
                </View>
            );
        } else {
            return null;
        }

    }
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: "column",
        width: null,
        height: null,
        margin: 5,
        padding:20,
        borderBottomWidth: 1,
        borderColor:'#333' 
    },
    title: {
        fontSize: 20,
        color: "#333",
        marginBottom: 10,
        fontWeight:'bold'
    },
    answersContainer: {
        flex: 1,
        flexDirection: "column",
    },
    containerRow:{
        flex: 1,
        flexDirection: "row",
        alignItems: 'center'
    },
    optionTitle:{
        flex:1,
        fontSize: 16,
        color:'#000000',
        //fontWeight:'bold'
    },
    optionDescription:{
        flex:1,
        fontSize: 16,
        color:'#000000',
        textAlign: "right",
        //fontWeight:'bold'
    },
    face: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        margin:10
      },    

});
