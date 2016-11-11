/**
 * Created by linys on 16/10/13.
 */

import React, {Component} from 'react';
import {StyleSheet,
    View,
    TouchableOpacity,
    Image,
    WebView,
    Alert} from 'react-native';
import device from '../../../common/util/device';
import WeekTab from '../WeekTab/WeekTab';
import apiHttp from '../../../common/util/http';
import {home, find} from '../../../actions';
import app from '../../../common/util/app';

class MomKnow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initWeek : this.props.initWeek, //初始化周数
            selWeek : this.props.initWeek,  //用户选中的周数
            webView : null, //WebView组件
        };
    }

    componentWillMount() {
        //初始化加载
        this.loadBabyHtml(this.state.initWeek);
    }

    componentDidMount() {
        this.props.dispatch(home.hideMenu(true));
    }

    componentWillUnmount() {
        this.props.dispatch(home.hideMenu(false));
    }

    //加载文章
    loadBabyHtml(week){
        let params = {
            subject: "孕妈早知道"+week+"周",
            html:true,
        };
        apiHttp.apiPost('/kb/knowledge/find', params, (result)=>  {
                if (result.code === 0) {
                    let uri = app.apiUrl + "kb/knowledge/html?id=" + result.data.id+"&&css=glossary";
                    //渲染WebView
                    this.setState({
                        selWeek: week,
                        webView: this.loadHtml(uri),
                    });
                } else {
                    Alert.alert("系统提示", result.message);
                }
            }, (err)=> {
                Alert.alert("系统提示", err.stack);
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


    _navRight(nav) {
        return (
            <View style={styles.rightContainer}>
                <TouchableOpacity style={styles.bottomCenter}>
                    <Image source={require('../img/share.png')} style={{width: 21, height: 21}} resizeMode='stretch'/>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
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
});

const {connect} = require('react-redux');
module.exports = connect()(MomKnow);