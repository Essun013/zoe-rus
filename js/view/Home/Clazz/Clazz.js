/**
 * Created by ianchen on 16/10/10.
 */

import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity, ScrollView} from 'react-native';
import device from '../../../common/util/device';

class Clazz extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <View style={styles.container}>
            <View style={styles.title}>
                <View>
                    <Text style={[styles.titleText, {color: 'rgb(255,122,162)', fontSize: 15}]}>妈妈课堂</Text>
                </View>
            </View>
            <View style={styles.body}>
                <View>
                    <View style={styles.listView}>
                        <Image source={require('../img/ketang1.png')} style={styles.listViewImg}/>
                        <View style={{marginRight: 0, flex: 1}}>
                            <Text style={styles.listViewContentTitle}>吃什么对胎儿头发好？</Text>
                            <Text style={styles.listViewContent} ellipsizeMode='tail'>想要宝贝以后头发长得好，准妈妈们从孕期就需要补充营养，比如维生素......</Text>
                        </View>
                    </View>
                    <View style={[styles.msgOverView, styles.msgOver]}>
                        <View style={styles.msgOver}>
                            <View style={styles.msgOverImgView}>
                                <Image source={require('../img/over.png')} style={styles.msgOverImg}
                                       resizeMode='stretch'/>
                            </View>
                            <Text style={styles.msgOverText}>56</Text>
                        </View>
                        <View style={[styles.msgOver, {marginLeft: 20}]}>
                            <View style={styles.msgOverImgView}>
                                <Image source={require('../img/collection.png')} style={styles.msgOverImg}
                                       resizeMode='stretch'/>
                            </View>
                            <Text style={styles.msgOverText}>56</Text>
                        </View>
                    </View>
                </View>
                <View style={{borderTopWidth: 1, borderTopColor: '#ededed'}}>
                    <View style={styles.listView}>
                        <Image source={require('../img/ketang2.png')} style={styles.listViewImg}/>
                        <View style={{marginRight: 0, flex: 1}}>
                            <Text style={styles.listViewContentTitle}>吃什么对胎儿头发好？</Text>
                            <Text style={styles.listViewContent} ellipsizeMode='tail'>想要宝贝以后头发长得好，准妈妈们从孕期就需要补充营养，比如维生素......</Text>
                        </View>
                    </View>
                    <View style={[styles.msgOverView, styles.msgOver]}>
                        <View style={styles.msgOver}>
                            <View style={styles.msgOverImgView}>
                                <Image source={require('../img/over.png')} style={styles.msgOverImg}
                                       resizeMode='stretch'/>
                            </View>
                            <Text style={styles.msgOverText}>56</Text>
                        </View>
                        <View style={[styles.msgOver, {marginLeft: 20}]}>
                            <View style={styles.msgOverImgView}>
                                <Image source={require('../img/collection.png')} style={styles.msgOverImg}
                                       resizeMode='stretch'/>
                            </View>
                            <Text style={styles.msgOverText}>56</Text>
                        </View>
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
        width: device.width()
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
    listView: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 6
    },
    listViewImg: {
        width: 90,
        height: 60,
        marginRight: 15
    },
    listViewContentTitle: {
        marginBottom: 15,
        fontSize: 15,
        fontFamily: 'PingFang SC',
        marginTop: -2,
        color: 'rgb(0,0,0)'
    },
    listViewContent: {
        fontSize: 13,
        color: 'rgb(146,146,146)',
        lineHeight: 20
    },
    msgOverView: {
        alignSelf: 'flex-end',
        marginRight: 30,
        marginBottom: 10
    },
    msgOver: {
        flexDirection: 'row',
    },
    msgOverText: {
        marginLeft: 5,
        fontSize: 11,
        fontFamily: 'PingFang SC',
        color: 'rgb(204,204,204)'
    },
    msgOverImg: {
        width: 10,
        height: 8,
    },
    msgOverImgView: {
        justifyContent: 'center'
    }
});

module.exports = Clazz;