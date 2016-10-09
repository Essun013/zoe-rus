/**
 * Created by ianchen on 16/10/8.
 */

import React, {Component} from 'react'
import Home from './Home'
import Nav from '../../components/Nav/Nav';

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
            <Nav route={{component: Home, title: '9月28日'}} barStyle={{backgroundColor: '#ff4971'}} renderScene={this.renderScene.bind(this)} />
        )
    }
}