/**
 * Created by linys on 16/10/13.
 */

import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity, Alert} from 'react-native';
import device from '../../../../common/util/device';
import {navPush} from '../../../../components/Nav/Nav';
import PregnancyCheckDetail from '../PregnanyCheckDetail/PregnancyCheckDetail';
import PregnancyCheckedImage from '../PregnancyCheckedImage';

class Content extends Component {

    constructor(props) {
        super(props);
        this.toPregnancyCheckDetail = this.toPregnancyCheckDetail.bind(this);
    }

    toPregnancyCheckDetail(){
        navPush.push(this.props, PregnancyCheckDetail, '第一次产检小贴士');
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
                    <View style={styles.lineIn}>
                        <View style={{flex:1, alignItems:'flex-start'}}><Text style={styles.dateText}>2016年09月04日</Text></View>
                        <TouchableOpacity onPress={this.toPregnancyCheckDetail}>
                            <PregnancyCheckedImage/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.lineIn}>
                        <Text style={styles.pregnancyWeekText}>第一次产检  怀孕12周</Text>
                    </View>
                    <View style={styles.lineIn}>
                        <Text style={styles.pregnancyCheckText}>产检重点</Text>
                        <Text style={styles.pregnancyCheckTextContent}>建档，NT检查，空腹</Text>
                    </View>
                    <View style={styles.lineIn}>
                        <Text style={styles.pregnancyCheckText}>随身物品</Text>
                        <Text style={styles.pregnancyCheckTextContent}>结婚证，身份证，户口簿／临时居住证</Text>
                    </View>
                    <View style={styles.lineIn}>
                        <Text style={styles.pregnancyCheckText}>报告单</Text>
                        <TouchableOpacity>
                            <Text style={styles.pregnancyCheckReport}>查看报告单（5份）</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


            <View style={[styles.listItem,{marginTop:1}]}>
                <View style={styles.checkCount}>
                    <Image source={require('../../img/unchecked.png')} style={styles.checkedImg} >
                        <Text style={styles.checkCountTextD}>第2次</Text>
                        <Text style={styles.checkCountTextC}>产检</Text>
                    </Image>
                </View>
                <View style={styles.checkContent}>
                    <View style={styles.lineIn}>
                        <View style={{flex:1, alignItems:'flex-start', flexDirection:'row'}}>
                            <Text style={styles.dateText}>2016年10月02日</Text>
                            <TouchableOpacity>
                                <Image source={require('../../img/edit.png')} style={styles.editImg}></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:1, alignItems: 'flex-end'}}>
                            <Image source={require('../../img/uncheck_form.png')} style={styles.uncheckform} >
                                <View style={{paddingTop:1,paddingLeft:1}}><Text style={styles.uncheckedText}>未检</Text></View>
                            </Image>
                        </View>
                    </View>
                    <View style={styles.lineIn}>
                        <Text style={styles.pregnancyWeekText}>第二次产检  怀孕16周</Text>
                    </View>
                    <View style={styles.lineIn}>
                        <Text style={styles.pregnancyCheckText}>产检重点</Text>
                        <Text style={styles.pregnancyCheckTextContent}>唐筛，羊膜刺穿，空腹</Text>
                    </View>
                    <View style={styles.lineIn}>
                        <Text style={styles.pregnancyCheckText}>随身物品</Text>
                        <Text style={styles.pregnancyCheckTextContent}>产检手册，医保卡</Text>
                    </View>
                </View>
            </View>

            <View style={[styles.listItem,{marginTop:1}]}>
                <View style={styles.checkCount}>
                    <Image source={require('../../img/unchecked.png')} style={styles.checkedImg} >
                        <Text style={styles.checkCountTextD}>第3次</Text>
                        <Text style={styles.checkCountTextC}>产检</Text>
                    </Image>
                </View>
                <View style={styles.checkContent}>
                    <View style={styles.lineIn}>
                        <View style={{flex:1, alignItems:'flex-start', flexDirection:'row'}}>
                            <Text style={styles.dateText}>2016年10月31日</Text>
                            <TouchableOpacity>
                                <Image source={require('../../img/edit.png')} style={styles.editImg}></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:1, alignItems: 'flex-end'}}>
                            <Image source={require('../../img/uncheck_form.png')} style={styles.uncheckform} >
                                <View style={{paddingTop:1,paddingLeft:1}}><Text style={styles.uncheckedText}>未检</Text></View>
                            </Image>
                        </View>
                    </View>
                    <View style={styles.lineIn}>
                        <Text style={styles.pregnancyWeekText}>第三次产检  怀孕20周</Text>
                    </View>
                    <View style={styles.lineIn}>
                        <Text style={styles.pregnancyCheckText}>产检重点</Text>
                        <Text style={styles.pregnancyCheckTextContent}>大排畸，无需空腹</Text>
                    </View>
                    <View style={styles.lineIn}>
                        <Text style={styles.pregnancyCheckText}>随身物品</Text>
                        <Text style={styles.pregnancyCheckTextContent}>产检手册，B超预约单</Text>
                    </View>
                </View>
            </View>

            <View style={[styles.listItem,{marginTop:1}]}>
                <View style={styles.checkCount}>
                    <Image source={require('../../img/unchecked.png')} style={styles.checkedImg} >
                        <Text style={styles.checkCountTextD}>第4次</Text>
                        <Text style={styles.checkCountTextC}>产检</Text>
                    </Image>
                </View>
                <View style={styles.checkContent}>
                    <View style={styles.lineIn}>
                        <View style={{flex:1, alignItems:'flex-start', flexDirection:'row'}}>
                            <Text style={styles.dateText}>2016年11月28日</Text>
                            <TouchableOpacity>
                                <Image source={require('../../img/edit.png')} style={styles.editImg}></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:1, alignItems: 'flex-end'}}>
                            <Image source={require('../../img/uncheck_form.png')} style={styles.uncheckform} >
                                <View style={{paddingTop:1,paddingLeft:1}}><Text style={styles.uncheckedText}>未检</Text></View>
                            </Image>
                        </View>
                    </View>
                    <View style={styles.lineIn}>
                        <Text style={styles.pregnancyWeekText}>第四次产检  怀孕24周</Text>
                    </View>
                    <View style={styles.lineIn}>
                        <Text style={styles.pregnancyCheckText}>产检重点</Text>
                        <Text style={styles.pregnancyCheckTextContent}>唐筛，空腹</Text>
                    </View>
                    <View style={styles.lineIn}>
                        <Text style={styles.pregnancyCheckText}>随身物品</Text>
                        <Text style={styles.pregnancyCheckTextContent}>产检手册，葡萄糖冲剂，水杯</Text>
                    </View>
                </View>
            </View>

            <View style={[styles.listItem,{marginTop:1}]}>
                <View style={styles.checkCount}>
                    <Image source={require('../../img/unchecked.png')} style={styles.checkedImg} >
                        <Text style={styles.checkCountTextD}>第5次</Text>
                        <Text style={styles.checkCountTextC}>产检</Text>
                    </Image>
                </View>
                <View style={styles.checkContent}>
                    <View style={styles.lineIn}>
                        <View style={{flex:1, alignItems:'flex-start', flexDirection:'row'}}>
                            <Text style={styles.dateText}>2016年12月10日</Text>
                            <TouchableOpacity>
                                <Image source={require('../../img/edit.png')} style={styles.editImg}></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:1, alignItems: 'flex-end'}}>
                            <Image source={require('../../img/uncheck_form.png')} style={styles.uncheckform} >
                                <View style={{paddingTop:1,paddingLeft:1}}><Text style={styles.uncheckedText}>未检</Text></View>
                            </Image>
                        </View>
                    </View>
                    <View style={styles.lineIn}>
                        <Text style={styles.pregnancyWeekText}>第五次产检  怀孕28周</Text>
                    </View>
                    <View style={styles.lineIn}>
                        <Text style={styles.pregnancyCheckText}>产检重点</Text>
                        <Text style={styles.pregnancyCheckTextContent}>唐筛，空腹</Text>
                    </View>
                    <View style={styles.lineIn}>
                        <Text style={styles.pregnancyCheckText}>随身物品</Text>
                        <Text style={styles.pregnancyCheckTextContent}>产检手册，葡萄糖冲剂，水杯</Text>
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
        fontSize: 14,
        paddingLeft:13,
        paddingTop:12,
        backgroundColor: 'transparent',
        fontFamily: 'PingFang SC'
    },
    checkCountTextC: {
        color: '#fff',
        fontSize: 13,
        paddingLeft:17,
        backgroundColor: 'transparent',
        fontFamily: 'PingFang SC'
    },
    lineIn: {
        flexDirection: 'row',
        height:18,
        marginBottom:10,
    },
    checkedImg: {
        width: 60,
        height: 60,
    },
    checkContent: {
        marginTop: 18,
        flex:6,
    },
    checkform: {
        flexDirection: 'row',
        marginRight: 14,
        width: 76,
        height: 30,
    },
    uncheckform: {
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
    },
    uncheckedText: {
        //backgroundColor: 'blue',
        paddingTop: 4,
        paddingLeft: 23,
        fontSize: 13,
        //lineHeight: 30,
        color:'rgb(146,146,146)',
        fontFamily: 'PingFang SC',
    },
    dateText: {
        paddingTop: 2,
        fontSize: 15,
        color:'rgb(254,122,162)',
        fontFamily: 'PingFang SC',
    },
    editImg: {
        marginLeft: 18,
        marginTop: 7,
        width: 15,
        height: 15,
    },
    pregnancyWeekText: {
        //paddingTop: 2,
        fontSize: 15,
        color:'rgb(0,0,0)',
        fontFamily: 'PingFang SC',
    },
    pregnancyCheckText: {
        //paddingTop: 5,
        //paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 10,
        fontSize: 12,
        color:'rgb(0,0,0)',
        fontFamily: 'PingFang SC',
        //lineHeight:10,
        backgroundColor: 'rgb(245,245,245)',
    },
    pregnancyCheckTextContent: {
        //paddingTop: 5,
        //paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 10,
        fontSize: 12,
        color:'rgb(146,146,146)',
        fontFamily: 'PingFang SC',
        //backgroundColor: 'rgb(245,245,245)',
    },
    pregnancyCheckReport: {
        //paddingTop: 5,
        //paddingBottom: 5,
        paddingLeft: 17,
        //paddingRight: 20,
        fontSize: 12,
        color:'rgb(0,203,221)',
        fontFamily: 'PingFang SC',
    }


});

module.exports = Content;