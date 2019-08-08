/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import {
  Text,
  Platform
} from 'react-native';

import { createMaterialTopTabNavigator, createBottomTabNavigator } from 'react-navigation-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';


import AuditoriasTabHome from './AuditoriasTabHome';
import AuditoriasCompletadasTabHome from './AuditoriasCompletadasTabHome';


const tabBarIcon = name => ({ tintColor, horizontal }) => (
  <MaterialIcons name={name} color={tintColor} size={horizontal ? 17 : 24} />
);

const androidTabs = createMaterialTopTabNavigator({
  auditorias: {
    screen: AuditoriasTabHome,
    navigationOptions: ({ navigation }) => ({
      title: 'Auditorias',
    })
  },
  auditoriasCompletadas: {
    screen: AuditoriasCompletadasTabHome,
    navigationOptions: ({ navigation }) => ({
      title: 'Completadas',
    })
  }
}, {
  tabBarOptions: {
    style: {
      backgroundColor: '#e0721c',
    },
    indicatorStyle: {
      backgroundColor: 'white'
    }
  }
  });

const IosTabs = createBottomTabNavigator({
  auditorias: {
    screen: AuditoriasTabHome,
    navigationOptions: ({navigation}) => ({
      title: 'Auditorias',
    })
  },
  auditoriasCompletadas: {
    screen: AuditoriasCompletadasTabHome,
    navigationOptions: ({navigation}) => ({
      title: 'Completadas',
    })
  }
});

export default Platform.OS === 'ios' ? IosTabs : androidTabs;


