/**
 * Created by linys on 16/10/13.
 */

import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import ScrollTabBar from '../ScrollTabBar/ScrollTabBar';
import Content from './Content/Content';
import Top from './Top/Top'
import {hideMenu} from '../../../actions';

class PregnancyCheck extends Component {

    constructor(props) {
        super(props);

    }


    render() {
        return (
            <View>
                <Top />
                <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                    <Content />
                </ScrollView>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
    }


})

const {connect} = require('react-redux');

module.exports = connect()(PregnancyCheck);