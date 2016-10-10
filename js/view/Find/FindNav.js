/**
 * Created by ianchen on 16/10/8.
 */

import React, {Component} from 'react'
import Find from './Find';
import Nav from '../../components/Nav/Nav';

export default class FindNav extends Component {
    constructor(props) {
        super(props);
    }

    renderScene(route, navigator) {
        return <route.component navigator={navigator} {...route.passProps} />
    }

    render() {
        return <Nav route={{component: Find, title: '发现'}} renderScene={this.renderScene.bind(this)}/>
    }
}