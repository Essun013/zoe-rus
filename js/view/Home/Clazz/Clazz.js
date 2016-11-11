/**
 * Created by ianchen on 16/10/10.
 */

import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity, Alert} from 'react-native';
import {device, http, app} from '../../../common/util';
import Content from '../../Find/Content/Content'
import {navPush} from '../../../components/Nav/Nav';

class Clazz extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: null
        };

        this.query(props.totalDay);
    }

    query(totalDay) {
        let params = {
            pageSize: 5,
            pageNum: 1,
            day: totalDay,
            classify: '名词解释'
        }

        http.apiPost('/kb/knowledge/query', params, (data) => {
            if (data.code == 0) {
                if (data.data.count)
                    this.setState({list: this.renderList(data.data.list)})
                else
                    this.setState({list: this.renderList([])})
            } else {
                this.setState({list: this.renderList([])})
            }
        })
    }

    componentWillReceiveProps(props) {
        this.query(props.totalDay);
    }

    detail(id, title, read, favorite) {
        let topicDetailInfo = {
            topicId: id,
            subject: title,
            read: read,
            favorite: favorite,
        }
        navPush.push(this.props, Content, "内容详情", topicDetailInfo);
    }

    renderList(list) {
        let style = {borderTopWidth: 1, borderTopColor: '#ededed'};

        return (
            <View style={styles.body}>
                {
                    list && list.length > 0 ? list.map((l, i) => {
                        return (
                            <TouchableOpacity activeOpacity={0.6} key={i} style={[i && style]} onPress={() => {this.detail(l.id, l.subject, l.read, l.favorite)}}>
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
                                        <Text style={styles.msgOverText}>{l.read}</Text>
                                    </View>
                                    <View style={[styles.msgOver, {marginLeft: 20}]}>
                                        <View style={styles.msgOverImgView}>
                                            <Image source={require('../img/collection.png')} style={styles.msgOverImg}
                                                   resizeMode='stretch'/>
                                        </View>
                                        <Text style={styles.msgOverText}>{l.favorite}</Text>
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