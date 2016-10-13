/**
 * Created by ianchen on 16/10/9.
 */

import React, {Component, PropTypes} from 'react'
import {Navigator, Text, StatusBar, View, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

var NavBar = {
    LeftButton(route, navigator, index, navState) {
        if (index > 0) {
            return (
                <View style={styles.navContainer}>
                    <TouchableOpacity
                        underlayColor='transparent'
                        onPress={() => {
                            if (index > 0) {
                                navigator.pop()
                            }
                        }}>
                        <Icon
                            style={styles.leftNavButtonText}
                            name='chevron-left'/>
                    </TouchableOpacity>
                </View>
            );
        }
    },
    RightButton(route, navigator, index, navState) {
    },
    Title(route, navigator, index, navState) {
        if (typeof(route.title) == 'string') {
            return (
                <View>
                    <StatusBar backgroundColor='#ff4971'/>
                    <Text style={styles.navBarTitle}>
                        {route.title}
                    </Text>
                </View>
            );
        }

        return route.title();
    }
};

export default class Nav extends Component {
    static propTypes = {
        route: PropTypes.object.isRequired,
        renderScene: PropTypes.func,
        configureScene: PropTypes.func,
        leftButton: PropTypes.func,
        title: PropTypes.func,
        rightButton: PropTypes.func,
        barStyle: PropTypes.object,
    };

    constructor(props) {
        super(props);
    }

    renderScene(route, navigator) {
        return <route.component navigator={navigator} {...route.passProps} />
    }

    render() {
        NavBar.LeftButton = this.props.leftButton || NavBar.LeftButton;
        NavBar.Title = this.props.title || NavBar.Title;
        NavBar.RightButton = this.props.rightButton || NavBar.RightButton;

        return (
            <Navigator
                navigationBar={
                    <Navigator.NavigationBar
                        style={this.props.barStyle || {backgroundColor: '#ff4971', flex: 1, height: 62,}}
                        routeMapper={NavBar}
                        navigationStyles={Navigator.NavigationBar.StylesIOS}/>
                }
                initialRoute={this.props.route}
                renderScene={this.props.renderScene || this.renderScene.bind(this)}
                configureScene={this.props.configureScene}
                style={[styles.navContainer, {paddingTop: 62}]}
            />
        )
    }
}

export var navPush = {
    push(props, component, title, other?: Object)
    {
        props.navigator.push({component: component, title: title, ...other});
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
    }
};

const styles = StyleSheet.create({
    // 导航栏
    navContainer: {
        flex: 1,
    },
    // 左面导航按钮
    leftNavButtonText: {
        color: '#ffffff',
        fontSize: 30,
        paddingLeft: 5,
    },
    navBarTitle: {
        fontSize: 18,
        lineHeight: 35,
        color: 'rgb(255, 255, 255)',
        fontFamily: 'PingFang SC'
    }
});