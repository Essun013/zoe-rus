/**
 * Created by ianchen on 16/10/8.
 */

import React, {Component} from 'react';
import Record from './Record';
import Nav from '../../components/Nav/Nav';


export default class RecordNav extends Component {
    constructor(props) {
        super(props);
    }

    renderScene(route, navigator) {
        return <route.component navigator={navigator} {...route.passProps} />
    }

    render() {
        return <Nav route={{component: Record, title: '记录'}} renderScene={this.renderScene.bind(this)}/>
    }
}