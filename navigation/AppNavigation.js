import React from 'react'
import { Animated, Easing, View, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import DrawerContainer from '../screens/DrawerContainer'
import LoginScreen from '../screens/LoginScreen'
import HomeScreen from '../screens/HomeScreen'
import EncuestasScreen from '../screens/EncuestasScreen'
import NewAuditoriaScreen from '../screens/NewAuditoriaScreen'
import NewEncuestaScreen from '../screens/NewEncuestaScreen';
import NewEncuestaSelectLanguageScreen from '../screens/EncuestaSelectLanguage';
import ListAuditoriasCompletadas from '../screens/ListAuditoriasCompletadasScreen'
import ListEncuestasCompletadas from '../screens/ListEncuestasCompletadasScreen'
import AuditDetail from '../screens/AuditDetailScreen'
import SurveyDetail from '../screens/EncuestaDetailScreen'
import GlobalSelectLanguage from '../screens/GlobalSelectLanguage';


// https://github.com/react-community/react-navigation/issues/1254
const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
})

const drawerButton = (navigation) =>
<View style={{paddingLeft:15}}>
    <Icon
      name='menu'
      color='#ffffff'
      onPress={() => {
        navigation.toggleDrawer();
      }
      }
    ></Icon>
  </View>

  const optionsButton = (navigation) => 
    <TouchableOpacity style={{paddingRight:15}}
    onPress={() => {
      navigation.navigate('selectGlobalLang', {title: 'Configuracion'});
    }
    }
    >
    <Icon
      name='md-more'
      type='ionicon'
      color='#ffffff'
      
    ></Icon>
  </TouchableOpacity>
  

  // Auditorias stack
const AuditoriasStack = createStackNavigator({
  home: { screen: HomeScreen, },
  newAuditoria: { screen: NewAuditoriaScreen },
  listAuditoriasCompletadas: {screen: ListAuditoriasCompletadas},
  auditDetail: {screen: AuditDetail}
}, {
  headerMode: 'float',
  navigationOptions: ({ navigation }) => ({
    headerStyle: { backgroundColor: '#dd6401' },
    title: 'Auditorias',
    headerTintColor: 'white',
    gesturesEnabled: false,
    headerLeft: drawerButton(navigation),
    headerRight: optionsButton(navigation)
  })
})

// Encuestas stack
const EncuestasStack = createStackNavigator({
  encuestas: { screen: EncuestasScreen, },
  selectLanguageEncuesta:{ screen: NewEncuestaSelectLanguageScreen },
  selectGlobalLang: {screen :GlobalSelectLanguage },
  newEncuesta: { screen: NewEncuestaScreen, },
  listEncuestasCompletadas: {screen: ListEncuestasCompletadas},
  surveyDetail: {screen: SurveyDetail},
}, {
  headerMode: 'float',
  navigationOptions: ({ navigation }) => ({
    headerStyle: { backgroundColor: '#dd6401' },
    title: 'Encuestas',
    headerTintColor: 'white',
    gesturesEnabled: false,
    headerLeft: drawerButton(navigation),
    headerRight: optionsButton(navigation)
  })
})

// login stack
const LoginStack = createStackNavigator({
  loginScreen: { screen: LoginScreen },
  //signupScreen: { screen: SignupScreen },
  //forgottenPasswordScreen: { screen: ForgottenPasswordScreen, navigationOptions: { title: 'Forgot Password' } }
}, {
    headerMode: 'none'
  })

  // drawer stack
const drawerStack = createDrawerNavigator({
  Auditorias:AuditoriasStack,
  Encuestas: EncuestasStack
},{
  gesturesEnabled: false,
  contentComponent: DrawerContainer
})

const PrimaryNav = createStackNavigator({
  loginStack: { screen: LoginStack },
  drawerStack: { screen: drawerStack },
  
}, {
    // Default config for all screens
    headerMode: 'none',
    title: 'Main',
    initialRouteName: 'loginStack',
    transitionConfig: noTransitionConfig
  })

export default PrimaryNav


