/**
 * Created by ianchen on 16/10/8.
 */

import React, {Component} from 'react';
import Me from './Me';
import Nav from '../../components/Nav/Nav';

export default class MeNav extends Component {
    render() {
        return <Nav route={{component: Me, title: '我'}} />
    }
}