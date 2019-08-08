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
    TouchableOpacity,
    Share,
    AsyncStorage
} from 'react-native';
import { ListItem, Icon } from 'react-native-elements'
import Moment from 'moment';

export default class AuditoriaBox extends Component {

    constructor(props) {
        super(props)
        this.state = {
            url: 'http://test-risk-dashboard.s3-website-us-east-1.amazonaws.com'
        }
    }
    _onPress = () => {
        this.props.onPressItem(this.props.auditoria);
    };
    

    _share = async () => {
        const { enableShare } = this.props;
        if (enableShare) {
            const token = await AsyncStorage.getItem('@auth:token');
            const { auditoria } = this.props;
            const dashboardUrl = `${this.state.url}/audit/detail?languageId=${1}&auditId=${auditoria.id}&access_token=${token}`
            Share.share({
                message: `Check the audit ${auditoria.auditTemplate.name} created at  ${Moment(auditoria.createdAt).format('llll')}  click ${dashboardUrl}`,
                title: 'Check out this audit',
                url: dashboardUrl
            });
        }
    };

    render() {
        const { auditoria, index, enableShare } = this.props;
        if (!auditoria.auditTemplate) {
            return null
        } else {
            return (
                <TouchableOpacity onPress={this._onPress} onLongPress={this._share}>
                    <ListItem
                        roundAvatar
                        topDivider
                        leftAvatar
                        containerStyle={{ backgroundColor: index % 2 === 0 ? '#eff0f1' : '#ffffff' }}
                        title={auditoria.name}
                        subtitle={
                            <View style={styles.subtitleView}>
                                <Text style={[styles.subtitleText, { fontWeight: 'bold' }]}>{auditoria.auditTemplate.name}</Text>
                                <Text style={styles.subtitleText}>{Moment(auditoria.createdAt).format('llll')}</Text>
                                {enableShare && 
                                <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-end'}}>
                                    <Icon
                                    name='share'
                                    type='font-awesome'
                                    size={24}
                                    color='grey'
                                />
                                </View>
                                }
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
