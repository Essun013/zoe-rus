/**
 * Created by ianchen on 16/10/8.
 */

import React, {Component} from 'react'
import {Navigator, Text, PixelRatio, StatusBar, View, TouchableOpacity} from 'react-native'
import Home from './Find';
// import navigationBar from 'HSNavBar'

var NavBar = {
    LeftButton(route, navigator, index, navState) {
        return null;
    },
    RightButton(route, navigator, index, navState) {
        return null;
    },
    Title(route, navigator, index, navState) {
        return (
            <View>
                <StatusBar backgroundColor='#ff4368'/>
                <Text style={{fontSize: 18, lineHeight: 35, color: 'rgb(255, 255, 255)'}}>
                    发现
                </Text>
            </View>
        );
    }
};

class FindNav extends Component {
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
                initialRoute={{component: Home, name: 'home'}}
                renderScene={this.renderScene.bind(this)}/>
        )
    }
}

export default FindNav