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
} from 'react-native';

export default class QuestionBox extends Component {
    render() {
        const { question } = this.props;
        const textOption = question.auditQuestionOption ? question.auditQuestionOption.option : question.textAnswer;
        return (
                <View style={styles.card}>
                    <Text style={styles.title}>{question.auditQuestion.question}</Text>
                    <Text style={styles.description}>{textOption}</Text>
                </View>
        );
    }
}

const styles = StyleSheet.create({

    card: {
        flex: 1,
        flexDirection: "column",
        width: null,
        marginTop: 10,
        marginBottom:10
    },

    title: {
        fontSize: 18,
        color: "#333",
        fontWeight: 'bold',
        marginBottom:5
    },
    description: {
        fontSize: 16,
        color: "#333",
        borderWidth:1,
        borderColor:"#ff0000",
        borderRadius:10,
        padding:5,
        alignSelf: 'flex-start'
    }

});
