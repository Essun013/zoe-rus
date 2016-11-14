/**
 * Created by linys on 16/10/20.
 */

import React, {Component} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';

/**
 * 已检查图标样式封装
 */
class PregnancyCheckedImage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.checkform}>
                <Image source={require('../img/check_form_right.png')} style={styles.checkformright} />
                <Text style={styles.checkedText}>已检</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    checkform: {
        flexDirection: 'row',
        marginRight: 15,
        width: 76,
        height: 30,
        alignSelf: 'flex-end',
        borderWidth: 1,
        borderColor: 'rgb(254,122,162)',
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkformright: {
        width: 18,
        height: 18,
    },
    checkedText: {
        fontSize: 13,
        marginLeft: 7,
        color:'rgb(254,122,162)',
        fontFamily: 'PingFang SC',
    }
});

module.exports = PregnancyCheckedImage;