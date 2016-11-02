/**
 * Created by linys on 16/10/10.
 */

import React, {Component} from 'react';
import {View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    ScrollView} from 'react-native';
import device from '../../../common/util/device';


class Topic extends Component {
    constructor(props) {
        super(props);
    }

    _renderViewAndStar(msgOverView, msgOverStar){
        return (
            <View style={[styles.msgOverView, styles.msgOver]}>
                <View style={styles.msgOver}>
                    <View style={styles.msgOverImgView}>
                        <Image source={require('../img/view_count.png')} style={styles.msgOverImg}
                               resizeMode='stretch'/>
                    </View>
                    <Text style={styles.msgOverText}>{msgOverView}</Text>
                </View>
                <View style={[styles.msgOver, {marginLeft: 20}]}>
                    <View style={styles.msgOverImgView}>
                        <Image source={require('../img/zan_count.png')} style={styles.msgOverImg}
                               resizeMode='stretch'/>
                    </View>
                    <Text style={styles.msgOverText}>{msgOverStar}</Text>
                </View>
            </View>
        );

    }

    render() {
        return <View style={styles.container}>
            {/*<View style={styles.title}>
                <View>
                    <Text style={[styles.titleText, {color: 'rgb(255,122,162)', fontSize: 15}]}>文章推荐</Text>
                </View>
            </View>*/}
            <View style={styles.body}>
                <Image source={require('../img/topic_top.png')} style={styles.img} />
                <TouchableOpacity style={{marginRight: 0, flex: 1}}>
                    <Text style={styles.listViewContentTitleTop}>提升幸福感的营养餐</Text>
                    <Text style={styles.listViewContentTop} ellipsizeMode='tail'>怀孕期间吃点什么好,水果蔬菜,哪些家常菜又营养又好做...</Text>
                </TouchableOpacity>
                {this._renderViewAndStar(856,320)}
                <View style={{borderTopWidth: 1, borderTopColor: '#ededed'}}>
                    <TouchableOpacity style={styles.listView}>
                        <Image source={require('../img/topic_01.png')} style={styles.listViewImg}/>
                        <View style={{marginRight: 0, flex: 1}}>
                            <Text style={styles.listViewContentTitle}>孕期到底要不要补钙</Text>
                            <Text style={styles.listViewContent} ellipsizeMode='tail'>孕期到底要不要补钙?宝妈们孕期都有吃钙片吗?有的人说孕期不能一直补钙要不...</Text>
                        </View>
                    </TouchableOpacity>
                    {this._renderViewAndStar(843,312)}
                </View>
                <View style={{borderTopWidth: 1, borderTopColor: '#ededed'}}>
                    <TouchableOpacity style={styles.listView}>
                        <Image source={require('../img/topic_02.png')} style={styles.listViewImg}/>
                        <View style={{marginRight: 0, flex: 1}}>
                            <Text style={styles.listViewContentTitle}>早期营养太任性，慢性疾病多烦恼</Text>
                            <Text style={styles.listViewContent} ellipsizeMode='tail'>当孩子长大后遇到营养过剩环境时,在营养不良的发育阶段所建立的代谢反应...</Text>
                        </View>
                    </TouchableOpacity>
                    {this._renderViewAndStar(587,5)}
                </View>
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        //marginTop: 10,
        width: device.width()
    },
    title: {
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#fff'
    },
    titleText: {
        fontFamily: 'PingFang SC',
        lineHeight: 20
    },
    body: {
        flex: 1,
        //marginTop: 1,
        backgroundColor: '#fff',
        width: device.width()
    },
    img: {
        width: device.width(),
        height: device.width()/2
    },
    listView: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 6
    },
    listViewImg: {
        width: device.width()/3,
        height: 110,
        marginRight: 15
    },
    listViewContentTitleTop: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        fontSize: 15,
        fontFamily: 'PingFang SC',
        color: 'rgb(0,0,0)'
    },
    listViewContentTitle: {
        paddingTop: 7,
        paddingBottom: 7,
        fontSize: 15,
        fontFamily: 'PingFang SC',
        color: 'rgb(0,0,0)'
    },
    listViewContentTop: {
        paddingBottom: 7,
        paddingLeft: 15,
        fontSize: 13,
        color: 'rgb(146,146,146)',
        lineHeight: 20
    },
    listViewContent: {
        paddingBottom: 7,
        fontSize: 13,
        color: 'rgb(146,146,146)',
        lineHeight: 20
    },
    msgOverView: {
        alignSelf: 'flex-end',
        marginRight: 30,
        marginBottom: 10
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
    }

});

module.exports = Topic;