/**
 * Created by ianchen on 16/10/9.
 */

import React, {Component, PropTypes} from 'react'
import {Navigator, Text, StatusBar, View, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavBar from './NavBar'

export default class Nav extends Component {
    static propTypes = {
        route: PropTypes.object.isRequired,
        renderScene: PropTypes.func,
        configureScene: PropTypes.func,
        leftButton: PropTypes.func,
        title: PropTypes.func,
        rightButton: PropTypes.func,
        barStyle: PropTypes.object
    };

    constructor(props) {
        super(props);
    }

    renderScene(route, navigator) {
        return <route.component navigator={navigator} {...route.passProps} />
    }

    LeftButton(route, navigator, index, navState) {
        let _component = route.component.WrappedComponent || route.component;
        let _prototype = _component.prototype;
        if (_prototype._navLeft)
            return _prototype._navLeft({route, navigator, index, navState}, _prototype)

        if (index > 0) {
            return (
                <View style={styles.navContainer}>
                    <TouchableOpacity
                        underlayColor='transparent'
                        onPress={() => {
                            if (index > 0) {
                                navigator.pop()
                            }
                        }}
                    >
                        <Icon
                            style={styles.leftNavButtonText}
                            name='chevron-left'/>
                    </TouchableOpacity>
                </View>
            );
        }
    }

    RightButton(route, navigator, index, navState) {
        let _component = route.component.WrappedComponent || route.component;
        let _prototype = _component.prototype;
        if (_prototype._navRight)
            return _prototype._navRight({route, navigator, index, navState}, _prototype)
    }

    Title(route, navigator, index, navState) {
        let _component = route.component.WrappedComponent || route.component;
        let _prototype = _component.prototype;
        if (_prototype._navTitle)
            return _prototype._navTitle({route, navigator, index, navState}, _prototype)

        if (typeof(route.title) == 'string') {
            return (
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <StatusBar backgroundColor='#ff4971'/>
                    <Text style={styles.navBarTitle}>
                        {route.title}
                    </Text>
                </View>
            );
        }

        return route.title();
    }

    configureScene(route, routeStack) {
        return Object.assign(Navigator.SceneConfigs.PushFromRight, {defaultTransitionVelocity:1.5,});
    }

    render() {
        var navBar = {
            LeftButton: this.LeftButton,
            RightButton: this.RightButton,
            Title: this.Title
        };
        navBar.LeftButton = this.props.leftButton || navBar.LeftButton;
        navBar.Title = this.props.title || navBar.Title;
        navBar.RightButton = this.props.rightButton || navBar.RightButton;

        return(
            <Navigator
                navigationBar={
                    <Navigator.NavigationBar
                        style={[{backgroundColor: '#ff4971', flex: 1, height: 62,}, this.props.barStyle]}
                        routeMapper={navBar}
                        navigationStyles={Navigator.NavigationBar.StylesIOS}/>
                }
                initialRoute={this.props.route}
                renderScene={this.props.renderScene || this.renderScene.bind(this)}
                configureScene={this.props.configureScene }
                style={[styles.navContainer, {paddingTop: 62}]}
            />
        );
    }
}

export var navPush = {
    push(props, component, title, other?: Object)
    {
        props.navigator.push({component: component, title: title, passProps: other});
    },
    pop(props, n?: number)
    {
        if (n)
            props.navigator.popN(n);
        else
            props.navigator.pop();
    },
    popToTop(props)
    {
        props.navigator.popToTop();
    },
};

const styles = StyleSheet.create({
    // 导航栏
    navContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    // 左面导航按钮
    leftNavButtonText: {
        color: '#ffffff',
        fontSize: 33,
        paddingLeft: 5,
        justifyContent: 'center',
    },
    navBarTitle: {
        fontSize: 18,
        lineHeight: 35,
        color: 'rgb(255, 255, 255)',
        fontFamily: 'PingFang SC'
    }
});