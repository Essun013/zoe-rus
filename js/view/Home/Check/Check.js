/**
 * Created by ianchen on 16/10/10.
 */

import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import device from '../../../common/util/device';

class Check extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <View style={styles.container}>
            <View style={styles.title}>
                <View>
                    <Text style={[styles.titleText, {color: 'rgb(255,122,162)', fontSize: 15}]}>产检小助手</Text>
                </View>
            </View>
            <View style={styles.body}>
                <Image source={require('../img/time_ring.png')} style={styles.timeRing}/>
                <View style={styles.bodySubView}>
                    <View style={{borderBottomWidth: 1, borderBottomColor: '#ededed'}}>
                        <Text style={styles.aides}>下次产检：2016\9\26</Text>
                        <Text style={styles.aides}>产检重点：建档、NT检查、空腹</Text>
                        <Text style={styles.aides}>随身物品：产检手册、身份证、......</Text>
                        <Text style={styles.aides}>产检医院：思明区妇幼保健院<Image source={require('../img/location.png')} style={{width: 15, height: 15}}/>怎么去</Text>
                        <TouchableOpacity style={{alignItems: 'center', borderWidth: 1, borderColor: '#ff7aa2', borderRadius: 30, marginTop: 16, marginBottom: 18}}>
                            <Text style={{lineHeight: 30, padding: 2, color: 'rgb(255,122,162)'}}>参加宣教课程</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{}}>

                    </View>
                </View>
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        width: device.width()
    },
    title: {
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    titleText: {
        fontSize: 13,
        fontFamily: 'PingFang SC',
        lineHeight: 20,
    },
    body: {
        flex: 1,
        marginTop: 1,
        backgroundColor: '#fff',
        zIndex: 1
    },
    bodySubView: {
        borderLeftWidth: 2,
        borderLeftColor: '#ffe9ef',
        marginLeft: 20,
        position: 'relative',
        zIndex: 1,
        paddingLeft: 15,
        paddingTop: 5,
        paddingRight: 15,
    },
    buttonView: {
        marginTop: 15,
        marginBottom: 15,
        width: device.width() / 4
    },
    buttonImgSize: {
        width: 46,
        height: 46,
        marginBottom: 14
    },
    buttonTextCenter: {
        alignItems: 'center'
    },
    timeRing: {
        width: 12,
        height: 12,
        position: 'absolute',
        left: 15,
        top: 16,
        zIndex: 2
    },
    aides: {
        fontSize: 14,
        fontFamily: 'PingFang SC',
        lineHeight: 30,
        color: 'rgb(0,0,0)'
    }
});

module.exports = Check;