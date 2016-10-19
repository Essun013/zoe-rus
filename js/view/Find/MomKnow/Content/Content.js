/**
 * Created by linys on 16/10/13.
 */

import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity, Alert} from 'react-native';
import device from '../../../../common/util/device';

class Content extends Component {

    constructor(props) {
        super(props);
        this.state = {initPage : 7, week : 8, date: 1};

    }

    render() {
        return (<View style={styles.container}>
            <View>
                <TouchableOpacity style={[styles.listItem,{marginTop: 0}]} onPress={()=>(console.log("1"))}>
                    <View style={{flexDirection: 'row'}}>
                        <Image source={require('../../img/momknow_01.png')} style={styles.momknowIcon}/>
                        <Text style={styles.listContentTitle}>本周概览</Text>
                    </View>
                    <View style={styles.listContentView}>
                        <Text style={styles.listContent}>      从怀孕到现在，你也许第一次有腹部疼痛的感觉，如
                            果还没检查过的准妈妈，这周一定要开始第一次产前检查。
                            另外，你可以根据个人的情况和一生的建议，选择是否建
                            卡。
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={styles.listItem} onPress={()=>(console.log("2"))}>
                    <View style={{flexDirection: 'row'}}>
                        <Image source={require('../../img/momknow_02.png')} style={styles.momknowIcon}/>
                        <Text style={styles.listContentTitle}>身体变化</Text>
                    </View>
                    <View style={styles.listContentView}>
                        <Text style={styles.listContent}>      一上午跑5次厕所。本周你可能不断往厕所跑，有时是
                            呕吐，有时是嘘嘘。这是很正常的事。你的子宫不断增大，
                            对膀胱造成一些挤压。你会发现，你不是在厕所，就是在
                            去厕所的路上。
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={styles.listItem} onPress={()=>(console.log("3"))}>
                    <View style={{flexDirection: 'row'}}>
                        <Image source={require('../../img/momknow_03.png')} style={styles.momknowIcon}/>
                        <Text style={styles.listContentTitle}>情绪变化</Text>
                    </View>
                    <View style={styles.listContentView}>
                        <Text style={styles.listContent}>      孕早期的反应给你带来很多不适，你会感到事事不顺
                            心，还爱动不动就闹脾气。找点开心的事吧。
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={styles.listItem} onPress={()=>(console.log("4"))}>
                    <View style={{flexDirection: 'row'}}>
                        <Image source={require('../../img/momknow_04.png')} style={styles.momknowIcon}/>
                        <Text style={styles.listContentTitle}>关爱提醒</Text>
                    </View>
                    <View style={styles.listContentView}>
                        <Text style={styles.listContent}>      现在胎宝宝还没有任何听觉和触觉，你不必现在就开
                            始进行胎教，但是可以收集一些有趣的胎教故事，准备一
                            些胎宝宝喜欢的音乐哦。
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
         </View>
        );
    }



}

const styles = StyleSheet.create({
    container: {
        width: device.width(),
        marginTop: -12
    },
    momknowIcon: {
        marginLeft:15,
        width: 25,
        height: 25,
    },
    babyImg: {
        width: 124,
        height: 180,
    },
    babyContent: {
        width: device.width()/4*3,
        paddingRight:15
    },
    listItem: {
        flex: 1,
        //flexDirection: 'row',
        paddingTop: 12,
        marginTop: 1,
        backgroundColor: '#fff',
    },
    listContentTitle: {
        color: 'rgb(255,122,162)',
        paddingLeft: 15,
        fontSize: 15,
        lineHeight: 20,
        fontFamily: 'PingFang SC',
    },
    listContentView: {
        //backgroundColor: 'blue',
        paddingTop: 7,
        paddingLeft: 15
    },
    listContent: {
        color: 'rgb(146,146,146)',
        marginBottom:20
    }

});

module.exports = Content;