/**
 * Created by ianchen on 2016/11/2.
 */

'use strict';

var ColorPropType = require('ColorPropType');
import React, {Component, PropTypes} from 'react'
import {StatusBar, View, StyleSheet, Platform} from 'react-native';
import {anbacklsn} from '../../common/util'

export default class INavBar extends Component {
  static propTypes = {
    ...View.propTypes,
    left: PropTypes.func,
    title: PropTypes.func,
    right: PropTypes.func,
    iNavigator: PropTypes.object.isRequired,
    iRoute: PropTypes.object.isRequired,
    barStyle: View.propTypes.style,
    statusBarColor: ColorPropType,
    body: PropTypes.func.isRequired,
    hide: PropTypes.bool,
    titleCenter: PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.iNavBar = this.iNavBar.bind(this);

    this.state = {
      body: <this.props.body iNavBar={this.iNavBar} navigator={this.props.iNavigator} {...this.props.iRoute.passProps}/>,
      bar: this.init(this.props.hide, this.props.left, this.props.title, this.props.right),
    }
  }

  init(hide, left, title, right) {
    if (!hide) {
      var i;

      for (i = 0; i < this.props.iNavigator.state.routeStack.length; i++) {
        if (this.props.iNavigator.state.routeStack[i] == this.props.iRoute)
          break;
      }

      anbacklsn.setNvg(this.props.iNavigator);

      let _left = left && left(this.props.iRoute, this.props.iNavigator, i, this.props.iNavigator.state);
      let _title = title && title(this.props.iRoute, this.props.iNavigator, i, this.props.iNavigator.state);
      let _right = right && right(this.props.iRoute, this.props.iNavigator, i, this.props.iNavigator.state);

      return this.navBar(_left, _title, _right)
    }
  }

  navBar(left, title, right) {
    var titleCenter = this.props.titleCenter;
    let _leftStyle = titleCenter ? styles.leftButton : {};
    let _titleStyle = titleCenter ? styles.title : {flex: 1};
    let _rightStyle = titleCenter ? styles.rightButton : {};

    return (
      <View style={[styles.bar, this.props.barStyle]}>
        <View style={styles.view}>
          <View style={_leftStyle}>{left}</View>
          <View style={_titleStyle}>{title}</View>
          <View style={_rightStyle}>{right}</View>
        </View>
      </View>
    )
  }

  statusBar() {
    if (this.state.statusBarColor === 'default')
      return null;

    let _color = this.state.statusBarColor || this.props.statusBarColor;

    if (_color)
      return <StatusBar backgroundColor={_color}/>
  }

  iNavBar(target, bar) {
    let _bar, _statusBarColor = this.props.statusBarColor;
    if (bar) {
      if (bar.statusBarColor)
        _statusBarColor = bar.statusBarColor;

      if (!bar.hide) {
        let leftFn = bar.left || this.props.left;
        let titleFn = bar.title || this.props.title;
        let rightFn = bar.right || this.props.right;
        _bar = this.init(bar.hide, leftFn, titleFn, rightFn)
      }
    }

    setTimeout(() => {
      this.setState({bar: _bar, statusBarColor: _statusBarColor})
    }, 1);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.statusBar()}
        {this.state.bar}
        {this.state.body}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bar: {
    ...Platform.select({
      ios: {
        paddingTop: 15,
        height: 60
      },
      android: {
        height: 40,
      }
    }),
  },
  leftButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 999
  },
  title: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    zIndex: 998,
  },
  rightButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 999
  },
  view: {
    flex: 1,
    flexDirection: 'row',
  }
});