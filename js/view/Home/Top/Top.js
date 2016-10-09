/**
 * Created by ianchen on 16/10/9.
 */

import React, {Component} from 'react';
import {ScrollView, View, StyleSheet, Platform, Image, Text} from 'react-native';
import device from '../../../common/util/device';

class Top extends Component {
    render() {
        return <View style={[styles.center, styles.baby]}>
            <Image source={require('../img/background.png')} style={styles.bgImg}
                   resizeMode='stretch'>
                <View style={[styles.center]}>
                    <Text style={styles.bgText}>8周+1天</Text>
                    <Image source={require('../img/baby.png')} style={styles.babyImg}/>
                </View>
                <Image source={require('../img/change.png')} style={styles.change} resizeMode='stretch'>
                    <View style={[styles.center, {marginTop: 14}]}>
                        <Text style={styles.changeText}>再过<Text style={{fontSize: 20}}>233</Text>天，我就出生啦</Text>
                        <Text style={styles.changeText}>顶臂长：2.3mm | 体 重：3.3kg</Text>
                    </View>
                </Image>
            </Image>
        </View>
    }
}

const styles = StyleSheet.create({
    center: {
        alignItems: 'center',
    },
    baby: {
        flex: 1,
        marginTop: 62,
    },
    babyImg: {
        width: 100,
        height: 100
    },
    bgImg: {
        height: 220,
        width: device.width()
    },
    bgText: {
        color: '#fff',
        fontSize: 17,
        marginBottom: 15
    },
    change: {
        height: 85,
        width: device.width(),
        position: 'absolute',
        bottom: 0
    },
    changeText: {
        color: '#fff',
        fontSize: 17
    }
});

module.exports = Top;