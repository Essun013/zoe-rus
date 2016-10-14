/**
 * Created by ianchen on 16/10/12.
 */

import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity, TextInput} from 'react-native';
import device from '../../../common/util/device';
import Login from '../../Me/LoginSys';
import {navPush} from '../../../components/Nav/Nav';
import {addTodo} from '../../../actions/actions';

class Mom extends Component {
    constructor(props) {
        super(props);

        this.pushMain = this.pushMain.bind(this);
        this.pushLogin = this.pushLogin.bind(this);
    }

    pushMain() {
        this.props.dispatch(addTodo(true));
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
                        {/*<Text style={{color: 'rgba(255,147,200, 0.56)', position: 'absolute', top: -5, zIndex: -1}}>◆</Text>*/}
                        <View style={styles.flex}>
                            <Text style={styles.inputTitle}>预产期</Text>
                        </View>
                        <View style={styles.flex}>
                            <TextInput placeholder={'预产期是哪一天呢'} placeholderTextColor={'#ffec93'} style={styles.input}/>
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
                                <TextInput placeholder={'0000-00-00'} placeholderTextColor={'#ffec93'}
                                           style={styles.input}/>
                            </View>
                        </View>
                        <View style={[styles.inputBg, {
                            marginTop: 1,
                            borderBottomLeftRadius: 2,
                            borderBottomRightRadius: 2,
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0
                        }]}>
                            <View style={styles.flex}>
                                <Text style={styles.inputTitle}>设置经期、周期</Text>
                            </View>
                            <View style={styles.flex}>
                                <TextInput placeholder={'经期5天，周期28天'} placeholderTextColor={'#ffec93'}
                                           style={styles.input}/>
                            </View>
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
    }
});

const {connect} = require('react-redux');

module.exports = connect()(Mom);