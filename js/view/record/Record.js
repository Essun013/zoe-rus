/**
 * Created by ianchen on 16/10/8.
 */

import React, {Component} from 'react'
import {ScrollView, View, StyleSheet, Platform} from 'react-native'

import {
    Text,
} from 'react-native-elements'

export default class Record extends Component {
    render() {
        const {toggleSideMenu} = this.props;
        return (
            <ScrollView style={{backgroundColor: 'white'}}>
                <View style={styles.hero}>
                    <Text>Record</Text>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15
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