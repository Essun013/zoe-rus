/**
 * Created by ianchen on 2016/11/30.
 */

import React, {Component} from 'react';
import {ScrollView, View, StyleSheet, Alert, TouchableOpacity, Image, Text} from 'react-native';

export default class TabBar extends Component {

    render() {
        return (
            <View>
                {
                    this.props.tab
                }
            </View>
        );
    }
}