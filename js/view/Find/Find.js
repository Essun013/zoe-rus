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

class Find extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <Box navigator={this.props.navigator} />
                <Topic />
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5'
    }
})

module.exports = Find;