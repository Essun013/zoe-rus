/**
 * Created by sea35 on 2016/10/10.
 */
import React, {Component} from 'react'
import {ScrollView, StyleSheet, Image, TextInput, View, Text, PixelRatio,Alert} from 'react-native'
import {ImgButton} from '../../../components'
import device from '../../../common/util/device';
import {navPush} from '../../../components/Nav/Nav';
import apiHttp from '../../../common/util/http';
import { loginSys }  from '../../../actions/me/me';


class NicknameSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.user.nick
        }
    }
    onBasicInfoPress() {
        let user =this.props.user;
        user.nick=this.state.text;
        let params = {
            nick: this.state.text
        }
        apiHttp.apiPost('/uc/user/modify', params,(data)=>{
             if(data.code==0){
                 this.props.dispatch(loginSys(user,true));
                 navPush.pop(this.props);
             }
             else {
                 Alert.alert('系统提示','更新失败,'+data.message);
             }
        },(err)=>{
            Alert.alert('系统提示',err.toString());
        });

    }
    render() {
        return (
            <ScrollView style={styles.mainContainer}>
                <View style={styles.container}>
                    <View style={styles.listView}>
                        <Text style={styles.title}>昵称</Text>
                        <View style={styles.textInput}>
                            <TextInput
                                style={{height: 40, fontSize: 15}}
                                onChangeText={(text) => this.setState({text})}
                                value={this.state.text}/>
                        </View>
                    </View>
                </View>
                <View style={styles.submitBut}>
                    <ImgButton text="提交" onClick={this.onBasicInfoPress.bind(this)}></ImgButton>
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
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginLeft: 10,
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
    }
})
const {connect} = require('react-redux');
module.exports = connect()(NicknameSetting);