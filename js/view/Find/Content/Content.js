/**
 * Created by linys on 2016/11/4.
 */
import React, {Component, PropTypes} from 'react';
import {View,
    StyleSheet,
    Image,
    Text,
    WebView,
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
            javaScriptEnabled={true} />);
    }

    render() {
        return <View style={styles.container}>
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
        flex:1,
        backgroundColor: 'rgb(240,240,240)',
        width: device.width(),
    },


});

module.exports = Content;