/**
 * Created by ianchen on 16/10/8.
 */


import React, {Component} from 'react'
import {ScrollView, View, StyleSheet, Platform, Text} from 'react-native'
import Top from './Top/Top';

class Home extends Component {
    render() {
        return (
            <ScrollView contentContainerStyle={[styles.container]}>
                <Top />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    heading: {
        color: 'white',
        marginTop: 10,
        fontSize: 22
    },
    hero: {
        marginTop: 60,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    titleContainer: {},
    button: {
        marginTop: 15
    },
    title: {
        textAlign: 'center',
        ...Platform.select({
            ios: {
            }
        })
    }
})

export default Home