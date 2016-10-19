/**
 * Created by sea35 on 2016/10/12.
 */
import React, {Component, PropTypes} from 'react'
import {
    ScrollView,
    StyleSheet,
    Image,
    TextInput,
    View,
    Text,
    PixelRatio,
    TouchableOpacity,
    Platform
} from 'react-native'
import {ImgButton} from '../../components'
import device from '../../common/util/device';
import {navPush} from '../../components/Nav/Nav';
import Register from './Register';
import apiHttp from '../../common/util/http';
import {rcache,synccache} from '../../common/util';

class LoginSys extends Component {
    static propTypes = {
        fatherProps: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            phone: ''
        }
    }

    onBasicInfoPress() {
        apiHttp.apiPost('/uc/user/sign-in', params, (data)=> {
                if (data.code == 0) {
                    rcache.put("login",'true');
                    rcache.put("user",JSON.stringify(data.data));
                    this.props.dispatch(loginSys(data.data,true));
                    navPush.pop(this.props);
                } else {
                    Alert.alert("系统提示", "登录失败," + data.message);
                }

            }, (err)=> {
                Alert.alert("系统提示", err);
            }
        )
    }

    onRegisterPress() {
        navPush.push(this.props, Register, '注册');
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
                                maxLength={11}
                                style={[styles.textInput, {width: 240}]}
                                onChangeText={(phone) => this.setState({phone: phone})}
                                value={this.state.phone} underlineColorAndroid={'transparent'}/>
                        </View>
                    </View>
                    <View style={styles.listView}>
                        <Text style={styles.title}>密 码</Text>
                        <View style={styles.textMMInput}>
                            <TextInput
                                style={[styles.textInput, {width: 180}]}
                                onChangeText={(text) => this.setState({text})}
                                value={this.state.text}
                                underlineColorAndroid={'transparent'}
                                secureTextEntry={true}
                            />
                        </View>
                        <View style={styles.textFgMMInput}>
                            <Text style={{fontSize: 15, color: '#fe7aa2'}}>忘记密码了？</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.submitBut}>
                    <ImgButton text="登录" onClick={this.onBasicInfoPress.bind(this)}></ImgButton>
                </View>
                <View style={[styles.submitBut, {marginTop: 20}]}>
                    <TouchableOpacity onPress={this.onRegisterPress.bind(this)}>
                        <Text style={{fontSize: 13, color: '#bbbbbb'}}>我没有帐户，我要注册</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.thirdLogin}>
                    <View style={styles.thirdLoginRow}>
                        <View style={{flex: 4, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{fontSize: 15, color: '#bbbbbb'}}>第三方无需注册，点击直接登录</Text>
                        </View>
                    </View>
                    <View style={styles.thirdLoginRow}>
                        <View style={styles.thirdIconList}>
                            <Image style={styles.thirdIcon} source={require('./img/wx-icon.png')} resizeMode='cover'/>
                        </View>
                        <View style={styles.thirdIconList}>
                            <Image style={styles.thirdIcon} source={require('./img/qq-icon.png')} resizeMode='cover'/>
                        </View>
                        <View style={styles.thirdIconList}>
                            <Image style={styles.thirdIcon} source={require('./img/wb-icon.png')} resizeMode='cover'/>
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
    },
    textInput: {
        height: 40,
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
        justifyContent: 'center'
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
        ...Platform.select({
            android: {
                marginTop: 100,
            },
            ios:{
                marginTop: 180,
            }
        })
    },
    thirdLoginRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    thirdIconList: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    thirdIcon: {
        height: 60,
        width: 60
    }
})
export default LoginSys