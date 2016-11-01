/**
 * Created by ianchen on 2016/10/31.
 */

import React, {Component, PropTypes} from 'react'
import {ScrollView, View, StyleSheet, Alert, TouchableOpacity, Image} from 'react-native'

export default class NavBar extends Component {
    static propTypes = {
        icon: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
    }

    render() {

        let _param = {
            route: this.props.route,
            navigator: this.props.navigator,
            index: this.props.index,
            navState: this.props.navState
        }

        return this.props.icon()
    }
}