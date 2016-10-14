/**
 * Created by linys on 16/10/13.
 */

import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Image, Text, TouchableOpacity, Alert} from 'react-native';
import device from '../../../common/util/device';
import ScrollTabBar from '../ScrollTabBar/ScrollTabBar'
import Content from './Content/Content'

class BabyGrow extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <ScrollTabBar/>
                <Content/>
            </ScrollView>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5'
    }
})

module.exports = BabyGrow;