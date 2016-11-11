/**
 * Created by linys on 2016/11/4.
 */
import React, {Component, PropTypes} from 'react';
import {View,
    StyleSheet,
    Image,
    Text,
    ScrollView,
    WebView,
    TouchableOpacity,
    Alert} from 'react-native';
import {device, http, app} from '../../../common/util';
import {navPush} from '../../../components/Nav/Nav';

//外壳用来展示文章详细内容
class Content extends Component {

    constructor(props) {
        super(props);
        this.state = {
            topicId: this.props.topicId, //文章Id
        };

        this.onNavigationStateChange = this.onNavigationStateChange.bind(this);

    }

    //加载WebView
    loadHtml(){
        let htmlUri = app.apiUrl + "kb/knowledge/html?id=" + this.state.topicId;
        //console.log(htmlUri);
        return (<WebView
            style={styles.webViewContainer}
            source={{uri: htmlUri}}
            onNavigationStateChange={this.onNavigationStateChange}
            domStorageEnabled={true}
            javaScriptEnabled={true}
            //decelerationRate="normal"
            startInLoadingState={true}
        />);
    }

    _navRight(route, navigator, index, navState) {
        return <View style={styles.rightContainer}>
            <TouchableOpacity style={styles.bottomCenter} onPress={()=>Alert.alert('收藏')}>
                <Image source={require('../../Home/img/search.png')} style={{width: 21, height: 21}} resizeMode='stretch'/>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.bottomCenter, styles.tipsBottom]} onPress={()=>Alert.alert('分享')}>
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
        var read = this.props.read; //阅读
        var favorite = this.props.favorite; //收藏
        var renderViewAndStar = null;
        if(read && favorite){
            renderViewAndStar = this._renderViewAndStar(read, favorite);
        }

        return <View style={styles.container}>
            <View>
                <Text style={styles.subject}>
                    {subject}
                </Text>
            </View>
            {renderViewAndStar}
            <View style={styles.lineStyle}></View>
            {this.loadHtml()}
        </View>
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: device.width()
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


});

module.exports = Content;