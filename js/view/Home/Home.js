/**
 * Created by ianchen on 16/10/8.
 */


import React, {Component} from 'react'
import {ScrollView, View, StyleSheet, Platform, Text} from 'react-native'
import {Top} from './Top';
import {Mom} from './Mom';

class Home extends Component {
    render() {
        return <View style={{flex: 1}}>
            <Top/>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <Mom/>
            </ScrollView>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
    }
})

export default Home