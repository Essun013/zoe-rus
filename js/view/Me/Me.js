/**
 * Created by fhc on 16/10/8.
 */

import React, {Component} from 'react'
import {ScrollView, View, StyleSheet, Image, TouchableOpacity} from 'react-native'
import {ListItem, List, Text} from '../../components';
import BasicInfo from './BasicInfo/BasicInfo';
import {navPush} from '../../components/Nav/Nav';
import device from '../../common/util/device';
import Remind from './Remind/Remind';
import LoginSys from './LoginSys';
import Collection from  './Favorite/Favorite';
import {Provider, connect} from 'react-redux'
import {http,app} from '../../common/util';
import Moment from 'moment';
import {rcache,synccache} from '../../common/util';
import { loginSys,setUser }  from '../../actions/me/me';



class Me extends Component {

     constructor(props) {
        super(props);
        this.state = {
            gestationalAge:'',
            childbirth:Moment().format('YYYY-MM-DD'),
        }
        this.setLoingState();
    }

    async setLoingState(){
        let loginState = await synccache.get("loginState");
        let user = await synccache.get("user");
        if(loginState == "true"){
            //this.setState({loginState:true,user:JSON.parse(user)});
            this.props.dispatch(loginSys(true));
            this.props.dispatch(setUser(JSON.parse(user)));
        }
        http.apiPost('/uc/timeline/get', {}, (data)=> {
                if (data.code == 0) {
                    var days = this.childbirthForme(data.data.day);
                    this.setState(days);
                }
            }
        )
    }

    onBasicInfoPress() {
        if (this.props.loginState) {//(this.state.loginState || this.props.loginState)
            navPush.push(this.props, BasicInfo, '基本信息',{c_childbirth:this.state.childbirth});
        }
        else {
            navPush.push(this.props, LoginSys, '登录');
        }
    }

    onMessagePress(){
        navPush.push(this.props, Remind, '提醒设置');
    }

    onLoginSys() {
        navPush.push(this.props, LoginSys, '登录');
    }

    onCollectionPress(){
        navPush.push(this.props,Collection,'收藏');
    }

    childbirthForme(days){
        let week = parseInt(days/7);
        let day = days%7;
        const childbirth = Moment().add(280-days, 'days').format('YYYY-MM-DD');
        return {gestationalAge:week+'周+'+day+'天',childbirth:childbirth};
    }
    render() {
        var loginButton;
        var gestationalAge =this.state.gestationalAge;
        var photo = this.props.user.portrait?{uri:app.apiUrl +this.props.user.portrait}:require('./img/photo.png');
        if(this.props.childbirth){
            let day = 280+Moment().diff(Moment(this.props.childbirth),'days')-1;
            gestationalAge =this.childbirthForme(day).gestationalAge;
        }
        let state = this.props.loginState;//this.state.loginState || this.props.loginState;
        let user = this.props.user;//this.state.user || this.props.user;
        if (state && user.mobile) {
            loginButton = <Text style={styles.headerTxt}>{user.nick || user.mobile}</Text>;
        } else {
            loginButton = <TouchableOpacity onPress={this.onLoginSys.bind(this)}>
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
                                    <Image style={styles.photo} source={photo}
                                           resizeMode='cover'>
                                    </Image>
                                </Image>
                                {loginButton}
                                <Text style={styles.headerTxt}>怀孕{gestationalAge} | 厦门</Text>
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
                            onPress={this.onCollectionPress.bind(this)}
                        />
                    </List>
                    <List containerStyle={{marginTop: 10}}>
                        <ListItem
                            imgSource={require('./img/reminder-settings.png')}
                            title={"我的提醒"}
                            onPress={this.onMessagePress.bind(this)}
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
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
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
        width: 75,
        height: 75,
        borderRadius:35

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
function mapStateToProps(store) {
    return {
        user:store.editMe.user,
        loginState: store.editMe.loginState,
        childbirth:store.editMe.childbirth
    }
}
//
// function mapDispatchToProps(dispatch) {
//     return {
//         actions: bindActionCreators(meActions, dispatch)
//     }
// }

export default connect(mapStateToProps)(Me);