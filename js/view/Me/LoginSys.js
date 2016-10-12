/**
 * Created by sea35 on 2016/10/12.
 */
import React, {Component} from 'react'
import {ScrollView, StyleSheet, Image, TextInput, View, Text, PixelRatio} from 'react-native'
import {ImgButton} from '../../components'
import device from '../../common/util/device';
import {navPush} from '../../components/Nav/Nav';



class LoginSys extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }
    onBasicInfoPress() {
        navPush.pop(this.props);
    }
    render() {
        return (
            <ScrollView style={styles.mainContainer}>
                <View style={styles.container}>
                    <View style={styles.listView}>
                        <Text style={styles.title}>手机号</Text>
                        <View style={styles.textInput}>
                            <TextInput
                                style={{height: 40, fontSize: 15}}
                                onChangeText={(text) => this.setState({text})}
                                value={this.state.text}/>
                        </View>
                    </View>
                    <View style={styles.listView}>
                        <Text style={styles.title}>密    码</Text>
                        <View style={styles.textMMInput}>
                            <TextInput
                                style={{height: 40, fontSize: 15}}
                                onChangeText={(text) => this.setState({text})}
                                value={this.state.text}/>
                        </View>
                        <View style={styles.textFgMMInput}>
                            <Text style={{fontSize: 15,color: '#fe7aa2'}}>忘记密码了？</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.submitBut}>
                    <ImgButton text="登录" onClick={this.onBasicInfoPress.bind(this)}></ImgButton>
                </View>
                <View style={styles.thirdLogin}>
                    <View style={styles.thirdLoginRow}>
                        <View style={{flex:4,alignItems: 'center',justifyContent: 'center'}}  >
                            <Text style={{fontSize: 15,color: '#bbbbbb'}}>第三方无需注册，点击直接登录</Text>
                        </View>
                    </View>
                    <View style={styles.thirdLoginRow}>
                        <View style={styles.thirdIconList} >
                            <Image style={styles.thirdIcon} source={require('./img/wx-icon.png')} resizeMode='cover'/>
                        </View>
                        <View style={styles.thirdIconList} >
                            <Image style={styles.thirdIcon} source={require('./img/qq-icon.png')} resizeMode='cover'/>
                        </View>
                        <View style={styles.thirdIconList} >
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
    textMMInput:{
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
    textFgMMInput:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 15,
        color: '#bbbbbb'
    },
    submitBut:{
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
        marginTop: 180,
    },
    thirdLoginRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    thirdIconList:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    thirdIcon:{
        height:60,
        width:60
    }
})
export default LoginSys