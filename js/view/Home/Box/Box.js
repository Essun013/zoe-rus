/**
 * Created by ianchen on 16/10/10.
 */

import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, ListView, TouchableOpacity, ScrollView} from 'react-native';
import device from '../../../common/util/device';

class Box extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <View style={styles.container}>
            <View style={styles.title}>
                <View>
                    <Text style={[styles.titleText, {color: 'rgb(255,122,162)'}]}>百宝箱</Text>
                </View>
                <View style={styles.titleBotton}>
                    <TouchableOpacity>
                        <Text style={[styles.titleText, {color: 'rgb(146,146,146)'}]}>添加</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.body}>
                <ScrollView horizontal={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.buttonTextCenter}>
                            <Image source={require('../img/yinshi.png')} style={styles.buttonImgSize}/>
                            <Text style={[styles.titleText]}>孕妈饮食</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.buttonTextCenter}>
                            <Image source={require('../img/taijiao.png')} style={styles.buttonImgSize}/>
                            <Text style={[styles.titleText]}>每日胎教</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.buttonTextCenter}>
                            <Image source={require('../img/tizhongji.png')} style={styles.buttonImgSize}/>
                            <Text style={[styles.titleText]}>体重计</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.buttonTextCenter}>
                            <Image source={require('../img/taidong.png')} style={styles.buttonImgSize}/>
                            <Text style={[styles.titleText]}>数胎动</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.buttonTextCenter}>
                            <Image source={require('../img/taidong.png')} style={styles.buttonImgSize}/>
                            <Text style={[styles.titleText]}>数胎动</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.buttonTextCenter}>
                            <Image source={require('../img/taidong.png')} style={styles.buttonImgSize}/>
                            <Text style={[styles.titleText]}>数胎动</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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
    titleBotton: {
        position: 'absolute',
        right: 15,
    },
    body: {
        flex: 1,
        marginTop: 1,
        backgroundColor: '#fff',
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
    }
});

module.exports = Box;