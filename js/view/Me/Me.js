/**
 * Created by fhc on 16/10/8.
 */

import React, {Component} from 'react'
import {ScrollView, View, StyleSheet, Image,TouchableOpacity} from 'react-native'

import {ListItem, List, Text} from '../../components';
import BasicInfo from './basic-info/BasicInfo';
import {navPush} from '../../components/Nav/Nav';
import device from '../../common/util/device';
import LoginSys from './LoginSys';
import { Provider, connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import meActions from '../../actions/me/me';
/*import Register from './Register';*/
const log = () => console.log('this is an example method');

class Me extends Component {

    constructor(props) {
        super(props);
        this.state = {
            phone: ''
        }
    }
    onBasicInfoPress() {
        navPush.push(this.props, BasicInfo, '基本信息');
    }
    onLoginSys(){
        navPush.push(this.props, LoginSys, '登录');
    }
    render() {
        var loginButton;
        if ( this.props.loginState) {
            loginButton = <Text style={styles.headerTxt}>this.props.user.name</Text>;
        } else {
            loginButton =  <TouchableOpacity onPress={this.onLoginSys.bind(this)}>
                <Image style={styles.loginBut} source={require('./img/but-login.png')}
                       resizeMode='cover'>
                    <Text style={styles.loginText}>立即登录</Text>
                </Image>
            </TouchableOpacity>;
        }
        return (
            <View style={{flex: 1}}>
                <View style={styles.header}>
                    <Image source={require('./img/background.png')} style={styles.backgroundImage1}
                           resizeMode='stretch'>
                        <Image source={require('./img/background0.png')} style={styles.backgroundImage2}
                               resizeMode='stretch'>
                            <View style={{alignItems: 'center'}}>
                                <Image style={styles.photoBackground} source={require('./img/photo-background.png')}
                                       resizeMode='cover'>
                                    <Image style={styles.photo} source={require('./img/photo.png')}
                                           resizeMode='cover'>
                                    </Image>
                                </Image>
                                {loginButton}
                                <Text style={styles.headerTxt}>怀孕8周+1天 | 厦门</Text>
                            </View>
                        </Image>
                    </Image>
                </View>
                <ScrollView contentContainerStyle={styles.mainContainer}>
                    <List containerStyle={{marginTop: 10}}>
                        <ListItem
                            imgSource={require('./img/basic-info.png')}
                            title={"基本信息"}
                            onPress={this.onBasicInfoPress.bind(this)}
                        />
                        <ListItem
                            imgSource={require('./img/baby-files.png')}
                            title={"宝宝档案"}
                        />
                        <ListItem
                            imgSource={require('./img/invite-daddy.png')}
                            title={"邀请宝爸"}
                        />
                        <ListItem
                            imgSource={require('./img/my-collection.png')}
                            title={"我的收藏"}
                        />
                    </List>
                    <List containerStyle={{marginTop: 10}}>
                        <ListItem
                            imgSource={require('./img/reminder-settings.png')}
                            title={"我的提醒"}
                            onPress={this.onBasicInfoPress.bind(this)}
                        />
                    </List>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#f5f5f5',
        flex: 1
    },
    header: {
        alignItems: 'center',
    },
    headerTxt: {
        color: '#ffffff'
    },
    backgroundImage1: {
        height: 170,
        width: device.width(),

    },
    backgroundImage2: {
        height: 170,
        width: device.width(),
        justifyContent: 'center',

    },
    photo: {
        width: 72,
        height: 72,

    },
    photoBackground: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 80, height: 80,
        marginBottom: 10
    },
    loginBut: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 85, height: 25,
        marginBottom: 10
    },
    loginText: {
        color: '#ff4969'
    }
})

// 声明 connect 连接
// 将 redux 中的 state传给 App
function mapStateToProps(store){
    return{
        user:store.user,
        loginState:store.loginState
    }
}

function mapDispatchToProps(dispatch){
    return{
        actions : bindActionCreators(meActions,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Me);