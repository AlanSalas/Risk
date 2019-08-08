/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Image
} from 'react-native';
import { CheckBox } from 'react-native-elements';

export default class QuestionEncuestaBox extends Component {

    constructor(props) {
        super(props);
        const { surveyQuestion, answer } = props;

        this.state = {
            selected: answer ? answer.surveyQuestionOptionId : null,
            checked: answer ? answer.textAnswer === "true" : false,
            text: answer ? answer.textAnswer : ""
        }


    }
    _onPress = (text, answerId) => {
        if (answerId) {
            this.setState({ selected: answerId });
        }
        this.setState({ text: text })
        this.props.onPressItem(this.props.id, answerId, text);
    };
    _onPressFace = (option) => {
        this.setState({ selected: option });
        this.props.onPressItem(this.props.id, null, option+"");
    }
    _checkPress = () => {
        const newValue = !this.state.checked;
        this.setState({ checked: newValue });
        this.props.onPressItem(this.props.id, null, newValue + '')
    }

    renderFaces = (auditQuestionOptions, selectedOption) => {
        let imageMap = {
            1: require('../../assets/images/answers/faces/1.png'),
            2: require('../../assets/images/answers/faces/2.png'),
            3: require('../../assets/images/answers/faces/3.png'),
            4: require('../../assets/images/answers/faces/4.png'),
            5: require('../../assets/images/answers/faces/5.png'),
        }
        let answers = [];
        for (let i = 1; i <= 5; i++) {
            let selected = this.state.selected == i ? true : false
            answers.push(
                <View key={`option-${i}`} style={[styles.facesContainer]}>
                    <TouchableOpacity  style={ [ selected ? styles.touchableSelected : styles.touchable, selected ? {borderBottomWidth: 2, borderBottomColor: "#ffa500" }: {}]} onPress={event => {
                        this._onPressFace(i)
                    }}>
                        <Image source={imageMap[i]} style={ selected ? styles.faceSelected  : styles.face} />
                    </TouchableOpacity>
                </View>
            )
        }
        return answers;
    }

    renderOptions = (surveyQuestionOptions, selectedOption) => {
        let answers = surveyQuestionOptions.map((option, index) => {
            //this.setState({selected : selectedOption});
            let selected = this.state.selected == option.id ? true : false
            return (
                <View key={`option-${option.id}`} style={styles.viewButton}>
                    <TouchableOpacity style={[styles.buttonContainer, selected ? styles.optionSelected : styles.option]} onPress={event => {
                        this._onPress(null, option.id)
                    }}>
                        <Text style={styles.loginText}>{option.option}</Text>
                    </TouchableOpacity>
                </View>
            );
        }, this);

        return answers;
    }
    renderSimpleAnswer = (text) => {
        //this.setState({text});
        return (

            <TextInput
                borderBottomWidth={1}
                underlineColorAndroid='transparent'
                selectionColor={'#dd6401'}
                onChangeText={event => { this._onPress(event, null) }} value={this.state.text} ></TextInput>


        )
    }
    renderCheckAnswer = (cheched) => {
        //this.setState({checked : cheched})
        return (
            <CheckBox
                onPress={this._checkPress}
                checked={this.state.checked}
            />

        )
    }

    _renderAnswer = (surveyQuestion, answer) => {
        switch (surveyQuestion.questionType.name) {
            case 'options':
                const option = answer ? answer.surveyQuestionOptionId : null;
                //this.setState({selected: option})
                return this.renderOptions(surveyQuestion.surveyQuestionOptions, option);
            case 'simple':
                const text = answer ? answer.textAnswer : "";
                //this.setState({text: text})
                return this.renderSimpleAnswer(text);
            case 'check':
                const cheched = answer ? answer.textAnswer === "true" : false;
                //this.setState({checked: cheched})
                return this.renderCheckAnswer(cheched);
            case 'faces':
                return this.renderFaces();
        }
    }

    componentWillReceiveProps(nextProps) {
        const { surveyQuestion, answer } = nextProps;
        /* switch (surveyQuestion.questionType.name) {
             case 'options':
                 const option = answer ? answer.surveyQuestionOptionId : null;
                 this.setState({selected: option})
             case 'simple':
                 const text = answer ? answer.textAnswer : "";
                 this.setState({text: text})
             case 'check':
                  const cheched = answer ? answer.textAnswer === "true" : false;
                  this.setState({checked: cheched})
                 
         }*/
    }

    render() {
        const { surveyQuestion, answer } = this.props;
        const answerStyle = surveyQuestion && surveyQuestion.questionType.name  === 'faces'? {flexDirection: 'row'} : {} 
        if (surveyQuestion) {
            return (
                <View style={styles.card}>
                    <Text style={styles.title}>{surveyQuestion.question}</Text>
                    <View style={[styles.answersContainer, answerStyle]}>
                        {this._renderAnswer(surveyQuestion, answer)}
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
        margin: 5
    },
    title: {
        fontSize: 20,
        color: "#333",
        marginBottom: 10
    },
    answersContainer: {
        flex: 1,
        flexDirection: "column",
    },
    viewButton: {
        marginTop: 5,
        marginBottom: 5
    },
    buttonContainer: {
        height: null,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        padding: 10,
        width: null,
        borderRadius: 3,
        shadowColor: 'transparent',
        shadowOpacity: .2,
        shadowOffset: {
            height: 2,
            width: 2
        },
        elevation: 2
    },
    optionSelected: {
        backgroundColor: "#ffa500"
    },
    selected: {
        backgroundColor: "#f7bb22"
    },
    facesContainer: {
        flex: 1,
        flexDirection: "row"
    },
    face: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        margin: 10,
        alignSelf: 'center'
        
    },
    faceSelected: {
        width: 55,
        height: 55,
        resizeMode: 'cover',
        margin: 15,
        alignSelf: 'center'
    },
    touchable : { 
        width: 58,
        height: 58,
    },
    touchableSelected : {
        width: 70,
        height: 70,
    }

});
