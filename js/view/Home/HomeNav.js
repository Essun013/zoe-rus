/**
 * Created by ianchen on 16/10/8.
 */

import React, {Component} from 'react'
import Home from './Home'
import Nav from '../../components/Nav/Nav';

export default class HomeNav extends Component {
    constructor(props) {
        super(props);
    }

    renderScene(route, navigator) {
        return <route.component navigator={navigator} {...route.passProps} />
    }

    render() {
        return <Nav route={{component: Home, title: '9月28日'}} renderScene={this.renderScene.bind(this)} />;
    }
}