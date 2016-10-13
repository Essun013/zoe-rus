/**
 * Created by ianchen on 16/10/12.
 */

import React, {Component} from 'react';
import {View, StyleSheet, Platform, Image, Text, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import device from '../../../common/util/device';

export default class Mom extends Component {
    render() {
        return (
            <Image source={require('../img/bg.png')} resizeMode='stretch' style={styles.bg}>
                <View style={styles.bgView}>
                    <View style={{alignItems: 'center', marginTop: 29, marginBottom: 32}}>
                        <Image source={require('../img/mom.png')} style={{width: 122, height: 122}}/>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: 'rgba(255,147,200, 0.56)',
                        padding: 14,
                        borderRadius: 3
                    }}>
                        {/*<Text style={{color: 'rgba(255,147,200, 0.56)', position: 'absolute', top: -5, zIndex: -1}}>◆</Text>*/}
                        <View style={{flex: 1}}>
                            <Text style={{color: 'rgb(255,255,255)', fontSize: 16}}>预产期</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <TextInput placeholder={'预产期是哪一天呢'} placeholderTextColor={'#ffec93'} style={{height: 16, borderWidth: 1, fontSize: 16, width: 180, alignSelf: 'flex-end'}}/>
                        </View>
                    </View>
                </View>
                <View>
                    <View style={styles.bottomBg}>
                        <View>
                            <TouchableOpacity style={styles.bottomBt}>
                                <Text style={styles.bottomBtTx}>立即体验</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.fastLoginView}>
                            <Text style={styles.fastLoginTx}>已有账号快速登录</Text>
                        </View>
                    </View>
                    <Image source={require('../img/bottom_bg.png')} style={styles.bottomImg}
                           resizeMode='stretch'/>
                </View>
            </Image>
        )
    }
}

const styles = StyleSheet.create({
    bg: {
        height: device.height() - 62,
        width: device.width(),
    },
    bgView: {
        flex: 1,
        paddingLeft: 14,
        paddingRight: 14
    },
    bottomBg: {
        flex: 1,
        position: 'absolute',
        bottom: 37,
        left: 14,
        right: 14,
        zIndex: 1
    },
    bottomBt: {
        borderWidth: 1,
        borderColor: 'rgb(255,255,255)',
        borderRadius: 30,
        alignItems: 'center'
    },
    bottomBtTx: {
        fontSize: 15,
        lineHeight: 32,
        color: 'rgb(255,255,255)'
    },
    fastLoginView: {
        alignSelf: 'flex-end',
        marginTop: 14,
        marginRight: 10
    },
    fastLoginTx: {
        fontSize: 13,
        color: 'rgb(255,255,255)'
    },
    bottomImg: {
        width: device.width(),
        height: 58
    }
})