/**
 * Created by ianchen on 2016/11/2.
 */

'use strict';

var ColorPropType = require('ColorPropType');
import React, {Component, PropTypes} from 'react'
import {StatusBar, View, StyleSheet, Platform, TouchableOpacity} from 'react-native';

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
            body: <this.props.body iNavBar={this.iNavBar}
                                   navigator={this.props.iNavigator} {...this.props.iRoute.passProps}/>,
            bar: this.init()
        }
    }

    init() {
        if (!this.props.hide) {
            let _left = this.props.left && this.props.left(this.props.iRoute, this.props.iNavigator, this.props.iRoute.__navigatorRouteID);
            let _title = this.props.title && this.props.title(this.props.iRoute, this.props.iNavigator, this.props.iRoute.__navigatorRouteID);
            let _right = this.props.right && this.props.right(this.props.iRoute, this.props.iNavigator, this.props.iRoute.__navigatorRouteID);

            return this.navBar(_left, _title, _right)
        }

        return null;
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

        if (this.state.statusBarColor)
            return <StatusBar backgroundColor={this.state.statusBarColor}/>
    }

    iNavBar(target, bar) {
        let _bar, _statusBarColor = this.props.statusBarColor;
        if (bar) {
            if (bar.statusBarColor)
                _statusBarColor = bar.statusBarColor;

            if (!bar.hide) {
                let leftFn = bar.left || this.props.left;
                let _left = leftFn && leftFn(this.props.iRoute, this.props.iNavigator, this.props.iRoute.__navigatorRouteID);

                let titleFn = bar.title || this.props.title;
                let _title = titleFn && titleFn(this.props.iRoute, this.props.iNavigator, this.props.iRoute.__navigatorRouteID);

                let rightFn = bar.right || this.props.right;
                let _right = rightFn && rightFn(this.props.iRoute, this.props.iNavigator, this.props.iRoute.__navigatorRouteID);

                _bar = this.navBar(_left, _title, _right)
            }
        }

        setTimeout(() => {
            this.setState({bar: _bar, statusBarColor: bar.statusBarColor || this.props.statusBarColor})
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
        height: 50,
        ...Platform.select({
            ios: {
                paddingTop: 20
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
        zIndex: 998
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
})