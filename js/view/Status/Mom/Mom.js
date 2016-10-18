/**
 * Created by ianchen on 16/10/12.
 */

import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity,TouchableHighlight, TextInput,Alert} from 'react-native';
import device from '../../../common/util/device';
import Login from '../../Me/LoginSys';
import {navPush} from '../../../components/Nav/Nav';
import DatePicker from '../../../components/DatePicker'
import {goHome} from '../../../actions/home/actions';
import DeviceInfo from 'react-native-device-info';
import apiHttp from '../../../common/util/http';
import {rcache,synccache} from '../../../common/util';
class Mom extends Component {
    constructor(props) {
        super(props);
        this.state={
            childbirth: null,
            lmp:null
        };
        this.pushMain = this.pushMain.bind(this);
        this.pushLogin = this.pushLogin.bind(this);
    }
    pushMain() {
        if(!this.state.childbirth && !this.state.lmp){
            Alert.alert("系统提示", '请选择预产期日期或末次月经日期');
        }
        let params = {
            username: DeviceInfo.getUniqueID(),
            gender:2
        }
        apiHttp.apiPost('/uc/user/macid', params, (data)=>  {
                if (data.code == 0) {
                    rcache.put("user",data.data);
                    this.createTimeLine();
                } else {
                    if(data.code==4121){
                        this.createTimeLine();
                    }else{
                    Alert.alert("系统提示", data.message);
                    }
                }

            }, (err)=> {
                Alert.alert("系统提示", err);
            }
        )
    }
    createTimeLine(){
        let  params = {
            childbirth: this.state.childbirth,
            lmp:this.state.lmp
        }
        apiHttp.apiPost('/uc/timeline/create',params,(data)=> {
            if(data.code==0){
                this.props.dispatch(goHome(true));
            }
            else if(data.code==4202){
                let  params = {
                    username: DeviceInfo.getUniqueID(),
                    password:1
                }
                apiHttp.apiPost('/uc/user/sign-in', params, (data)=>  {
                    this.createTimeLine();
                })
            }else{
                Alert.alert("系统提示",JSON.parse(data));
            }
        })
    }
    pushLogin() {
        navPush.push(this.props, Login, '登录');
    }

    render() {
        return (
            <Image source={require('../img/bg.png')} resizeMode='stretch' style={styles.bg}>
                <View style={styles.bgView}>
                    <View style={{alignItems: 'center', marginTop: 29, marginBottom: 32}}>
                        <Image source={require('../img/mom.png')} style={{width: 122, height: 122}}/>
                    </View>
                    <View style={styles.inputBg}>
                        <View style={styles.flex}>
                            <Text style={styles.inputTitle}>预产期</Text>
                        </View>
                        <View style={styles.flex}>
                            <DatePicker
                                style={styles.datePicker}
                                date={this.state.childbirth}
                                mode="date"
                                placeholder="预产期是哪一天呢"
                                format="YYYY-MM-DD"
                                minDate="2016-05-01"
                                maxDate="2017-06-01"
                                confirmBtnText="确定"
                                cancelBtnText="取消"
                                customStyles={{
                                    dateText: {
                                        fontSize: 16,
                                        textAlign: 'right',
                                        color: '#ffec93',
                                        borderWidth: 0,
                                        marginBottom:18,
                                        alignSelf: 'flex-end',
                                        //height: 16
                                    },
                                    placeholderText:{
                                        fontSize: 16,
                                        textAlign: 'right',
                                        color: '#ffec93',
                                        borderWidth: 0,
                                        marginBottom:18,
                                        alignSelf: 'flex-end',
                                        /*height: 16*/
                                    },
                                    dateInputView:{
                                        borderWidth: 0,
                                    },
                                    datePicker:{
                                        marginTop: 1,
                                    }
                                }}
                                showIcon={false}
                                onDateChange={(date) => {this.setState({childbirth: date})}}
                            />
                            {/*<TextInput placeholder={'预产期是哪一天呢'}*/}
                                       {/*placeholderTextColor={'#ffec93'}*/}
                                       {/*value={this.state.childbirth==null?'':this.state.childbirth.toDateString()}*/}
                                       {/*style={styles.input}*/}
                                       {/*underlineColorAndroid={'rgba(255,255,255,0)'}/>*/}
                        </View>
                    </View>
                    <View>
                        <View style={styles.cacleView}>
                            <Image source={require('../img/cacle.png')} style={styles.cacleImg}/>
                            <Text style={styles.cacleTx}>预产期计算器</Text>
                        </View>
                        <View style={[styles.inputBg, {
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0,
                            borderTopLeftRadius: 2,
                            borderTopRightRadius: 2
                        }]}>
                            <View style={styles.flex}>
                                <Text style={styles.inputTitle}>最后一次经期开始日</Text>
                            </View>
                            <View style={styles.flex}>
                                <DatePicker
                                    style={styles.datePicker}
                                    date={this.state.lmp}
                                    mode="date"
                                    placeholder="0000-00-00"
                                    format="YYYY-MM-DD"
                                    minDate="2016-05-01"
                                    maxDate="2017-06-01"
                                    confirmBtnText="确定"
                                    cancelBtnText="取消"
                                    customStyles={{
                                        dateText: {
                                            fontSize: 16,
                                            textAlign: 'right',
                                            color: '#ffec93',
                                            borderWidth: 0,
                                            marginBottom:18,
                                            alignSelf: 'flex-end',
                                            //height: 16
                                        },
                                        placeholderText:{
                                            fontSize: 16,
                                            textAlign: 'right',
                                            color: '#ffec93',
                                            borderWidth: 0,
                                            marginBottom:18,
                                            alignSelf: 'flex-end',
                                            /*height: 16*/
                                        },
                                        dateInputView:{
                                            borderWidth: 0,
                                        },
                                        datePicker:{
                                            marginTop: 1,
                                        }
                                    }}
                                    showIcon={false}
                                    onDateChange={(date) => {this.setState({lmp: date})}}
                                />
                                {/*<TextInput placeholder={'0000-00-00'} placeholderTextColor={'#ffec93'}*/}
                                           {/*style={styles.input}/>*/}
                            </View>
                        </View>
                        {/*<View style={[styles.inputBg, {*/}
                            {/*marginTop: 1,*/}
                            {/*borderBottomLeftRadius: 2,*/}
                            {/*borderBottomRightRadius: 2,*/}
                            {/*borderTopLeftRadius: 0,*/}
                            {/*borderTopRightRadius: 0*/}
                        {/*}]}>*/}
                            {/*<View style={styles.flex}>*/}
                                {/*<Text style={styles.inputTitle}>设置经期、周期</Text>*/}
                            {/*</View>*/}
                            {/*<View style={styles.flex}>*/}
                                {/*<TextInput placeholder={'经期5天，周期28天'} placeholderTextColor={'#ffec93'}*/}
                                           {/*style={styles.input}/>*/}
                            {/*</View>*/}
                        {/*</View>*/}
                    </View>
                </View>
                <View>
                    <View style={styles.bottomBg}>
                        <View>
                            <TouchableOpacity style={styles.bottomBt} onPress={this.pushMain}>
                                <Text style={styles.bottomBtTx}>立即体验</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.fastLoginView}>
                            <TouchableOpacity onPress={this.pushLogin}>
                                <Text style={styles.fastLoginTx}>已有账号快速登录</Text>
                            </TouchableOpacity>
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
    flex: {
        flex: 1
    },
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
        color: 'rgb(255,255,255)',
        marginTop: 9,
        marginBottom: 9
    },
    fastLoginView: {
        alignSelf: 'flex-end',
        marginTop: 14,
        marginRight: 10
    },
    fastLoginTx: {
        fontSize: 12,
        color: 'rgb(255,255,255)'
    },
    bottomImg: {
        width: device.width(),
        height: 58
    },
    cacleView: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 21,
        marginBottom: 21,
        alignSelf: 'center',
    },
    cacleImg: {
        width: 16,
        height: 16,
        marginRight: 10
    },
    cacleTx: {
        color: 'rgb(255,255,255)',
        fontSize: 15
    },
    inputTitle: {
        color: 'rgb(255,255,255)',
        fontSize: 16
    },
    inputBg: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,147,200, 0.56)',
        padding: 12,
        paddingTop: 13,
        paddingBottom: 13,
        borderRadius: 3
    },
    input: {
        height: 16,
        fontSize: 16,
        width: 150,
        alignSelf: 'flex-end',
        textAlign: 'right',
        color: '#ffec93'
    },
    datePicker:{
        width: 160,
        height: 18,
    }
});

const {connect} = require('react-redux');

module.exports = connect()(Mom);