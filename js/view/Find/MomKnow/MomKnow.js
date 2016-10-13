/**
 * Created by linys on 16/10/13.
 */

import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity, Alert} from 'react-native';
import device from '../../../common/util/device';

class MomKnow extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return <View>
            <TouchableOpacity style={styles.listItem}>
                <View style={[styles.listView]}>
                    <Text style={styles.listTitle}>MomKnow</Text>
                </View>
            </TouchableOpacity>
        </View>;

    }
}

const styles = StyleSheet.create({
    img: {
        width: 46,
        height: 46,
    },
    listItem: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 15,
        paddingTop: 18,
        width: device.width(),
        backgroundColor: '#fff',
    },
    listView: {
        flex: 1,
        marginLeft: 14,
        marginRight: 14,
        marginBottom: 14,
    },
    listTitle: {
        color: 'rgb(255,122,162)',
        fontSize: 15,
        lineHeight: 20,
        fontFamily: 'PingFang SC',
    }
});

module.exports = MomKnow;