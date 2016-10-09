/**
 * Created by ianchen on 16/10/8.
 */

import React, {Component} from 'react';
import Record from './Record';
import Nav from '../../components/Nav/Nav';


export default class RecordNav extends Component {
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
            <Nav route={{component: Record, title: '记录'}} barStyle={{backgroundColor: '#ff4368'}}
                 renderScene={this.renderScene.bind(this)}/>
        )
    }
}