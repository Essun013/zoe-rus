/**
 * Created by ianchen on 16/10/8.
 */

import React, {Component} from 'react'
import {Navigator, Text, PixelRatio, StatusBar, View, TouchableOpacity} from 'react-native'
import Home from './Home'
import Nav from '../../components/Nav/Nav';

var NavBar = {
    LeftButton(route, navigator, index, navState) {
        return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}><TouchableOpacity>
            <Text style={{flex: 2, backgroundColor: 'black'}}>123</Text>
        </TouchableOpacity></View>;
    },
    RightButton(route, navigator, index, navState) {
        return null;
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

export default class HomeNav extends Component {
    constructor(props) {
        super(props);
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
            <Nav route={{component: Home, title: '9月28日'}} barStyle={{backgroundColor: '#ff4368'}} renderScene={this.renderScene.bind(this)} />
        )
    }
}