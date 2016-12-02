/**
 * Created by linys on 2016/11/4.
 */
import React, {Component, PropTypes} from 'react';
import {View,
    StyleSheet,
    Image,
    Text,
    WebView,
    Animated,
    TouchableOpacity,
    TouchableWithoutFeedback,
    NativeModules,
    Platform,
    Alert} from 'react-native';
import {device, http, app} from '../../../common/util';
import ShareActionButton from './ShareActionButton';
import Symbol from 'es6-symbol';
const ShareType = {
    Wechat: Symbol('Wechat'),
    WechatFriend: Symbol('WechatFriend'),
    QQ: Symbol('QQ'),
    QQZone: Symbol('QQZone'),
};
const SelfHeight = 150; //206
var ShareManager = NativeModules.ShareManager;

//外壳用来展示文章详细内容
class Content extends Component {

    // 默认属性
    static defaultProps = {
        type: ShareType.Wechat,
    };

    // 属性类型
    static propTypes = {
        shareObject: PropTypes.shape({
            title: PropTypes.string,
            content: PropTypes.string,
            url: PropTypes.string,
        }),
        type: PropTypes.any,
        handler: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            topicId: this.props.topicId, //文章Id
            isFavorite: false,
            onShow: false, //展示分享页面
            translateValue:new Animated.Value(device.width() * 0.59),
            maskViewAlpha: new Animated.Value(0),
            allowShareTypes: [ShareType.Wechat, ShareType.WechatFriend, ShareType.QQ, ShareType.QQZone],
        };

        this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
        this.showAction = this.showAction.bind(this);
        this.dismissAction = this.dismissAction.bind(this);
        this.didSelectedType = this.didSelectedType.bind(this);
        this.switchFavorite = this.switchFavorite.bind(this);
        this._getAllowShareTypesFromPlaforms();

    }

    //组件将要挂载的时候
    componentWillMount() {
        let params = {
            type: 1, //知识
            goal: this.props.topicId
        };
        //查询是否收藏该文章
        http.apiPost('/uc/favorite/has', params, (result)=> {
            if (result.code === 0) {
                this.setState({isFavorite: result.data});
            } else {
                Alert.alert("系统提示：获取是否收藏失败！", result.message);
            }

            //渲染导航栏
            this.props.iNavBar(this, {
                right: this._navRight.bind(this)
            });

        }, (err)=> {
            //Alert.alert("系统提示", err);
            console.log('请求/uc/favorite/has||' + err);
        });
    }

    //切换收藏
    switchFavorite(){
        let params = {
            type: 1,
            goal: this.props.topicId
        };
        if(this.state.isFavorite){
            http.apiPost('/uc/favorite/delete', params, (result)=> {
                if (result.code === 0) {
                    Alert.alert("取消收藏！");
                } else {
                    Alert.alert("系统提示：取消收藏失败！", result.message);
                }
            }, (err)=> {
                //Alert.alert("系统提示", err);
                console.log('请求/uc/favorite/delete||' + err);
            });
        } else {
            http.apiPost('/uc/favorite/save', params, (result)=> {
                if (result.code === 0) {
                    Alert.alert("收藏成功！");
                } else {
                    Alert.alert("系统提示：收藏失败！", result.message);
                }
            }, (err)=> {
                //Alert.alert("系统提示", err);
                console.log('请求/uc/favorite/save||' + err);
            });
        }
        this.setState({
            isFavorite: !this.state.isFavorite
        });
    }

    //以后还要判断根据手机已有按照的应用来分享
    _getAllowShareTypesFromPlaforms() {
        if (Platform.OS === 'android') {
            this.allowShareTypes = [ShareType.Wechat]
        } else {
            //暂时移除分享功能
            this.allowShareTypes = [];
            return;
            ShareManager.getShareTypesSupport('key').then((allShareTypes) => {
                console.log('ShareManager.getShareTypesSupport' + allShareTypes);
                let types = []
                if (allShareTypes.wechat) {
                    types.push(ShareType.Wechat, ShareType.WechatFriend)
                }
                if (allShareTypes.qq) {
                    types.push(ShareType.QQ, ShareType.QQZone)
                }
                this.setState({allowShareTypes: types})
            }, ()=> {
            })

        }

    }

    //加载分享页面
    _renderShareView(){
        if (this.state.onShow) {
            return (
                <View style={[styles.container,{backgroundColor: 'transparent'}]}>
                    <TouchableWithoutFeedback onPress={this.dismissAction}>
                        <Animated.View style={[styles.fullScreenStyle, {
                            backgroundColor: 'black',  opacity: this.state.maskViewAlpha,
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

    //加载分享
    showAction() {
        if (this.state.allowShareTypes.length > 0) {
            this.setState({
                onShow: true,
            });
            Animated.timing(this.state.maskViewAlpha, {
                toValue: 0.3,
                duration: 300,//250
            }).start();
        } else {
            console.log('手机没有安装分享应用');
        }
    }
    //取消分享
    dismissAction() {
        Animated.timing(this.state.maskViewAlpha, {
            toValue: 0,
            duration: 200,
        }).start(()=>{
            this.setState({
                onShow: false,
            });
        });

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
             //ShareManager.shareContent(this.props.shareObject, type);
        }else{
            Alert.alert('IOS分享成功 ' + type);
             //ShareManager.shareContent(this.props.shareObject, type).then(()=> {
             //this.refs.hudView.showSuccess()
             //}, (errerStateStr)=> {
             //this.refs.hudView.showError()
             //console.log(errerStateStr)
             //})
        }
        this.setState({
            onShow: false
        });

    }

    _navRight(route, navigator, index, navState) {
        return <View style={styles.rightContainer}>
            <TouchableOpacity style={styles.bottomCenter} onPress={this.switchFavorite}>
                <Image source={this.state.isFavorite?
                    require('../img/favorited.png'):require('../img/favorite.png')} style={{width: 21, height: 21}} resizeMode='stretch'/>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.bottomCenter, styles.tipsBottom]} onPress={this.showAction}>
                <Image source={require('../img/share.png')} style={{width: 19, height: 21}} resizeMode='stretch'/>
            </TouchableOpacity>
        </View>
    }

    onNavigationStateChange(){
        console.log('onNavigationStateChange....');
    }

    _renderViewAndStar(read, favorite){
        return (
            <View style={[styles.msgOverView, styles.msgOver]}>
                <View style={styles.msgOver}>
                    <View style={styles.msgOverImgView}>
                        <Image source={require('../img/read_count.png')} style={styles.msgOverImg}
                               resizeMode='stretch'/>
                    </View>
                    <Text style={styles.msgOverText}>{read}</Text>
                </View>
                <View style={[styles.msgOver, {marginLeft: 20}]}>
                    <View style={styles.msgOverImgView}>
                        <Image source={require('../img/favorite_count.png')} style={styles.msgOverImg}
                               resizeMode='stretch'/>
                    </View>
                    <Text style={styles.msgOverText}>{favorite}</Text>
                </View>
            </View>
        );
    }

    render() {
        //渲染导航栏
        this.props.iNavBar(this, {
            right: this._navRight.bind(this)
        });

        var subject = this.props.subject; //标题
        var read = this.props.read; //阅读量
        var favorite = this.props.favorite; //收藏量
        var renderViewAndStar = null;
        if(typeof read !=='undefined' && typeof favorite !=='undefined'){
            renderViewAndStar = this._renderViewAndStar(read, favorite);
        }

        return <View style={styles.container}>
            <View style={styles.fullScreenStyle}>
                <Text style={styles.subject}>
                    {subject}
                </Text>
                {renderViewAndStar}
                <View style={styles.lineStyle}></View>
                {this.loadHtml()}
            </View>
            {this._renderShareView()}
        </View>
    }

    //加载WebView
    loadHtml(){
        let htmlUri = app.apiUrl + "kb/knowledge/html?id=" + this.state.topicId;
        //console.log(htmlUri);
        return (<WebView
            style={[styles.webViewContainer,{flex:1}]}
            source={{uri: htmlUri}}
            onNavigationStateChange={this.onNavigationStateChange}
            domStorageEnabled={true}
            javaScriptEnabled={true}
            //decelerationRate="normal"
            startInLoadingState={true}
        />);
    }

}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        backgroundColor: '#fff',
        width: device.width(),
        height: device.height(),
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    webViewContainer: {
        //flex:5,
        backgroundColor: 'rgb(240,240,240)',
        width: device.width(),
        //height:600,
    },
    rightContainer: {
        flex: 1,
        justifyContent: 'center',
        marginRight: 20,
        flexDirection: 'row',
    },
    bottomCenter: {
        justifyContent: 'center',
    },
    tipsBottom: {
        marginLeft: 20
    },
    subject: {
        justifyContent: 'center',
        textAlign:'center',
        marginLeft: 14,
        fontFamily: 'PingFang SC',
        fontSize: 25,
        color:'rgb(0,0,0)'
    },
    lineStyle: {
        width:device.width(),
        height:1,
        borderTopColor: '#f5f5f5',
        borderTopWidth: 1,
        //backgroundColor:'blue',
    },
    msgOverView: {
        alignSelf: 'flex-end',
        marginRight: 30,
        marginBottom: 7
    },
    msgOver: {
        flexDirection: 'row',
    },
    msgOverText: {
        marginLeft: 5,
        fontSize: 11,
        fontFamily: 'PingFang SC',
        color: 'rgb(204,204,204)'
    },
    msgOverImg: {
        width: 10,
        height: 8
    },
    msgOverImgView: {
        justifyContent: 'center'
    },

    //分享界面样式
    fullScreenStyle:{
        position: 'absolute',
        left: 0,
        top: 0,
        width: device.width(),
        height: device.height() - 50,
        justifyContent: "center",
    },
    bottomContainer: {
        width: device.width(),
        backgroundColor: 'white',
        //justifyContent: 'space-between',
        height: SelfHeight,
        paddingVertical: 10,
        marginBottom: -SelfHeight+50,
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

module.exports = Content;