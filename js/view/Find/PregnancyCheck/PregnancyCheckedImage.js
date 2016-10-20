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
            <View style={{flex:1, alignItems: 'flex-end'}}>
                <Image source={require('../img/checkform.png')} style={styles.checkform} >
                    <Image source={require('../img/check_form_right.png')} style={styles.checkformright} />
                    <View style={{paddingTop:1}}><Text style={styles.checkedText}>已检</Text></View>
                </Image>
            </View>
        );
    }



}

const styles = StyleSheet.create({
    checkform: {
        flexDirection: 'row',
        marginRight: 14,
        width: 76,
        height: 30,
    },
    checkformright: {
        marginTop: 7,
        marginLeft: 8,
        width: 15,
        height: 15,
    },
    checkedText: {
        paddingTop: 4,
        paddingLeft: 13,
        fontSize: 13,
        //lineHeight: 30,
        color:'rgb(254,122,162)',
        fontFamily: 'PingFang SC',
    }
});

module.exports = PregnancyCheckedImage;