/**
 * Created by linys on 16/10/13.
 */

import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity, Alert} from 'react-native';
import device from '../../../../common/util/device';

class Content extends Component {

    constructor(props) {
        super(props);
        //this.state = {initPage : 7, week : 8, date: 1};

    }

    render() {
        return (<View style={styles.container}>
            <View style={styles.listItem}>
                <View style={styles.checkCount}>
                    <Image source={require('../../img/checked.png')} style={styles.checkedImg} >
                        <Text style={styles.checkCountTextD}>第1次</Text>
                        <Text style={styles.checkCountTextC}>产检</Text>
                    </Image>
                </View>
                <View style={styles.checkContent}>
                    <View style={{flexDirection: 'row', height:30}}>
                        <View style={{flex:1, alignItems:'flex-start'}}><Text style={styles.dateText}>2016年09月04日</Text></View>
                        <View style={{flex:1, alignItems: 'flex-end'}}>
                            <Image source={require('../../img/checkform.png')} style={styles.checkform} >
                                <Image source={require('../../img/check_form_right.png')} style={styles.checkformright} />
                                <View style={{paddingTop:0.5}}><Text style={styles.checkedText}>已检</Text></View>
                            </Image>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', height:30}}>
                        <Text style={styles.pregnancyWeekText}>第一次产检  怀孕12周</Text>
                    </View>
                    <View style={{flexDirection: 'row', height:30}}>
                        <Text style={styles.pregnancyCheckText}>产检重点</Text>
                        <Text style={styles.pregnancyCheckTextContent}>建档，NT检查，空腹</Text>
                    </View>
                    <View style={{flexDirection: 'row', height:30}}>
                        <Text style={styles.pregnancyCheckText}>随身物品</Text>
                        <Text style={styles.pregnancyCheckTextContent}>结婚证，身份证，户口簿／临时居住证</Text>
                    </View>
                    <View style={{flexDirection: 'row', height:30}}>
                        <Text style={styles.pregnancyCheckText}>报告单</Text>
                        <Text style={styles.pregnancyCheckReport}>查看报告单（5份）</Text>
                    </View>
                </View>
            </View>

         </View>
        );
    }



}

const styles = StyleSheet.create({
    container: {
        width: device.width(),
    },
    listItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    checkCount: {
        flex:1.4,
        marginLeft: 8,
        marginTop:8,
        height: 100,
        //backgroundColor: 'blue',
    },
    checkCountTextD: {
        color: '#fff',
        fontSize: 13,
        paddingLeft:16,
        paddingTop:12,
        backgroundColor: 'transparent',
        fontFamily: 'PingFang SC'
    },
    checkCountTextC: {
        color: '#fff',
        fontSize: 13,
        paddingLeft:18,
        backgroundColor: 'transparent',
        fontFamily: 'PingFang SC'
    },
    checkedImg: {
        width: 60,
        height: 60,
    },
    checkContent: {
        marginTop: 20,
        //backgroundColor: 'blue',
        flex:6,
    },
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
        //backgroundColor: 'blue',
        paddingTop: 4,
        paddingLeft: 13,
        fontSize: 13,
        //lineHeight: 30,
        color:'rgb(254,122,162)',
        fontFamily: 'PingFang SC',
    },
    dateText: {
        paddingTop: 2,
        fontSize: 15,
        color:'rgb(254,122,162)',
        fontFamily: 'PingFang SC',
    },
    pregnancyWeekText: {
        //paddingTop: 2,
        fontSize: 15,
        color:'rgb(0,0,0)',
        fontFamily: 'PingFang SC',
    },
    pregnancyCheckText: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 10,
        fontSize: 12,
        color:'rgb(0,0,0)',
        fontFamily: 'PingFang SC',
        backgroundColor: 'rgb(245,245,245)',
    },
    pregnancyCheckTextContent: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 10,
        fontSize: 12,
        color:'rgb(146,146,146)',
        fontFamily: 'PingFang SC',
        //backgroundColor: 'rgb(245,245,245)',
    },
    pregnancyCheckReport: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 10,
        fontSize: 12,
        color:'rgb(0,203,221)',
        fontFamily: 'PingFang SC',
    }


});

module.exports = Content;