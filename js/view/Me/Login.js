/**
 * Created by sea35 on 2016/10/12.
 */
import React, {Component} from 'react'
import {ScrollView, StyleSheet, Image, TextInput, View, Text, PixelRatio} from 'react-native'
import device from '../../common/util/device';
import {navPush} from '../../components/Nav/Nav';
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import LoginSys from './LoginSys'
import Register from './Register'

class Login extends Component {
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
            <ScrollableTabView
                renderTabBar={() => <ScrollableTabBar />}
                tabBarUnderlineStyle={{backgroundColor:'#ff4971',borderWidth:1,borderColor:'#ff4971',borderBottomColor:'#f5f5f5'}}
                tabBarBackgroundColor='#ff4971'
                tabBarActiveTextColor='#ffffff'
                tabBarInactiveTextColor='#ffffff'
                tabBarTextStyle={{fontSize: 15}}>
                <LoginSys tabLabel='登录'/>
                <Register tabLabel='注册'/>
            </ScrollableTabView>
        )
    }
}

const styles = StyleSheet.create({

})
export default Login