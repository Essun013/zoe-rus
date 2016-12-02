/**
 * Created by ianchen on 16/10/8.
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import {Tabs, Tab} from 'react-native-elements';
// import JPush , {JpushEventReceiveMessage, JpushEventOpenMessage} from 'react-native-jpush';
import HomeNav from '../Home/HomeNav';
import StatusNav from '../Status/StatusNav';
import DeviceInfo from 'react-native-device-info';
import apiHttp from '../../common/util/http';
import {rcache} from '../../common/util';
import {tabBarUtil} from '../Tabs/TabBar';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      component: null,
    };

    //保存设备ID  0605A0A5-0159-4F17-9B7D-A6991420779F
    rcache.put("macID", DeviceInfo.getUniqueID());
    let params = {
      username: DeviceInfo.getUniqueID(),
      password: 1
    }
    rcache.get('firstChoose', (err, result) => {
      if (!result) {
        this.loginSys();
      } else if (result === 'yes') {
        this.setState({component: this.renderStatus});
      } else if (result === 'no') {
        this.setState({component: this.renderHome});
      }
    });

    this.switchMenu = this.switchMenu.bind(this);
    tabBarUtil.switchFn = this.switchMenu;
  }

  loginSys() {
    let params = {
      username: DeviceInfo.getUniqueID(),
      password: 1
    }
    apiHttp.apiPost('/uc/user/sign-in', params, (data) => {
      if (data.code == 0) {
        rcache.put('firstChoose', 'no');
        rcache.put("loginState", 'true');
        rcache.put("user", JSON.stringify(data.data));
        this.setState({component: this.renderHome});
      } else {
        this.setState({component: this.renderStatus});
      }
    }, (err) => {
      this.setState({component: this.renderStatus});
    });
  }

  // componentDidMount() {
  //     JPush.requestPermissions()
  //     this.pushlisteners = [
  //         JPush.addEventListener(JpushEventReceiveMessage, this.onReceiveMessage.bind(this)),
  //         JPush.addEventListener(JpushEventOpenMessage, this.onOpenMessage.bind(this)),
  //     ]
  // }
  // componentWillUnmount() {
  //     this.pushlisteners.forEach(listener=> {
  //         JPush.removeEventListener(listener);
  //     });
  // }
  // onReceiveMessage(message) {
  // }
  // onOpenMessage(message) {
  //
  // }
  
  switchMenu(comp) {
    this.setState({component: comp});
  }

  render() {
    this.renderOther();
    const {component} = this.state;

    return typeof(component) == 'function' ? component() : null;
  }

  renderOther() {
    let _reduxArgs = this.props.reduxArgs;
    let _goHome = _reduxArgs && _reduxArgs.goHome;
    let _component = this.state.component;
    if (_goHome && _component && _component.name.indexOf('renderMain') < 0) {
      setTimeout(() => {
        this.setState({component: this.renderHome});
        rcache.put('firstChoose', 'no');
      }, 1);
    }
  }

  renderStatus() {
    return <StatusNav/>;
  }

  renderHome() {
    return <HomeNav/>;
  }
}

const styles = StyleSheet.create({
  menuIcon: {
    height: 26,
    width: 28
  },
  menuIconFont: {
    fontSize: 13,
    ...Platform.select({
      ios: {
        marginTop: 2
      },
      android: {
        marginTop: 0,
        marginBottom: 3
      }
    })
  },
  tabs: {
    height: 49,
    backgroundColor: '#f6f6f8',
  },
  tabsShadow: {
    backgroundColor: '#abaab0',
    ...Platform.select({
      android: {
        height: 1,
      }
    })
  },
  tab: {
    ...Platform.select({
      ios: {
        marginBottom: 2
      },
      android: {
        marginBottom: -2
      }
    })
  },
  tabSelected: {
    color: '#ff7ba3'
  }
});

function select(store) {
  return {
    reduxArgs: store.homeX.reduxArgs,
  }
}

const {connect} = require('react-redux');
module.exports = connect(select)(Main);