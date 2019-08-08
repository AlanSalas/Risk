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
    TouchableOpacity
} from 'react-native';

export default class QuestionAuditoriaBox extends Component {

    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };

    render() {
        const { question } = this.props;
        return (
            <TouchableOpacity onPress={this._onPress}>
                <View style={styles.card}>
                    <Text style={styles.title}>{question.title}</Text>
                    <View style={styles.answersContainer}>{answers}</View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({

    card: {
        flex: 1,
        flexDirection: "column",
        width: null,
        height: 150,
    },

    title: {
        fontSize: 20,
        color: "#333"
    },
    answersContainer: {
        flex: 1,
        flexDirection: "column"
    }


});
