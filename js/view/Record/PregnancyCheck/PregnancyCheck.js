/**
 * Created by linys on 16/10/13.
 */

import React, {Component, PropTypes} from 'react';
import {View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
    Alert} from 'react-native';
import Top from './Top/Top';
import {navPush} from '../../../components/Nav/Nav';
import {device, http, app, converter} from '../../../common/util';
import PregnancyCheckDetail from './PregnancyCheckDetail';
import PregnancyCheckedImage from './PregnancyCheckedImage';

class PregnancyCheck extends Component {

    // 默认属性
    static defaultProps = {
    }

    // 属性类型
    static propTypes = {
    }

    constructor(props) {
        super(props);
        this.state = {
            pregnancyWeek: 15, //怀孕周数
            pgChkInfoList: [{
                pgWeek: 12,
                pgChkImportant: '建档，NT检查，空腹',
                pgChkThings: '结婚证，身份证，户口簿／临时居住证',
                pgChkDate: '20160904',
                pgChecked: true,
                pgChkReportCount: 5,
            },{
                pgWeek: 16,
                pgChkImportant: '唐筛，羊膜刺穿，空腹',
                pgChkThings: '产检手册，医保卡',
                pgChkDate: '20161002',
                pgChecked: false,
                pgChkReportCount: 0,
            },{
                pgWeek: 20,
                pgChkImportant: '大排畸，无需空腹',
                pgChkThings: '产检手册，B超预约单',
                pgChkDate: '20161031',
                pgChecked: false,
                pgChkReportCount: 0,
            }
            ,{
                pgWeek: 24,
                pgChkImportant: '唐筛，空腹',
                pgChkThings: '产检手册，葡萄糖冲剂，水杯',
                pgChkDate: '20161128',
                pgChecked: false,
                pgChkReportCount: 0,
            }
            ,{
                pgWeek: 26,
                pgChkImportant: '唐筛，空腹',
                pgChkThings: '产检手册，葡萄糖冲剂，水杯',
                pgChkDate: '20161210',
                pgChecked: false,
                pgChkReportCount: 0,
            }],
        }


        //绑定事件
        this.toPregnancyCheckDetail = this.toPregnancyCheckDetail.bind(this);

    }

    componentWillMount(){
        console.log('componentWillMount!');
    }

    componentDidMount(){
        console.log('componentDidMount!');
    }

    //跳转具体产检信息
    toPregnancyCheckDetail() {
        navPush.push(this.props, PregnancyCheckDetail, '第一次产检小贴士');
    }

    //渲染报告单份数如果有的话，，，
    _renderReportCount(reportCount){
        return <View style={styles.lineIn}>
            <Text style={styles.pregnancyCheckText}>报告单</Text>
            <TouchableOpacity>
                <Text style={styles.pregnancyCheckReport}>查看报告单（{reportCount}份）</Text>
            </TouchableOpacity>
        </View>
    }

    //渲染产检内容
    _renderPgChkInfoList(){

        return this.state.pgChkInfoList.map((val, index)=>{
            let times = index + 1;
            let pgChkDate = val.pgChkDate;

            if(val.pgChecked){
                return (
                    <View style={styles.listItem} key={index}>
                        <View style={styles.checkCount}>
                            <Image source={require('../img/checked.png')} style={styles.checkedImg}>
                                <Text style={styles.checkCountTextD}>第{times}次</Text>
                                <Text style={styles.checkCountTextC}>产检</Text>
                            </Image>
                        </View>
                        <View style={styles.checkContent}>
                            <View style={[styles.lineIn]}>
                                <View style={{flex: 1, alignItems: 'flex-start'}}>
                                    <Text style={styles.dateText}>{converter.formatDataTimeStr(pgChkDate,'yyyy年MM月dd日')}</Text></View>
                                <TouchableOpacity onPress={this.toPregnancyCheckDetail}>
                                    <PregnancyCheckedImage/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.lineIn}>
                                <Text style={styles.pregnancyWeekText}>第{converter.number2Word(times+50)}次产检 怀孕{val.pgWeek}周</Text>
                            </View>
                            <View style={styles.lineIn}>
                                <Text style={styles.pregnancyCheckText}>产检重点</Text>
                                <Text style={styles.pregnancyCheckTextContent}>{val.pgChkImportant}</Text>
                            </View>
                            <View style={styles.lineIn}>
                                <Text style={styles.pregnancyCheckText}>随身物品</Text>
                                <Text style={styles.pregnancyCheckTextContent}>{val.pgChkThings}</Text>
                            </View>
                            {val.pgChkReportCount > 0? this._renderReportCount(val.pgChkReportCount): null}
                        </View>
                    </View>
                );
            } else {
                return (
                    <View style={styles.listItem} key={index}>
                        <View style={styles.checkCount}>
                            <Image source={require('../img/unchecked.png')} style={styles.checkedImg}>
                                <Text style={styles.checkCountTextD}>第{times}次</Text>
                                <Text style={styles.checkCountTextC}>产检</Text>
                            </Image>
                        </View>
                        <View style={styles.checkContent}>
                            <View style={styles.lineIn}>
                                <TouchableOpacity style={{flex: 1, alignItems: 'flex-start', flexDirection: 'row'}}>
                                    <Text style={styles.dateText}>{converter.formatDataTimeStr(pgChkDate,'yyyy年MM月dd日')}</Text>
                                    <Image source={require('../img/edit.png')} style={styles.editImg}></Image>
                                </TouchableOpacity>
                                <View style={styles.uncheckBottom}>
                                    <Text style={styles.uncheckedText}>未检</Text>
                                </View>
                            </View>
                            <View style={styles.lineIn}>
                                <Text style={styles.pregnancyWeekText}>第{converter.number2Word(times+100)}次产检 怀孕{val.pgWeek}周</Text>
                            </View>
                            <View style={styles.lineIn}>
                                <Text style={styles.pregnancyCheckText}>产检重点</Text>
                                <Text style={styles.pregnancyCheckTextContent}>{val.pgChkImportant}</Text>
                            </View>
                            <View style={styles.lineIn}>
                                <Text style={styles.pregnancyCheckText}>随身物品</Text>
                                <Text style={styles.pregnancyCheckTextContent}>{val.pgChkThings}</Text>
                            </View>
                        </View>
                    </View>
                );
            }



        });

    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
                <Top {...this.props}/>
                <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                    {this._renderPgChkInfoList()}
                </ScrollView>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        width: device.width(),
        backgroundColor: '#f5f5f5',
    },

    listItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginTop:1,
    },
    checkCount: {
        flex: 1.4,
        marginLeft: 8,
        marginTop: 8,
        height: 100,
        //backgroundColor: 'blue',
    },
    checkCountTextD: {
        color: '#fff',
        fontSize: 14,
        paddingLeft: 13,
        paddingTop: 12,
        backgroundColor: 'transparent',
        fontFamily: 'PingFang SC'
    },
    checkCountTextC: {
        color: '#fff',
        fontSize: 13,
        paddingLeft: 17,
        backgroundColor: 'transparent',
        fontFamily: 'PingFang SC'
    },
    lineIn: {
        flexDirection: 'row',
        // height:18,
        marginBottom: 10,
    },
    checkedImg: {
        width: 60,
        height: 60,
    },
    checkContent: {
        marginTop: 18,
        flex: 6,
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
        color: 'rgb(254,122,162)',
        fontFamily: 'PingFang SC',
    },
    uncheckedText: {
        fontSize: 13,
        color: 'rgb(146,146,146)',
        fontFamily: 'PingFang SC',
    },
    dateText: {
        paddingTop: 2,
        fontSize: 15,
        color: 'rgb(254,122,162)',
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
        color: 'rgb(0,0,0)',
        fontFamily: 'PingFang SC',
    },
    pregnancyCheckText: {
        paddingLeft: 5,
        paddingRight: 10,
        fontSize: 12,
        color: 'rgb(0,0,0)',
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
        color: 'rgb(146,146,146)',
        fontFamily: 'PingFang SC',
        //backgroundColor: 'rgb(245,245,245)',
    },
    pregnancyCheckReport: {
        //paddingTop: 5,
        //paddingBottom: 5,
        paddingLeft: 17,
        //paddingRight: 20,
        fontSize: 12,
        color: 'rgb(0,203,221)',
        fontFamily: 'PingFang SC',
    },
    checkBottom: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    uncheckBottom: {
        alignSelf: 'flex-end',
        marginRight: 14,
        width: 76,
        height: 30,
        borderWidth: 1,
        borderColor: 'rgb(210,210,210)',
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center'
    }


})

const {connect} = require('react-redux');

module.exports = connect()(PregnancyCheck);