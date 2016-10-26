/**
 * Created by ianchen on 16/10/12.
 */

import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity, Alert} from 'react-native';
import device from '../../../common/util/device';
import Login from '../../Me/LoginSys';
import Hospital from '../hospital/Hospital';
import {navPush} from '../../../components/Nav/Nav';
import DatePicker from '../../../components/DatePicker'
import {goHome} from '../../../actions/home/actions';
import DeviceInfo from 'react-native-device-info';
import apiHttp from '../../../common/util/http';
import {rcache, synccache, converter} from '../../../common/util';
import Moment from 'moment';

class Mom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            childbirth: null,
            lmp: null,
            hidePreCalc: true
        };
        this.pushMain = this.pushMain.bind(this);
        this.pushLogin = this.pushLogin.bind(this);
    }

    pushMain() {
        if (!this.state.childbirth && !this.state.lmp) {
            Alert.alert("系统提示", '请选择预产期日期或末次月经日期');
            return;
        }
        let params = {
            username: DeviceInfo.getUniqueID(),
            gender: 2
        }
        apiHttp.apiPost('/uc/user/macid', params, (data)=> {
                if (data.code == 0) {
                    rcache.put("user", JSON.stringify(data.data));
                    this.createTimeLine();
                } else {
                    if (data.code == 4121) {
                        this.createTimeLine();
                    } else {
                        Alert.alert("系统提示", data.message);
                    }
                }

            }, (err)=> {
                Alert.alert("系统提示", err);
            }
        )
    }

    createTimeLine() {
        let params = {
            childbirth: this.state.childbirth,
            lmp: this.state.lmp
        }
        apiHttp.apiPost('/uc/timeline/create', params, (data)=> {
            if (data.code == 0) {
                this.props.dispatch(goHome(true));
            }
            else if (data.code == 4202) {
                let params = {
                    username: DeviceInfo.getUniqueID(),
                    password: 1
                }
                apiHttp.apiPost('/uc/user/sign-in', params, (data)=> {
                    rcache.put("user", JSON.stringify(data.data));
                    this.createTimeLine();
                })
            } else {
                Alert.alert("系统提示", JSON.stringify(data));
            }
        })
    }

    pushLogin() {
        navPush.push(this.props, Login, '登录');
    }
    
    push2Hospital() {
        navPush.push(this.props, Hospital, '选择产检医院');
    }

    render() {
        rcache.put('childBirth', this.state.childbirth || '')
        rcache.put('lpmDate', this.state.lmp || '')

        let preHospitalName = this.props.reduxArgs.name;

        const format = 'YYYY-MM-DD';
        const childbirthMin = Moment().format(format);
        const childbirthMax = Moment().add(280, 'days').format(format);
        const lmpMin = Moment().add(-280, 'days').format(format);
        const lmpMax = Moment().format(format);

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
                                placeholder={"预产期是哪一天呢"}
                                format={format}
                                minDate={childbirthMin}
                                maxDate={childbirthMax}
                                confirmBtnText="确定"
                                cancelBtnText="取消"
                                customStyles={dataPickerStyles}
                                showIcon={false}
                                onDateChange={(date) => {
                                    this.setState({childbirth: date})
                                }}
                            />
                        </View>
                    </View>
                    <View>
                        <View style={styles.cacleView}>
                            <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => {this.setState({hidePreCalc: !this.state.hidePreCalc})}}>
                                <Image source={require('../img/cacle.png')} style={styles.cacleImg}/>
                                <Text style={styles.cacleTx}>预产期计算器</Text>
                            </TouchableOpacity>
                        </View>
                        {this.state.hidePreCalc ? null : <View style={[styles.inputBg, styles.calcViewRadius]}>
                            <View style={styles.flex}>
                                <Text style={styles.inputTitle}>最后一次经期开始日</Text>
                            </View>
                            <View style={styles.flex}>
                                <DatePicker
                                    style={styles.datePicker}
                                    date={this.state.lmp}
                                    mode="date"
                                    placeholder={"1970-01-01"}
                                    format="YYYY-MM-DD"
                                    minDate={lmpMin}
                                    maxDate={lmpMax}
                                    confirmBtnText="确定"
                                    cancelBtnText="取消"
                                    customStyles={dataPickerStyles}
                                    showIcon={false}
                                    onDateChange={(date) => {
                                        var d = new Date(date);
                                        d.setDate(d.getDate() + 280);
                                        this.setState({lmp: date, childbirth: converter.dateToString(d)})
                                    }}
                                />
                            </View>
                        </View>}
                    </View>
                    <View>
                        <View style={styles.cacleView}>
                            <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => {this.push2Hospital()}}>
                                <Text style={styles.cacleTx}>{preHospitalName ? '产检医院：' + preHospitalName : '选择产检医院'}</Text>
                            </TouchableOpacity>
                        </View>
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

const dataPickerStyles = {
    dateText: {
        fontSize: 16,
        textAlign: 'right',
        color: '#ffec93',
        borderWidth: 0,
        marginBottom: 18,
        alignSelf: 'flex-end',
    },
    placeholderText: {
        fontSize: 16,
        textAlign: 'right',
        color: '#ffec93',
        borderWidth: 0,
        marginBottom: 18,
        alignSelf: 'flex-end',
    },
    dateInputView: {
        borderWidth: 0,
    },
    datePicker: {
        marginTop: 1,
    }
};

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
        color: '#ffec93',
    },
    datePicker: {
        width: 160,
        height: 18,
    },
    calcViewRadius: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2
    }
});

const {connect} = require('react-redux');

function select(state) {
    return {
        reduxArgs: state.statusX.reduxArgs
    }
}

module.exports = connect(select)(Mom);