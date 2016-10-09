/**
 * Created by ianchen on 16/10/8.
 */

import React, {Component} from 'react';
import {
    Navigator,
} from 'react-native';
import Me from './Me';
import Nav from '../../components/Nav/Nav';

export default class MeNav extends Component {
    constructor() {
        super();
        this.renderScene = this.renderScene.bind(this);
        this.configureScene = this.configureScene.bind(this);
    }

    renderScene(route, navigator) {
        const {toggleSideMenu} = this.props;
        return (
            <route.component navigator={navigator} {...route.passProps} />
        )
    }

    configureScene(route, routeStack) {
        return Navigator.SceneConfigs.VerticalDownSwipeJump;
    }

    render() {
        return (
            <Nav route={{component: Me, title: '我'}} barStyle={{backgroundColor: '#ff4368'}}
                 renderScene={this.renderScene.bind(this)} configureScene={this.configureScene.bind(this)}/>
        )
    }
}