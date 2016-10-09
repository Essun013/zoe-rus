/**
 * Created by ianchen on 16/10/9.
 */

import React, {Component} from 'react'
import {Navigator, Text, StatusBar, View, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

var NavBar = {
    LeftButton(route, navigator, index, navState) {
        if (index == 0) {
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
                            name='chevron-left' />
                    </TouchableOpacity>
                </View>
            );
        }
    },
    RightButton(route, navigator, index, navState) {
    },
    Title(route, navigator, index, navState) {
        return (
            <View>
                <StatusBar backgroundColor='#ff4368'/>
                <Text style={styles.navBarTitle}>
                    {route.title}
                </Text>
            </View>
        );
    }
};

export default class Nav extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        NavBar.LeftButton = this.props.leftButton || NavBar.LeftButton;
        NavBar.Title = this.props.title || NavBar.Title;
        NavBar.RightButton = this.props.rightButtonFn || NavBar.RightButton;

        return (
            <Navigator
                navigationBar={
                    <Navigator.NavigationBar
                        style={this.props.barStyle}
                        routeMapper={NavBar}
                        navigationStyles={Navigator.NavigationBar.StylesIOS}/>
                }
                initialRoute={this.props.route}
                renderScene={this.props.renderScene}/>
        )
    }
}

export var navPush = {
    push(props, component, title, other) {
        props.navigator.push({component: component, title: title, ...other});
    }
};

const styles = StyleSheet.create({
    // 导航栏
    navContainer: {
        flex: 2,
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
        color: 'rgb(255, 255, 255)'
    }
});