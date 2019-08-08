import React from 'react'
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


export default class DrawerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }
  logout = () => {
    // This will reset back to loginStack
    // https://github.com/react-community/react-navigation/issues/1127
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      key: null,  // black magic
      actions: [NavigationActions.navigate({ routeName: 'loginStack' })]
    })
    this.props.navigation.dispatch(actionToDispatch)
  }

  onPress(screen) {
    const { navigation } = this.props;
    navigation.closeDrawer();
    navigation.navigate(screen)
  }

  onLogout() {
   AsyncStorage.removeItem('@auth:token');
   const { navigation } = this.props;
   navigation.navigate('loginScreen');
  }

  render() {

    return (
      <View style={styles.container}>
        <ImageBackground source={require('../assets/images/fondoMenu.png')} style={styles.containerMenuTop}>
          <Image source={require('../assets/images/logo.png')} style={styles.logo} />
        </ImageBackground>
        <TouchableOpacity onPress={() => { this.onPress('home') }} >
          <View style={styles.rowMenu}>
            <Image source={require('../assets/images/icon_auditorias.png')} style={styles.iconMenu} />
            <Text
              style={styles.textMenu}>
              Auditorias
          </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { this.onPress('encuestas') }}>
          <View style={styles.rowMenu}>
            <Image source={require('../assets/images/icon_encuestas.png')} style={styles.iconMenu} />
            <Text
              style={styles.textMenu}>
              Encuestas
          </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{alignSelf:'flex-end', marginTop: '100%',paddingBottom : moderateScale(5)}} onPress={() => { this.onLogout() }}>
          <View style={styles.rowMenu}>
          <Image source={require('../assets/images/icon_logout.png')} style={styles.iconMenu} />
            <Text
              style={styles.textMenu}>
              Salir
          </Text>
          </View>
        </TouchableOpacity>
      
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#ffffff',
  },
  containerMenuTop: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  logo: {
    width: 180,
    height: 130,
    resizeMode: 'contain'
  },
  descriptionApp: {

  },
  rowMenu: {
    flexDirection: "row",
    width: null,
    height: 40,
    justifyContent: "flex-start",
    alignItems: 'center',
    padding: 40,

  },
  iconMenu: {
    width: 20,
    height: 40,
    resizeMode: 'contain'
  },
  textMenu: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: 20,
    textAlign: 'center',
    minHeight: 25
  }
})