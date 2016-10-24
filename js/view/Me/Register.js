/**
 * Created by sea35 on 2016/10/12.
 */
import React, {Component} from 'react'
import {ScrollView, StyleSheet, Image, Alert, TextInput, View, Text, PixelRatio,Platform} from 'react-native'
import {ImgButton} from '../../components'
import device from '../../common/util/device';
import {navPush} from '../../components/Nav/Nav';
import apiHttp from '../../common/util/http';
import {rcache,synccache} from '../../common/util';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            verification: '',
            password:''
        }
    }

    onBasicInfoPress() {
        let params = {
            username: this.state.phone,
            captcha: this.state.verification,
            password:this.state.password,
            gender:2
        }
        apiHttp.apiPost('/uc/user/sign-up', params, (data)=> {
                if (data.code == 0) {
                    Alert.alert("系统提示", "注册成功");
                    rcache.put("login",'true');
                    rcache.put("user",JSON.stringify(data.data));
                    this.props.loginSys(data.data,'true');
                    navPush.pop(this.props, 2);
                } else {
                    Alert.alert("系统提示", "注册失败,失败原因" + data.message);
                }

            }, (err)=> {
                Alert.alert("系统提示", err);
            }
        )
    }

    render() {
        return (
            <ScrollView style={styles.mainContainer}>
                <View style={styles.container}>
                    <View style={styles.listView}>
                        <Text style={styles.title}>手机号</Text>
                        <View style={styles.textPhoneInput}>
                            <TextInput
                                keyboardType="numeric"
                                style={[styles.textInput, {width: 240}]}
                                onChangeText={(phone) => this.setState({phone: phone})}
                                value={this.state.phone} underlineColorAndroid={'transparent'}/>
                        </View>
                    </View>
                    <View style={styles.listView}>
                        <Text style={styles.title}>验证码</Text>
                        <View style={styles.textMMInput}>
                            <TextInput
                                style={[styles.textInput, {width: 190}]}
                                onChangeText={(verification) => this.setState({verification: verification})}
                                value={this.state.verification} underlineColorAndroid={'transparent'}/>
                        </View>
                        <View style={styles.textFgMMInput}>
                            <Image style={{height: 30, width: 130, alignItems: 'center', justifyContent: 'center',}}
                                   source={require('./img/verification-but.png')} resizeMode='contain'>
                                <Text style={{
                                    fontSize: 15,
                                    width: 90,
                                    color: '#fe7aa2',
                                    marginLeft: 5,
                                    backgroundColor: '#fff1f6'
                                }}>获取验证码</Text>
                            </Image>
                        </View>
                    </View>
                    <View style={styles.listView}>
                        <Text style={styles.title}>密    码</Text>
                        <View style={styles.textPhoneInput}>
                            <TextInput
                                style={[styles.textInput, {width: 240}]}
                                onChangeText={(password) => this.setState({password: password})}
                                value={this.state.password}
                                underlineColorAndroid={'transparent'}
                                secureTextEntry={true}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.submitBut}>
                    <ImgButton text="注册" onClick={this.onBasicInfoPress.bind(this)}></ImgButton>
                </View>
                <View style={styles.thirdLogin}>
                    <View style={styles.thirdLoginRow}>
                        <View style={{flex: 1, alignItems: 'flex-end'}}>
                            <Image style={{height: 20, width: 20}} source={require('./img/selected.png')}
                                   resizeMode='cover'/>
                        </View>
                        <View style={{flex: 5, alignItems: 'flex-start', marginLeft: 5}}>
                            <Text style={{fontSize: 15, color: '#bbbbbb'}}>我已阅读并同意使用条款和隐私政策</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#f5f5f5'
    },
    container: {
        marginTop: 10,
        width: device.width(),
        backgroundColor: '#ffffff'
    },
    listView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
        borderBottomColor: '#ededed',
        borderBottomWidth: 1,
        ...Platform.select({
            ios: {
                height: 50,
            }
        })
    },
    textInput: {
        height: 50,
        fontSize: 15,
        ...Platform.select({
            android: {
                marginTop: 8,
            }
        })
    },
    textPhoneInput: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginLeft: 10,
    },
    textMMInput: {
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginLeft: 10,
    },
    textFgMMInput: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    title: {
        fontSize: 15,
        color: '#bbbbbb'
    },
    submitBut: {
        marginTop: 20,
        width: device.width(),
        alignItems: 'center',
        justifyContent: 'center',
    },
    thirdLogin: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginLeft: 10,
        marginTop: 20,
    },
    thirdLoginRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
})


const {connect} = require('react-redux');
module.exports = connect()(Register);