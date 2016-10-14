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
                <TouchableOpacity style={[styles.listItem,{marginTop: 0}]} onPress={()=>(Alert.alert("hello", "点了我'{this.state.week}'8周"))}>
                    <View style={styles.weekContent}>
                        <Image source={require('../../img/babygrow_cal_sel.png')} style={styles.weekSelImg}>
                            <Text style={styles.bgWeekText}>{this.state.week}周</Text>
                        </Image>
                        <Text style={styles.dateText}>09月19日</Text>
                    </View>
                    <View style={styles.babyContent}>
                        <Image source={require('../../img/babygrow_01.png')} style={styles.babyImg}/>
                        <Text style={styles.contentText}>
                            我的胳膊和手掌会比脚和脚趾长得快一点。我的小尾巴马上就要消失了，所有的神经系统开始变得分明。
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={styles.listItem} onPress={()=>(Alert.alert("hello", "点了我'{this.state.week}'9周"))}>
                    <View style={styles.weekContent}>
                        <Image source={require('../../img/babygrow_cal_unsel.png')} style={styles.weekunSelImg}>
                            <View><Text style={styles.bgWeekText}>{this.state.week}周</Text></View>
                            <View><Text style={styles.bgDateText}>+{this.state.date}天</Text></View>
                        </Image>
                        <Text style={styles.dateText}>09月20日</Text>
                    </View>
                    <View style={styles.babyContent}>
                        <Text style={styles.contentText}>
                            我的胳膊和手掌会比脚和脚趾长得快一点。我的小尾巴马上就要消失了，所有的神经系统开始变得分明。
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={styles.listItem} onPress={()=>(Alert.alert("hello", "点了我'{this.state.week}'10周"))}>
                    <View style={styles.weekContent}>
                        <Image source={require('../../img/babygrow_cal_unsel.png')} style={styles.weekunSelImg}>
                            <View><Text style={styles.bgWeekText}>{this.state.week}周</Text></View>
                            <View><Text style={styles.bgDateText}>+{this.state.date+1}天</Text></View>
                        </Image>
                        <Text style={styles.dateText}>09月21日</Text>
                    </View>
                    <View style={styles.babyContent}>
                        <Text style={styles.contentText}>
                            我的胳膊和手掌会比脚和脚趾长得快一点。我的小尾巴马上就要消失了，所有的神经系统开始变得分明。
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
    weekSelImg: {
        width: 68,
        height: 68,
    },
    weekunSelImg: {
        width: 68,
        height: 68,
    },
    babyImg: {
        //marginLeft: 20,
        width: 124,
        height: 180,
    },
    weekContent: {
        width: device.width()/4,
        paddingLeft:15
    },
    babyContent: {
        width: device.width()/4*3,
        paddingRight:15
    },
    listItem: {
        flex: 1,
        flexDirection: 'row',
        //paddingLeft: 15,
        paddingTop: 12,
        marginTop: 1,
        //width: device.width(),
        backgroundColor: '#fff',
    },
    bgWeekText: {
        color: '#fff',
        fontSize: 22,
        paddingLeft:17,
        paddingTop:15,
        backgroundColor: 'transparent',
        fontFamily: 'PingFang SC'
    },
    bgDateText: {
        color: '#fff',
        fontSize: 14,
        paddingLeft:18,
        paddingTop:-3,
        backgroundColor: 'transparent',
        fontFamily: 'PingFang SC'
    },
    dateText: {
        color: 'rgb(146,146,146)',
        paddingTop:5,
        paddingLeft:4,
        marginBottom:15,
    },
    contentText: {
        //marginLeft: 15,
        color: 'rgb(146,146,146)',
        paddingTop:12,
        marginBottom:20
    }

});

module.exports = Content;