/**
 * Created by sea35 on 2016/10/12.
 */
/**
 * Created by sea35 on 2016/10/12.
 */
import React, {Component} from 'react'
import {ScrollView, StyleSheet, Image, TextInput, View, Text, PixelRatio} from 'react-native'
import {ImgButton} from '../../components'
import device from '../../common/util/device';
import {navPush} from '../../components/Nav/Nav';



class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            verification:''
        }
    }
    onBasicInfoPress() {

        navPush.pop(this.props,2);

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
                                onChangeText={(phone) => this.setState({phone:phone})}
                                value={this.state.verification}/>
                        </View>
                    </View>
                    <View style={styles.listView}>
                        <Text style={styles.title}>验证码</Text>
                        <View style={styles.textMMInput}>
                            <TextInput
                                style={{height: 40, fontSize: 15}}
                                onChangeText={(verification) => this.setState({verification:verification})}
                                value={this.state.verification}/>
                        </View>
                        <View style={styles.textFgMMInput}>
                                <Image style={{height:30,width:130,alignItems: 'center',justifyContent: 'center',}} source={require('./img/verification-but.png')} resizeMode='contain'>
                                    <Text style={{fontSize: 15,width:90,color: '#fe7aa2',marginLeft: 5,backgroundColor:'#fff1f6'}}>获取验证码</Text>
                                </Image>
                        </View>
                    </View>
                </View>
                <View style={styles.submitBut}>
                    <ImgButton text="注册" onClick={this.onBasicInfoPress.bind(this)}></ImgButton>
                </View>
                <View style={styles.thirdLogin}>
                    <View style={styles.thirdLoginRow}>
                        <View style={{flex:1,alignItems: 'flex-end'}}  >
                            <Image style={{height:20,width:20}} source={require('./img/selected.png')} resizeMode='cover'/>
                        </View>
                        <View style={{flex:5,alignItems: 'flex-start',marginLeft: 5}}  >
                            <Text style={{fontSize: 15,color: '#bbbbbb'}}>我已阅读并同意使用条款和隐私政策</Text>
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
        justifyContent: 'center',
        marginRight: 10,
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
        marginTop: 20,
    },
    thirdLoginRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
})
export default Register