/**
 * Created by ianchen on 16/10/8.
 */

import React, {Component} from 'react';
import Me from './Me';
import Nav from '../../components/Nav/Nav';

export default class MeNav extends Component {
    constructor(props) {
        super(props);
    }

    renderScene(route, navigator) {
        return <route.component navigator={navigator} {...route.passProps} />
    }

    render() {
        return <Nav route={{component: Me, title: '我'}} barStyle={{backgroundColor: '#ff5680'}} renderScene={this.renderScene.bind(this)}/>
    }
}