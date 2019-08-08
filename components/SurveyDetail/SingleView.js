import { StyleSheet, View, Text, Picker, TouchableOpacity, TouchableHighlight, Image } from 'react-native';
import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import QuestionList from './QuestionList';

export default class  SurveyDetailView extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Encuesta XXXXXXXX",
        headerLeft: (
            <TouchableOpacity style={{paddingLeft:15}}
                onPress={() => navigation.goBack()}>
                <Icon color="#FFFFFF" name="close" />
            </TouchableOpacity>
        ),
    })
    constructor(props) {
        super(props);
    }
     numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    render() {
        const { survey } = this.props;
        const template = survey;
        if(template.questions && template.questions.length) {
            return (
                <View style={[styles.container, { paddingTop: 10}]}>
                <View style={styles.topBar}>
                    <Text style={styles.totalPeopleInterviewed}>Total de personas</Text>
                    <Text style={styles.descriptionTotalPeopleInterviewed}>{this.numberWithCommas(template.totalAnswered || 0)}</Text>
                </View>
                <View style={styles.mainContainer}>
                    <QuestionList questions={template.questions} counters={template.counters} totalAnswered={template.totalAnswered}/>
                </View>
            </View>                    
            )
        } else {
            return null;
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
        paddingLeft: 20,
        paddingRight: 20,
        width: null,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor:'#333' ,
        paddingBottom: 10
    },
    totalPeopleInterviewed: {
        flex: 1,
        color: "#000000",
        fontSize: 15,
        fontWeight: "bold"
    },
    descriptionTotalPeopleInterviewed: {
        flex: 1,
        color: "#000000",
        fontSize: 16,
        textAlign: "right"
    },
    mainContainer:{
        flex: 1,
        flexDirection: 'column'
    }
});



