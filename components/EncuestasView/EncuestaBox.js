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
import { ListItem } from 'react-native-elements'
import Moment from 'moment';

export default class EncuestaBox extends Component {

    _onPress = () => {
        this.props.onPressItem(this.props.id, this.props.surveyTemplate.name);
    };

    render() {
        const { surveyTemplate, index } = this.props;
        if (!surveyTemplate) {
            return null
        } else {
            return (
                <TouchableOpacity onPress={this._onPress}>
                    <ListItem
                        roundAvatar
                        topDivider
                        leftAvatar
                        containerStyle={{ backgroundColor: index % 2 === 0 ? '#eff0f1' : '#ffffff' }}
                        title={surveyTemplate.name}
                        subtitle={
                            <View style={styles.subtitleView}>
                                <Text style={[styles.subtitleText, { fontWeight: 'bold' }]}>{surveyTemplate.company.name}</Text>
                                <Text style={styles.subtitleText}>{Moment(surveyTemplate.createdAt).format('llll')}</Text>
                            </View>
                        }

                    />
                </TouchableOpacity>
            );

        }
    }
}

const styles = StyleSheet.create({

    imageProfile: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginRight: 10
    },
    card: {
        backgroundColor: "white",
        alignItems: 'center',
        flexDirection: "row",
        borderRadius: 3,
        shadowColor: 'black',
        width: null,
        height: 150,
        padding: 10,
        margin: 5,
        shadowOpacity: .2,
        shadowOffset: {
            height: 5,
            width: 5
        },
        elevation: 5
    },
    info: {
        flex: 1,
        alignItems: "flex-start",
        flexDirection: "column",
        justifyContent: "center"
    },
    name: {
        fontSize: 20,
        marginTop: 20,
        color: "#333"
    },
    description: {
        fontSize: 14,
        marginTop: 5,
        color: "#333"
    },
    subtitleView: {
        flexDirection: 'column',
        paddingTop: 5,

    },
    subtitleText: {
        color: 'grey'
    }


});
