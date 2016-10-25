/**
 * Created by linys on 16/10/13.
 */

import React, {Component} from 'react';
import {StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Image,
    WebView,
    Alert} from 'react-native';
import device from '../../../common/util/device';
import TouchAble from './Content/TouchAble'
import WeekTab from '../WeekTab/WeekTab'
import {home, find} from '../../../actions';
import apiHttp from '../../../common/util/http';
import app from '../../../common/util/app';

class BabyGrow extends Component {

    // 默认属性
    static defaultProps = {
    }

    // 属性类型
    static propTypes = {
    }

    constructor(props) {
        console.log('---BabyGrow---0.constructor------');
        super(props);
        this.state = {
            initWeek : 8, //初始化周数
            selWeek : 0,  //用户选中的周数
            webView: null, //WebView组件
        };
    }

    componentWillMount() {
        console.log('---BabyGrow---1.componentWillMount------');
        this.props.dispatch(find.navShare(this.navBarRightBottom()));
        //初始化加载
        this.loadBabyHtml(this.state.initWeek);
    }

    componentDidMount() {
        console.log('---BabyGrow---3.componentDidMount------');
        this.props.dispatch(home.hideMenu(true));
    }

    componentWillUnmount() {
        this.props.dispatch(home.hideMenu(false));
        this.props.dispatch(find.navShare(null));
    }

    //加载文章
    loadBabyHtml(week){
        let params = {
            subject: "宝宝成长"+week+"周",
            html:true,
        };
        apiHttp.apiPost('/kb/knowledge/find', params, (result)=>  {
                if (result.code === 0) {
                    let uri = app.apiUrl + "kb/knowledge/html?id=" + result.data.id;
                    console.log('---BabyGrow---uri------'+uri);
                    //渲染WebView
                    this.setState({
                        webView: this.loadHtml(uri),
                    });
                } else {
                    console.log(result);
                    Alert.alert("系统提示", result.message);
                }
            }, (err)=> {
                Alert.alert("系统提示", err);
            }
        );
    }

    //加载WebView
    loadHtml(htmlUri){
        return (<WebView
            style={styles.webViewContainer}
            source={{uri: htmlUri}}
            onNavigationStateChange={this.onNavigationStateChange}
            startInLoadingState={true}
            domStorageEnabled={true}
            javaScriptEnabled={true} />);
    }

    navBarRightBottom() {
        return (
            <View style={styles.rightContainer}>
                <TouchableOpacity style={styles.bottomCenter}>
                    <Image source={require('../img/share.png')} style={{width: 21, height: 21}} resizeMode='stretch'/>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        console.log('---BabyGrow---2.render------');

        return (
            <View style={{flex:1}}>
                <WeekTab ref="weekTab" week={this.state.selWeek} switchTab={week=>this.loadBabyHtml(week)}/>
                {this.state.webView}
            </View>
        );

    }
}

const styles = StyleSheet.create({
    webViewContainer: {
        flex:1,
        backgroundColor: 'rgb(240,240,240)',
        width: device.width(),
        //borderWidth: 1,
        //borderColor: 'green',
        //backgroundColor: '#00ff00',
    },
    rightContainer: {
        flex: 1,
        justifyContent: 'center',
        marginRight: 20,
        flexDirection: 'row',
    },
    bottomCenter: {
        justifyContent: 'center'
    },
})

const {connect} = require('react-redux');

module.exports = connect()(BabyGrow);