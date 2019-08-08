
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  NetInfo,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { connect } from "react-redux";
import { bindActionCreators, compose } from 'redux';
import * as actions from '../redux/audits/actions';
import AuditoriasList from '../components/HomeView/AuditoriasList'

class AuditoriasTabHome extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: { backgroundColor: '#ffa500' },
    headerTintColor: 'white',
    title: "Auditorias",
    headerLeft: (
      <TouchableOpacity style={{paddingLeft:15}}
        onPress={() => navigation.openDrawer()}>
        <Icon name="close" />
      </TouchableOpacity>
    ),
  })
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: true,
      isConnected: true
    };
    this.props.getAudits(false);
  }
  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }
  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.completedAudit) {
      this.props.getAudits(false);
      this.forceUpdate();
    }
  }

  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({ isConnected });
    } else {
      this.setState({ isConnected });
    }
  };

  handleAuditoria = (audit) => {
    this.props.selectCurrentAuditTemplate(audit.auditTemplateId, audit.id);
    this.props.navigation.navigate('newAuditoria');
  };
  _onRefresh = () => {
    this.props.getAudits(false);
  }
  render() {
    const MiniOfflineSign = () => {
      return (
        <View style={styles.offlineContainer}>
          <Text style={styles.offlineText}>No Internet Connection</Text>
        </View>
      );
    }
    const Activity = () => {
      if (this.props.loading) {
        return (
          <View style={[styles.activityContainer, styles.horizontal]}>
            <ActivityIndicator size="large" color="#dd6401" />
          </View>
        );
      }

      if (!this.props.hasValue) {
        return (
          <View style={[styles.activityContainer, styles.horizontal, { paddingTop: '50%', justifyContent: 'flex-start',flexDirection: 'column'}]}>
          <Text style={{ color: 'gray', alignSelf: 'center', paddingBottom: 20 }}>No hay auditorias asignadas</Text>
          <Button
            large
            icon={{ name: 'refresh', type: 'font-awesome', color: 'white' }}
            title='Actualizar' 
            style={{alignSelf: 'flex-end', paddingTop: 20}}
            backgroundColor={"#9E9E9E"}
            buttonStyle={{ backgroundColor : "#9E9E9E"}}
            onPress={this._onRefresh}
            />
        </View>
        );
      }
      return null;
    }
    const RenderList = (props) => {
      const { hasValue, loadingCompleteId} = props;
      if (hasValue) {
        return <AuditoriasList auditorias={this.props.audits} _onPressItem={this.handleAuditoria} onRefresh={this._onRefresh}/>
      } else if(loadingCompleteId) {
        return <Text>Actualizando ...</Text>
      } else {
        return null;
      }
    }
    
    if (!this.state.isConnected) {
      return <MiniOfflineSign />;
    }
    return (
      <View style={styles.container}>
        <Activity />
        <RenderList hasValue={this.props.hasValue}   />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 0,
    paddingRight: 0,
    width: '100%'
  },
  activityContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  welcome: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    backgroundColor: 'transparent',
    color: 'white',

  },
  logo: {
    width: 280,
    height: 150,
    marginBottom: 15,
    resizeMode: 'contain'
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  },
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    top: 30
  },
  offlineText: { color: '#fff' }

});


const mapStateToProps = (state) => {
  return {
    authError: state.audits.authError,
    fetchError: state.audits.fetchError,
    audits: state.audits.pendingAuditList,
    currentAuditTemplate: state.audits.currentAuditTemplate,
    currentAuditId: state.audits.currentAuditId,
    hasValue: state.audits.pendingAuditList.length > 0,
    loading: state.audits.loadingAudits,
    completedAudit: state.audits.completedAudit,
    loadingCompleteId: state.audits.loadingCompleteId
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getAudits: actions.getAudits,
    selectCurrentAuditTemplate: actions.selectCurrentAuditTemplate }, dispatch);
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(AuditoriasTabHome);
