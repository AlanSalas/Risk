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
    Platform
} from 'react-native';
import { ListItem, Divider, Button, Icon, Avatar } from 'react-native-elements'
import Moment from 'moment';

export default class CompanyBox extends Component {

    constructor(props) {
        super(props);
    }

    _onPress = () => {
        this.props.onPressItem(this.props.company);
    };

    renderLastAudit = (audits) => {
        const sorted = audits.sort((a, b) => {
            return new Date(a.createdAt) - new Date(b.createdAt);
        });
        if (sorted.length > 0) {
            const first = sorted[0];
            return (
                <TouchableOpacity onPress={this._onPress}>
                    <View style={{ paddingBottom: 5 }}>
                        <View style={styles.lastAuditView}>
                            <Text style={styles.subtitleText}>{Moment(first.createdAt).format('llll')}</Text>
                            <Text style={styles.subtitleText}>{first.location.address}</Text>
                        </View>
                        {/*<View style={{ paddingTop: 15 }}>
                            <Divider />
                            <View style={[styles.buttonSection, { paddingBottom: 0, paddingTop: 3, alignItems: 'center', justifyContent: 'flex-end' }]}>
                                <View style={{ width: '50%' }} >
                                    <Button
                                        icon={<Icon
                                            name={Platform.OS === 'ios' ? 'ios-share-alt' : 'md-share-alt'}
                                            type='ionicon'
                                            size={20}
                                            color='gray'
                                        />}
                                        clear
                                        title='Compartir'
                                        titleStyle={{ color: 'black' }}
                                    />
                                </View>

                            </View>
                            
                        </View>
                        */}
                    </View>
                </TouchableOpacity>
            )
        } else {
            return null;
        }
    }
    renderTitle = (text) => {
        return (
            <TouchableOpacity onPress={this._onPress}>
                <View style={{ alignItems: 'flex-start' }} >
                    <Text style={[styles.name, { marginTop: 0 }]}>{text}</Text>
                </View>
        </TouchableOpacity>)
    }

    render() {
        const { company, index } = this.props;
        return (

            <ListItem
                style={[styles.card]}
                containerStyle={{ backgroundColor: '#eff0f1', alignItems:'stretch'}}
                leftAvatar
                title={this.renderTitle(company.name)}
                subtitle={this.renderLastAudit(company.audits)}
                
            />

        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: "column",
        justifyContent: "center"
    },
    card: {
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 3,
        shadowColor: 'black',
        width: '95%',
        height: null,
        padding: 2,
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
        fontWeight: 'bold',
        marginTop: 20,
        color: "#333"
    },
    description: {
        fontSize: 14,
        marginTop: 5,
        color: "#333"
    },
    lastAuditView: {
        flexDirection: 'column',
        paddingTop: 15,
        paddingBottom: 7,
        height: 50

    },
    subtitleText: {
        color: 'grey',
        paddingBottom: 4
    },
    buttonSection: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
    }


});
