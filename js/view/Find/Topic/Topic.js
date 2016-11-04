/**
 * Created by linys on 16/10/10.
 */

import React, {Component, PropTypes} from 'react';
import ViewPager from 'react-native-viewpager';
import {View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    ScrollView,
    Alert} from 'react-native';
import {device, http, app} from '../../../common/util';
import {navPush} from '../../../components/Nav/Nav';
import Content from '../Content/Content';


//推荐文章列表封装
class Topic extends Component {

    // 默认属性
    static defaultProps = {
        pageSize: 10,//分页数量
    }

    // 属性类型
    static propTypes = {
        pageSize: PropTypes.number,
    }


    constructor(props) {
        super(props);

        var dataSource = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2,
        });

        var IMGS = [
            app.apiUrl + '/kb/98测试数据/00测试推荐文章/00怀孕早期注意事项..md/image.png',
            'https://images.unsplash.com/photo-1441742917377-57f78ee0e582?h=1024',
            'https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?h=1024',
            'https://images.unsplash.com/photo-1441448770220-76743f9e6af6?h=1024',
            'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?h=1024',
            'https://images.unsplash.com/photo-1441126270775-739547c8680c?h=1024',
            'https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?h=1024',
            'https://images.unsplash.com/photo-1440847899694-90043f91c7f9?h=1024'];

        this.state = {
            days:60,
            pageNum:1,//初始化第一页
            topicList: null, //推荐文章列表
            dataSource: dataSource.cloneWithPages(IMGS), //滚动文章
            pageNow: 0,
            pageSum: IMGS.length,
        };
        this.toTopicDetail = this.toTopicDetail.bind(this);

    }

    componentWillMount() {
        console.log('---componentWillMount---');
        let params = {
            day: this.state.days,
            pageNum: this.state.pageNum,
            pageSize: this.props.pageSize
        };
        //根据孕期请求文章推荐
        http.apiPost('/kb/knowledge/query', params, (result)=> {
                if (result.code == 0) {
                    console.log(result);
                    // result.data.list.map((val, index)=>{
                        //console.log(val);
                    //});
                    //设置获取推荐文章列表
                    this.setState({
                        topicList: result.data.list
                    });
                } else {
                    Alert.alert("系统提示", result.message);
                }
            }, (err)=> {
                Alert.alert("系统提示", err);
            }
        )
    }

    _renderPage(data) {
        return (
            <Image source={{uri: data}} style={styles.scrollPages} />
        );
    }

    //跳转文章详细信息
    toTopicDetail(topicId, subject){
        //Alert.alert(topicId);
        navPush.push(this.props, Content, subject, {topicId: topicId});
    }

    //渲染文章列表
    _renderToipcList(topicList){
        if(topicList === null){
            return;
        }
        return topicList.map((val, index) => {
            return <View style={{flex: 1,borderTopWidth: 1, borderTopColor: '#ededed'}} key={index}>
                {this._renderTitleAndSummary(val.subject, val.summary, val.thumbnail, val.id)}
                {this._renderViewAndStar(val.read, val.favorite)}
            </View>
        });
    }


    _renderViewAndStar(read, favorite){
        return (
            <View style={[styles.msgOverView, styles.msgOver]}>
                <View style={styles.msgOver}>
                    <View style={styles.msgOverImgView}>
                        <Image source={require('../img/view_count.png')} style={styles.msgOverImg}
                               resizeMode='stretch'/>
                    </View>
                    <Text style={styles.msgOverText}>{read}</Text>
                </View>
                <View style={[styles.msgOver, {marginLeft: 20}]}>
                    <View style={styles.msgOverImgView}>
                        <Image source={require('../img/zan_count.png')} style={styles.msgOverImg}
                               resizeMode='stretch'/>
                    </View>
                    <Text style={styles.msgOverText}>{favorite}</Text>
                </View>
            </View>
        );
    }

    _renderTitleAndSummary(subject, summary, thumbnail, topicId){

        //摘要裁剪处理
        if(typeof summary ==='string' && summary != '' && summary.length > 50){
            summary = summary.substr(1, 46)+'......';
        }

        return (
            <TouchableOpacity style={styles.listView} onPress={()=>this.toTopicDetail(topicId, subject)}>
                <Image source={thumbnail?{uri: app.apiUrl+thumbnail}:require('../img/topic_01.png')} style={styles.listViewImg}/>
                <View style={{marginRight: 0, flex: 1}}>
                    <Text style={styles.listViewContentTitle}>{subject}</Text>
                    <Text style={styles.listViewContent} ellipsizeMode='tail'>{summary}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        //console.log('---render---' + this.state.topicList);
        return <View style={styles.container}>
            <ViewPager
                ref={(viewpager) => {this.viewpager = viewpager}}
                style={this.props.style}
                dataSource={this.state.dataSource}
                renderPage={this._renderPage}
                isLoop={false}
                autoPlay={false}/>
            <TouchableOpacity style={styles.topView} onPress={() => {
                if(this.state.pageNow === this.state.pageSum - 1){
                    this.state.pageNow = 0;
                } else {
                    this.state.pageNow = this.state.pageNow + 1;
                }
                this.viewpager.goToPage(this.state.pageNow);
            }}>
                <Text style={styles.listViewContentTitleTop}>提升幸福感的营养餐</Text>
                <Text style={styles.listViewContentTop} ellipsizeMode='tail'>怀孕期间吃点什么好,水果蔬菜,哪些家常菜又营养又好做...</Text>
                {this._renderViewAndStar(600, 60)}
            </TouchableOpacity>
            {this._renderToipcList(this.state.topicList)}
        </View>
    }

}

const styles = StyleSheet.create({
    container: {
        width: device.width(),
        backgroundColor: '#fff',
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
    listView: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 15,
        marginLeft: 15,
        marginRight: 10,
        marginBottom: 6
    },
    listViewImg: {
        width: device.width()/3,
        height: 110,
        marginRight: 15
    },
    listViewContentTitleTop: {
        marginTop: 35,
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
    },
    scrollPages: {
        width: device.width(),
        height: device.width()/2,
    },
    topView: {
        //marginRight: 0,
    },

});

module.exports = Topic;