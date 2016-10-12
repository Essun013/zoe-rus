/**
 * Created by ianchen on 16/10/12.
 */

import React, {Component} from 'react'
import Status from './Status';
import Nav from '../../components/Nav/Nav';
import {Navigator, Text, StatusBar, View, TouchableOpacity, StyleSheet, Alert} from 'react-native';

export default class FindNav extends Component {
    constructor(props) {
        super(props);

        this.testTitleFn = this.testTitleFn.bind(this);
    }

    testTitleFn() {
        return <Text>123</Text>
    }

    render() {
        return <Nav route={{component: Status, title: this.testTitleFn}} barStyle={{backgroundColor: '#ff5884'}}/>
    }
}