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
import EncuestasTab from './EncuestasTab';
import EncuestasCompletadasTab from './EncuestasCompletadasTab';

const androidTabs = createMaterialTopTabNavigator({
  auditorias: {
    screen: EncuestasTab,
    navigationOptions: ({ navigation }) => ({
      title: 'Encuestas',
    })
  },
  auditoriasCompletadas: {
    screen: EncuestasCompletadasTab,
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
    screen: EncuestasTab,
    navigationOptions: ({navigation}) => ({
      title: 'Encuestas',
    })
  },
  auditoriasCompletadas: {
    screen: EncuestasCompletadasTab,
    navigationOptions: ({navigation}) => ({
      title: 'Completadas',
    })
  }
});

export default Platform.OS === 'ios' ? IosTabs : androidTabs;


