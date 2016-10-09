/**
 * Created by ianchen on 16/10/9.
 */

import React, {Component} from 'react'
import {Navigator, Text, StatusBar, View, TouchableOpacity, Alert, StyleSheet} from 'react-native'

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
                        <Text style={[styles.leftNavButtonText]}>
                            ←
                        </Text>
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
        let leftButtonFn = this.props.leftButton;
        let titleFn = this.props.title;
        let rightButtonFn = this.props.rightButtonFn;
        return (
            <Navigator
                navigationBar={
                    <Navigator.NavigationBar
                        style={this.props.barStyle}
                        routeMapper={{
                            LeftButton(route, navigator, index, navState){if (leftButtonFn) return leftButtonFn(route, navigator, index, navState)},
                            RightButton(route, navigator, index, navState){if (rightButtonFn) return rightButtonFn},
                            Title(route, navigator, index, navState){return (
                                <View>
                                    <StatusBar backgroundColor='#ff4368'/>
                                    <Text style={styles.navBarTitle}>
                                        {route.title}
                                    </Text>
                                </View>
                            );}
                        }}
                        navigationStyles={Navigator.NavigationBar.StylesIOS}/>
                }
                initialRoute={this.props.route}
                renderScene={this.props.renderScene}/>
        )
    }
}

const styles = StyleSheet.create({
    // 导航栏
    navContainer: {
        flex: 2,
    },
    // 左面导航按钮
    leftNavButtonText: {
        color: '#ffffff',
        fontSize: 30,
        paddingLeft: 10,
        marginTop: -4
    },
    navBarTitle: {
        fontSize: 18,
        lineHeight: 35,
        color: 'rgb(255, 255, 255)'
    }
});