/**
 * Created by ianchen on 16/10/10.
 */

import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity, Alert} from 'react-native';
import {device, http, app} from '../../../common/util';
import {navPush} from '../../../components/Nav/Nav'

class Clazz extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: null
        }

        let params = {
            pageSize: 2,
            pageNum: 1,
            day: this.props.totalDay,
            classify: '名词解释'
        }

        http.apiPost('/kb/knowledge/query', params, (data) => {
            if (data.count)
                this.setState({list: this.renderList(data.list)})
            else
                this.setState({list: this.renderList([])})
        })
    }

    detail(id) {

    }

    renderList(list) {
        /*let _list = [
            {
                title: '吃什么对胎儿头发好？',
                content: '想要宝贝以后头发长得好，准妈妈们从孕期就需要补充营养，比如维生素......',
                img: require('../img/ketang1.png'),
                over: 56,
                collect: 56,
            },
            {
                title: '吃什么对胎儿头发好？',
                content: '想要宝贝以后头发长得好，准妈妈们从孕期就需要补充营养，比如维生素......',
                img: require('../img/ketang2.png'),
                over: 56,
                collect: 56,
            },
        ];*/

        /*list.map((l, i) => {
            _list[i].title = l.subject || _list[i].title;
            _list[i].img = l.thumbnail ? {uri: app.apiUrl + l.thumbnail} : _list[i].img;
            _list[i].content = l.summary || _list[i].content;
        });*/

        let style = {borderTopWidth: 1, borderTopColor: '#ededed'};

        return (
            <View style={styles.body}>
                {
                    list ? list.map((l, i) => {
                        return (
                            <TouchableOpacity activeOpacity={0.6} key={i} style={[i && style]} onPress={() => {this.detail(l.id)}}>
                                <View style={styles.listView}>
                                    <Image source={l.thumbnail ? {uri: app.apiUrl + l.thumbnail} : require('../img/ketang1.png')} style={styles.listViewImg}/>
                                    <View style={{marginRight: 0, flex: 1}}>
                                        <Text style={styles.listViewContentTitle}>{l.subject}</Text>
                                        <Text style={styles.listViewContent} ellipsizeMode='tail'
                                              numberOfLines={2}>{l.summary || '还没有摘要说明哦~'}</Text>
                                    </View>
                                </View>
                                <View style={[styles.msgOverView, styles.msgOver]}>
                                    <View style={styles.msgOver}>
                                        <View style={styles.msgOverImgView}>
                                            <Image source={require('../img/over.png')} style={styles.msgOverImg}
                                                   resizeMode='stretch'/>
                                        </View>
                                        <Text style={styles.msgOverText}>{l.over || 56}</Text>
                                    </View>
                                    <View style={[styles.msgOver, {marginLeft: 20}]}>
                                        <View style={styles.msgOverImgView}>
                                            <Image source={require('../img/collection.png')} style={styles.msgOverImg}
                                                   resizeMode='stretch'/>
                                        </View>
                                        <Text style={styles.msgOverText}>{l.collect || 56}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }) : <View style={{flex: 1, height: 80, justifyContent: 'center', alignItems: 'center'}}><Text
                        style={{color: 'rgb(166,166,166)'}}>暂无数据哦</Text></View>
                }
            </View>
        )
    }

    render() {
        return <View style={styles.container}>
            <View style={styles.title}>
                <View>
                    <Text style={[styles.titleText, {color: 'rgb(255,122,162)', fontSize: 15}]}>妈妈课堂</Text>
                </View>
            </View>
            {this.state.list}
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        width: device.width()
    },
    title: {
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    titleText: {
        fontFamily: 'PingFang SC',
        lineHeight: 20,
    },
    titleBotton: {
        position: 'absolute',
        right: 15,
    },
    body: {
        flex: 1,
        marginTop: 1,
        backgroundColor: '#fff',
        width: device.width()
    },
    buttonView: {
        marginTop: 15,
        marginBottom: 15,
        width: device.width() / 4
    },
    buttonImgSize: {
        width: 46,
        height: 46,
        marginBottom: 14
    },
    buttonTextCenter: {
        alignItems: 'center'
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
        width: 90,
        height: 60,
        marginRight: 15
    },
    listViewContentTitle: {
        marginBottom: 15,
        fontSize: 15,
        fontFamily: 'PingFang SC',
        marginTop: -2,
        color: 'rgb(0,0,0)'
    },
    listViewContent: {
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
        height: 8,
    },
    msgOverImgView: {
        justifyContent: 'center'
    }
});

module.exports = Clazz;