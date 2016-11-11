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
    constructor(props) {
        super(props);
        this.state = {
            initWeek : this.props.initWeek, //初始化周数
            selWeek : this.props.initWeek,  //用户选中的周数
            webView: null, //WebView组件
        };

        this.props.iNavBar(this, {right: this._navRight.bind(this)})
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
            subject: "宝宝成长"+week+"周",
            html:true,
        };
        apiHttp.apiPost('/kb/knowledge/find', params, (result)=>  {
                if (result.code === 0) {
                    let uri = app.apiUrl + "kb/knowledge/html?id=" + result.data.id+"&&css=glossary";;
                    //渲染WebView
                    this.setState({
                        selWeek: week,
                        webView: this.loadHtml(uri),
                    });
                } else {
                    console.log(result);
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

    render() {
        return (
            <View style={{flex:1}}>
                <WeekTab ref="weekTab" week={this.state.selWeek} switchTab={week=>this.loadBabyHtml(week)}/>
                {this.state.webView}
            </View>
        );

    }

    _navRight(route, navigator, index) {
        return <View style={styles.rightContainer}>
            <TouchableOpacity>
                <Image source={require('../img/share.png')} style={{width: 21, height: 21}} resizeMode='stretch'/>
            </TouchableOpacity>
        </View>
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
        marginRight: 15,
        justifyContent: 'center',
    },
})

const {connect} = require('react-redux');
module.exports = connect()(BabyGrow);