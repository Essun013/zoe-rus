/**
 * Created by ianchen on 2016/11/2.
 */

import React, {Component, PropTypes} from 'react'
import {Navigator, Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import INavBar from './INavBar';
var ColorPropType = require('ColorPropType');

export default class INav extends Component {
  static propTypes = {
    ...View.propTypes,
    route: PropTypes.object.isRequired,
    configureScene: PropTypes.func,
    barStyle: PropTypes.object,
    hideBar: PropTypes.bool,
    titleCenter: PropTypes.bool,
    statusBarColor: ColorPropType
  };

  constructor(props) {
    super(props);

    this.state = {
      hideBar: false,
    }
  }

  renderScene(route, navigator) {
    return <INavBar barStyle={this.props.barStyle}
                    left={this.left.bind(this)}
                    title={this.title.bind(this)}
                    iRoute={route}
                    iNavigator={navigator}
                    body={route.component}
                    hide={this.props.hideBar}
                    titleCenter={this.props.titleCenter}
                    statusBarColor={this.props.statusBarColor}
                    {...this.props}/>
  }

  left(route, navigator, index, navState) {
    if (index > 0) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity
            underlayColor='transparent'
            onPress={() => {
              if (index > 0) {
                navigator.pop()
              }
            }}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Icon
              style={styles.leftNavButtonText}
              name='chevron-left'/>
          </TouchableOpacity>
        </View>
      );
    }
  }

  title(route, navigator, index, navState) {
    if (typeof(route.title) == 'string') {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.navBarTitle}>
            {route.title}
          </Text>
        </View>
      );
    }

    return route.title();
  }

  configureScene(route, routeStack) {
    return Object.assign(Navigator.SceneConfigs.PushFromRight, {defaultTransitionVelocity: 1.5,});
  }

  render() {
    return (
      <Navigator
        initialRoute={this.props.route}
        renderScene={this.renderScene.bind(this)}
        configureScene={this.props.configureScene}
        style={[]}
      />
    );
  }
}

const styles = StyleSheet.create({
  // 左面导航按钮
  leftNavButtonText: {
    color: '#ffffff',
    fontSize: 33,
    paddingLeft: 5,
    justifyContent: 'center',
  },
  navBarTitle: {
    fontSize: 18,
    color: 'rgb(255, 255, 255)',
    fontFamily: 'PingFang SC',
  }
})