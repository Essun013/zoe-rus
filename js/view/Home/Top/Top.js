/**
 * Created by ianchen on 16/10/9.
 */

import React, {Component} from 'react';
import {ScrollView, View, StyleSheet, Platform, Image, Text} from 'react-native';
import device from '../../../common/util/device';

class Top extends Component {
    render() {
        return <View style={[styles.center, styles.baby, {flex: 1}]}>
            <Image source={require('../img/background.png')} style={{height: 110}} resizeMode='stretch'>
                <View style={[styles.center]}>
                    <Text>8周+1天</Text>
                    <Image source={require('../img/baby.png')} style={{width: 80, height: 80}} resizeMode='stretch'/>
                </View>
            </Image>
            <Image source={require('../img/change.png')} style={{height: 110, width: device.width()}} resizeMode='stretch'>
                <View style={[styles.center]}>
                    <Text>再过233天，我就出生啦</Text>
                    <Text>顶臂长：2.3mm ｜ 体 重：3.3kg</Text>
                </View>
            </Image>
        </View>
    }
}

const styles = StyleSheet.create({
    center: {
        alignItems: 'center',
    },
    baby: {
        marginTop: 62,
    }
});

module.exports = Top;