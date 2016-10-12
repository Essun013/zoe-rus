/**
 * Created by ianchen on 16/10/8.
 */

import React, {Component} from 'react'
import {ScrollView, View, StyleSheet, Platform} from 'react-native'
import {Box} from './Box';
import {Topic} from './Topic';

import {
    Text,
} from 'react-native-elements'

export default class Find extends Component {
    render() {
        const {toggleSideMenu} = this.props;
        return (
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <Box/>
                <Topic/>
            </ScrollView>
        )
    }
}




const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5'
    }
})