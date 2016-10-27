/**
 * Created by ianchen on 16/10/8.
 */

import React, {Component} from 'react'
import {ScrollView, View, StyleSheet, Platform} from 'react-native'
import PregnancyCheck from '../Find/PregnancyCheck/PregnancyCheck'

import {
    Text,
} from 'react-native-elements'

export default class Record extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <PregnancyCheck navigator={this.props.navigator}/>
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