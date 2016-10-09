/**
 * Created by ianchen on 16/10/8.
 */

import React, {Component} from 'react';
import {Navigator, Text, PixelRatio, StatusBar, View, TouchableOpacity, StyleSheet} from 'react-native';
import Me from './Me';

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
                        <Text style={[styles.leftNavButtonText, {fontSize: 30, paddingLeft: 10, marginTop: -4}]}>
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
                <Text style={{fontSize: 18, lineHeight: 35, color: 'rgb(255, 255, 255)'}}>
                    {route.title}
                </Text>
            </View>
        );
    }
};

class MeNav extends Component {
    constructor() {
        super();
        this.renderScene = this.renderScene.bind(this);
    }

    renderScene(route, navigator) {
        const {toggleSideMenu} = this.props;
        return (
            <route.component toggleSideMenu={toggleSideMenu} navigator={navigator} {...route.passProps} />
        )
    }

    render() {
        const {toggleSideMenu} = this.props;
        return (
            <Navigator
                navigationBar={
                    <Navigator.NavigationBar
                        style={{backgroundColor: '#ff4368'}}
                        routeMapper={NavBar}
                        navigationStyles={Navigator.NavigationBar.StylesIOS}/>
                }
                initialRoute={{component: Me, title: '我'}}
                renderScene={this.renderScene.bind(this)}/>
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
    }
});

export default MeNav