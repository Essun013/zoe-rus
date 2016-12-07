/**
 * Created by linys on 16/10/13.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Platform,
    Text,
    Animated,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    WebView,
    Alert
} from 'react-native';
import device from '../../../common/util/device';
import WeekTab from '../WeekTab/WeekTab';
import {app, http} from '../../../common/util';
import ShareActionButton from '../../../components/Button/ShareActionButton';
import Symbol from 'es6-symbol';
const ShareType = {
    Wechat: Symbol('Wechat'),
    WechatFriend: Symbol('WechatFriend'),
    QQ: Symbol('QQ'),
    QQZone: Symbol('QQZone'),
};
const SelfHeight = 150; //206

class MomKnow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initWeek: this.props.initWeek, //初始化周数
            selWeek: this.props.initWeek,  //用户选中的周数
            webView: null, //WebView组件,
            onShow: false, //展示分享页面
            translateValue:new Animated.Value(50),
            maskViewAlpha: new Animated.Value(0),
            allowShareTypes: [ShareType.Wechat, ShareType.WechatFriend, ShareType.QQ, ShareType.QQZone],
            animScrollY:0,
        };
        this.showAction = this.showAction.bind(this);
        this.dismissAction = this.dismissAction.bind(this);
        this.props.iNavBar(this, {right: this._navRight.bind(this)});
    }

    componentWillMount() {
        //初始化加载
        this.loadBabyHtml(this.state.initWeek);
    }

    //加载文章
    loadBabyHtml(week) {
        let params = {
            subject: "孕妈早知道" + week + "周",
            html: true,
        };
        http.apiPost('/kb/knowledge/find', params, (result) => {
                if (result.code === 0) {
                    let uri = app.apiUrl + "kb/knowledge/html?id=" + result.data.id + "&&css=glossary";
                    //渲染WebView
                    this.setState({
                        selWeek: week,
                        webView: this.loadHtml(uri),
                    });
                } else {
                    Alert.alert("系统提示", result.message);
                }
            }, (err) => {
                Alert.alert("系统提示", err.stack);
            }
        );
    }

    //加载WebView
    loadHtml(htmlUri) {
        return (<WebView
            style={styles.webViewContainer}
            source={{uri: htmlUri}}
            onNavigationStateChange={this.onNavigationStateChange}
            startInLoadingState={true}
            domStorageEnabled={true}
            javaScriptEnabled={true}/>);
    }


    _navRight(route, navigator, index) {
        return <View style={styles.rightContainer}>
            <TouchableOpacity onPress={this.showAction}>
                <Image source={require('../img/share.png')} style={{width: 21, height: 21}} resizeMode='stretch'/>
            </TouchableOpacity>
        </View>
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.fullScreenStyle}>
                    <Animated.View style={{
                        width: device.width(),
                        height: this.state.translateValue,
                        backgroundColor: 'transparent',
                    }}>
                        <WeekTab ref="weekTab" week={this.state.selWeek} switchTab={week => this.loadBabyHtml(week)}/>
                    </Animated.View>
                    {this.state.webView}
                </View>
                {this._renderShareView()}
            </View>
        );
    }


    //加载分享
    showAction() {
        if (this.state.allowShareTypes.length > 0) {
            this.setState({
                onShow: true,
            });
            Animated.timing(this.state.maskViewAlpha, {
                toValue: 0.3,
                duration: 350,//250
            }).start();
        } else {
            console.log('手机没有安装分享应用');
        }
    }

    //取消分享
    dismissAction() {
        Animated.timing(this.state.maskViewAlpha, {
            toValue: 0,
            duration: 250,
        }).start(()=>{
            this.setState({
                onShow: false,
            });
        });

    }

    //加载分享页面
    _renderShareView(){
        if (this.state.onShow) {
            return (
                <View style={[styles.container,{backgroundColor: 'transparent'}]}>
                    <TouchableWithoutFeedback onPress={this.dismissAction}>
                        <Animated.View style={[styles.fullScreenStyle, {
                            backgroundColor: 'black',
                            opacity: this.state.maskViewAlpha,
                        }]}>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                    <Animated.View style={[styles.bottomContainer,{
                        transform: [{
                            translateY: this.state.maskViewAlpha.interpolate({
                                inputRange: [0, 0.3],
                                outputRange: [0, -SelfHeight]
                            }),
                        }]
                    }]}>
                        <Text style={[styles.topTitle]}>该文章分享到：</Text>
                        <View style={styles.buttonSubContainer}>
                            {this._renderShareButtonBy(ShareType.Wechat)}
                            {this._renderShareButtonBy(ShareType.WechatFriend)}
                            {this._renderShareButtonBy(ShareType.QQ)}
                            {this._renderShareButtonBy(ShareType.QQZone)}
                        </View>
                    </Animated.View>
                </View>
            )
        } else {
            return null;
        }
    }

    _renderShareButtonBy(shareType){
        if (this.state.allowShareTypes.some(type => {
                return type === shareType;
            })) {
            let name;
            let imageSource;
            switch (shareType) {
                case ShareType.WechatFriend:
                    name = '微信朋友圈';
                    imageSource = require('../../Me/img/wxfriend-icon.png');
                    break;
                case ShareType.QQ:
                    name = 'QQ好友';
                    imageSource = require('../../Me/img/qq-icon.png');
                    break;
                case ShareType.QQZone:
                    name = 'QQ空间';
                    imageSource = require('../../Me/img/qqzone-icon.png');
                    break;
                default:
                    name = '微信好友';
                    imageSource = require('../../Me/img/wx-icon.png');
                    break;
            }
            return <ShareActionButton {...this.props} imageSource={imageSource} name={name} handler={()=> {
                this.didSelectedType(shareType)
            }}/>
        }
        return null
    }

    didSelectedType(shareType) {
        switch (shareType) {
            case ShareType.WechatFriend:
                //this.actionShare(ShareManager.WechatFriend);
                this.actionShare("WechatFriend");
                break;
            case ShareType.QQ:
                //this.actionShare(ShareManager.QQ);
                this.actionShare("QQ");
                break;
            case ShareType.QQZone:
                //this.actionShare(ShareManager.QQZone);
                this.actionShare("QQZone");
                break;
            default:
                //this.actionShare(ShareManager.Wechat);
                this.actionShare("Wechat");
        }
    }

    //调用其他APP(待研究)
    actionShare(type){
        if(Platform.OS === 'android'){
            Alert.alert('android分享成功 ' + type);
        }else{
            Alert.alert('IOS分享成功 ' + type);
        }
        this.setState({
            onShow: false
        });

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        //width: device.width(),
        //height: device.height(),
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    webViewContainer: {
        flex: 1,
        backgroundColor: 'rgb(240,240,240)',
        width: device.width(),
    },
    rightContainer: {
        flex: 1,
        marginRight: 15,
        justifyContent: 'center',
    },
    bottomCenter: {
        justifyContent: 'center'
    },
    //分享界面样式
    fullScreenStyle:{
        position: 'absolute',
        left: 0,
        top: 0,
        width: device.width(),
        height: device.height() - 58,
        justifyContent: "center",
        //backgroundColor: 'green',
    },
    bottomContainer: {
        width: device.width(),
        backgroundColor: 'white',
        //justifyContent: 'space-between',
        height: SelfHeight,
        paddingVertical: 10,
        marginBottom: -SelfHeight,
    },
    topTitle: {
        fontSize: 18,
        paddingLeft: 5,
        //color: 'rgb(75,75,75)',
        color: 'rgb(0,0,0)',
        fontFamily: 'PingFang SC',
        textAlign: 'left',
    },
    buttonSubContainer: {
        //marginHorizontal: device.width(),
        //backgroundColor: 'blue',
        marginTop: 15,
        marginHorizontal: 13,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

});

module.exports = MomKnow;