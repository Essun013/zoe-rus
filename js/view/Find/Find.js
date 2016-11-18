/**
 * Created by ianchen on 16/10/8.
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
    Alert,
    ListView,
    RefreshControl} from 'react-native';
import {Box} from './Box';
import {home} from '../../actions';
import {navPush} from '../../components/Nav/Nav';
import LoadingComponent from '../../components/Loading/LoadingComponent';
import Search from '../Search/Search'
import {device, http, app} from '../../common/util';
import Content from './Content/Content';
import {homeUtil} from '../Home/Home'

var count=0;//文章总数
var loadedCount=0;//当前加载文章条数
var topics;

class Find extends Component {
    // 默认属性
    static defaultProps = {
        pageSize: 5, //分页数量
        topImgPageSize: 5, //滚动文章显示的图片数

    }

    // 属性类型
    static propTypes = {
        pageSize: PropTypes.number,
        topImgPageSize: PropTypes.number,
    }

    constructor(props) {
        super(props);

        let days = 60; //怀孕天数可变的
        homeUtil.getInfo((d) => {
            if (d) {
                days = d.totalDays;
            }
        })

        this.state = {
            days:days,
            topicList: new ListView.DataSource({ //现实的数据源，一个是ListView
                rowHasChanged: (r1, r2) => r1 !== r2,
            }), //推荐文章列表
            topicLoaded: 0,
            pageNum: 1,//第几页
            pageSum: 0,//总条数

            topImgList: new ViewPager.DataSource({ //现实的数据源，一个是ViewPager
                pageHasChanged: (p1, p2) => p1 !== p2,
            }), //滚动文章
            topImgPageNow:0,//选中的图片
            topImgPageSum:0,//总播放的图片数
            topTopicInfo:[],
            topSubject: ' ',
            topSummary: ' ',
            topRead: 0,
            topFavorite: 0,

            isRefreshing: false, //下拉
            isLoad: false,
            isLoadMore: false,   //上拉

        };
        this.toSearchKb = this.toSearchKb.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.toTopicDetail = this.toTopicDetail.bind(this);
        this.onChangeViewPager = this.onChangeViewPager.bind(this);
        this.loadMore = this.loadMore.bind(this);

        //导航栏
        this.props.iNavBar(this, {right: this._navRight.bind(this)});

    }

    toSearchKb() {
        navPush.push(this.props, Search, '搜索');
        //Alert.alert('你点击了搜索!');
    }

    componentWillMount() {
        //console.log('---componentWillMount---');
        this.loadTopImageAndTopics();//回掉的时候再调用this.onRefresh();
    }

    componentWillUnMount(){
        console.log('---componentWillUnMount---');
    }

    _navRight(route, navigator, index) {
        return <View style={styles.rightContainer}>
            <TouchableOpacity style={styles.bottomCenter} onPress={this.toSearchKb}>
                <Image source={require('../Home/img/search.png')} style={{width: 21, height: 21}} resizeMode='stretch'/>
            </TouchableOpacity>
        </View>
    }

    //加载顶部滚动图片和文章
    loadTopImageAndTopics(){
        let params = {
            day: this.state.days,
            pageNum: 1,
            pageSize: this.props.topImgPageSize,
            image: true,
        };
        //根据孕期请求文章推荐(顶部滚动图片文章现实)
        http.apiPost('/kb/knowledge/query', params, (result)=> {
                if (result.code == 0) {
                    //console.log(result);
                    //遍历结果构造出要显示的IMGS
                    let IMGS = [];
                    let topTopicInfo = [];
                    result.data.list.map((val, index)=>{
                        if(typeof val.image !== 'undefined'){
                            IMGS.push(app.apiUrl + val.image);
                            topTopicInfo.push({
                                topTopicId:val.id,
                                topSubject:val.subject,
                                topSummary:val.summary,
                                topRead:val.read,
                                topFavorite:val.favorite,
                            });
                        }
                    });
                    delete params.image;
                    //根据孕期请求文章推荐
                    http.apiPost('/kb/knowledge/query', params, (result)=> {
                            if (result.code == 0) {
                                this.count = result.data.count;
                                this.topics = [0].concat(result.data.list); //第一个坑预留给ViewPager
                                //console.log("loadTopImageAndTopics获取文章成功！" + this.topics.length);
                                this.loadedCount = result.data.list.length;
                                //设置获取推荐文章列表
                                this.setState({
                                    topImgList: this.state.topImgList.cloneWithPages(IMGS),
                                    topImgPageSum: IMGS.length,
                                    topicList: this.state.topicList.cloneWithRows(this.topics),
                                    pageNum: 2,
                                    isLoad: true,
                                    isRefreshing: false,
                                    topTopicInfo: topTopicInfo,
                                    topSubject: topTopicInfo[this.state.topImgPageNow].topSubject,
                                    topSummary: topTopicInfo[this.state.topImgPageNow].topSummary.length>28?
                                        topTopicInfo[this.state.topImgPageNow].topSummary.substr(1, 25)+'...':topTopicInfo[this.state.topImgPageNow].topSummary,
                                    topRead: topTopicInfo[this.state.topImgPageNow].topRead,
                                    topFavorite: topTopicInfo[this.state.topImgPageNow].topFavorite,
                                });
                            } else {
                                Alert.alert("系统提示", result.message);
                            }
                        }, (err)=> {
                            //Alert.alert("系统提示", err);
                            console.log('请求/kb/knowledge/query出错||' + err);
                        }
                    );

                } else {
                    Alert.alert("系统提示", result.message);
                }
            }, (err)=> {
                //Alert.alert("系统提示", err);
                console.log('请求/kb/knowledge/query true出错||' + err);
            }
        )
    }

    //下拉刷新
    onRefresh() {
        this.setState({
            isRefreshing: true,
        });
        setTimeout(() => {this.loadTopImageAndTopics()}, 1000);
        /*setTimeout(() => {
            let paramsContent = {
                day: this.state.days,
                pageNum: 1,
                pageSize: this.props.pageSize,
            };
            //根据孕期请求文章推荐
            http.apiPost('/kb/knowledge/query', paramsContent, (result)=> {
                    if (result.code == 0) {
                        console.log("下拉刷新重新获取文章成功！" + result.data.list);
                        this.count = result.data.count;
                        this.topics = [this.state.topImgPageNow].concat(result.data.list);
                        this.loadedCount = result.data.list.length;
                        //设置获取推荐文章列表
                        this.setState({
                            topicList: this.state.topicList.cloneWithRows(this.topics),
                            pageNum: 1,
                            isRefreshing: false,
                        });
                    } else {
                        Alert.alert("系统提示", result.message);
                    }
                }, (err)=> {
                    //Alert.alert("系统提示", err);
                    console.log('请求/kb/knowledge/query出错||' + err);
                }
            );
        }, 1000);*/
    }

    //加载更多文章
    loadMore(){
        console.log('loadMoreFun...total:'+this.count+'...loadedCount:'+this.loadedCount);
        if(this.count <= this.loadedCount){
            //原则上加载到最大数便不再加载文章了！
            this.setState({isLoadMore: false});
            return ;
        }
        this.setState({isLoadMore: true});
        setTimeout(() => {
            let paramsContent = {
                day: this.state.days,
                pageNum: this.state.pageNum,
                pageSize: this.props.pageSize,
            };
            //根据孕期请求文章推荐
            http.apiPost('/kb/knowledge/query', paramsContent, (result)=> {
                    if (result.code == 0) {
                        this.topics = this.topics.concat(result.data.list);
                        this.loadedCount = (this.state.pageNum===1)? result.data.list.length:
                            (this.state.pageNum-1) * this.props.pageSize + result.data.list.length;
                        console.log('上拉分页获取文章成功！' + this.loadedCount);
                        console.log('当前pageNum:' + (this.state.pageNum));
                        //设置获取推荐文章列表
                        this.setState({
                            topicList: this.state.topicList.cloneWithRows(this.topics),
                            pageNum: this.state.pageNum + 1,
                            isLoadMore: false,
                        });
                    } else {
                        Alert.alert("系统提示", result.message);
                    }
                }, (err)=> {
                    //Alert.alert("系统提示", err);`
                    console.log('请求/kb/knowledge/query出错||' + err);
                }
            );
        }, 500);
    }

    //渲染文章列表
    _renderToipcList(val, sectionId, index){
        //console.log('_renderToipcList.......' + index);
        if(index === '0'){
            return this._readerViewPager();
        } else {
            return <View style={{flex: 1,borderTopWidth: 1, borderTopColor: '#ededed'}} >
                {this._renderTitleAndSummary(val.subject, val.summary, val.thumbnail, val.id, val.read, val.favorite)}
                {this._renderViewAndStar(val.read, val.favorite)}
            </View>;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {/*<ScrollView style={{flex:1}} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={this.onRefresh}
                                title= {'加载数据中...'}
                                tintColor='rgb(146,146,146)'
                                //enabled={this.props.needRefresh}
                                colors={['rgb(146,146,146)']}
                                progressBackgroundColor="#ffffff"
                            />
                        } >
                </ScrollView>*/}

                <View style={{height:device.height() - 106,width:device.width()}}>
                    <ListView contentContainerStyle={{}}
                          dataSource={this.state.topicList}
                          renderRow={(row, sectionId, index) => this._renderToipcList(row, sectionId, index)}
                          //renderFooter={this.renderFooter}
                          //onScroll={()=>{this.props.dispatch(home.hideMenu(true))}}
                          onEndReached={this.loadMore}
                          onEndReachedThreshold={1}
                          refreshControl={this.renderTopicRefresh()}
                    />
                </View>
            </View>
        )
    }

    _readerViewPager(){
        //if(this.state.topTopicInfo.length === 0) {
        //    return null;
        //}
        console.log('_readerViewPager.......');
        //let topSubject = this.state.topTopicInfo[this.state.topImgPageNow+1].topSubject;

        return (<View>
            <ViewPager
                ref={(viewpager) => {this.viewpager = viewpager}}
                dataSource={this.state.topImgList}
                renderPage={this._renderImagePage.bind(this)}
                onChangePage={this.onChangeViewPager}
                isLoop={true}
                autoPlay={true}
                locked={true}
            />
                <TouchableOpacity style={styles.topView} onPress={() => {
                    //跳转文章详情的基本信息
                    let topicDetailInfo = {
                        topicId:this.state.topTopicInfo[this.state.topImgPageNow].topTopicId,
                        subject:this.state.topTopicInfo[this.state.topImgPageNow].topSubject,
                        read:this.state.topTopicInfo[this.state.topImgPageNow].topRead,
                        favorite:this.state.topTopicInfo[this.state.topImgPageNow].topFavorite,
                    }
                    this.toTopicDetail(topicDetailInfo);
                }}>
                <Text style={styles.listViewContentTitleTop}>{this.state.topSubject}</Text>
                <Text style={styles.listViewContentTop} ellipsizeMode='tail'>{this.state.topSummary}</Text>
                {this._renderViewAndStar(this.state.topRead, this.state.topFavorite)}
            </TouchableOpacity>
         </View>);
    }
    onChangeViewPager(){
        //console.log('改变大图了！' + this.topics[0]);
        //console.log('this.state.topImgPageNow=' + this.state.topImgPageNow);
        if(this.state.topImgPageNow === this.state.topImgPageSum - 1){
            this.state.topImgPageNow = 0;
        } else {
            this.state.topImgPageNow = this.state.topImgPageNow + 1;
        }
        //this.viewpager.goToPage(this.state.topImgPageNow);
        let topSummary = this.state.topTopicInfo[this.state.topImgPageNow].topSummary.length>28?
            this.state.topTopicInfo[this.state.topImgPageNow].topSummary.substr(1, 25)+'...':this.state.topTopicInfo[this.state.topImgPageNow].topSummary;
        this.topics[0] = this.state.topImgPageNow;
        //状态改变重新渲染
        this.setState({
            topImgPageNow: this.state.topImgPageNow,
            topSubject: this.state.topTopicInfo[this.state.topImgPageNow].topSubject,
            topSummary: topSummary,
            topRead: this.state.topTopicInfo[this.state.topImgPageNow].topRead,
            topFavorite: this.state.topTopicInfo[this.state.topImgPageNow].topFavorite,
            topicList: this.state.topicList.cloneWithRows(JSON.parse(JSON.stringify(this.topics))),
            //topicList: this.state.topicList.cloneWithRows(this.topics),
        });
    }

    renderTopicRefresh(){
        return (
            <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this.onRefresh}
                title= {'加载数据中...'}
                tintColor='rgb(146,146,146)'
                //enabled={this.props.needRefresh}
                colors={['rgb(146,146,146)']}
                progressBackgroundColor="#ffffff"
            />
        );
        /*refreshControl={
         <RefreshControl
         refreshing={this.state.isRefreshing}
         onRefresh={this.onRefresh}
         tintColor="#12b7f5"
         enabled={true}
         title="加载数据中"
         colors={['#12b7f5']}
         progressBackgroundColor="#ffffff"
         />}*/
    }


    renderFooter() {
        if(this.state.isLoadMore){
             console.log('renderFooter...');
             return (
                 <View style={styles.appendLoading}>
                     <LoadingComponent text="加载中" />
                 </View>
            );
        }
        return null;
    }

    _renderImagePage(imgUri) {
        return (
            <TouchableOpacity onPress={()=>{
                //跳转文章详情的基本信息
                let topicDetailInfo = {
                    topicId:this.state.topTopicInfo[this.state.topImgPageNow].topTopicId,
                    subject:this.state.topTopicInfo[this.state.topImgPageNow].topSubject,
                    read:this.state.topTopicInfo[this.state.topImgPageNow].topRead,
                    favorite:this.state.topTopicInfo[this.state.topImgPageNow].topFavorite,
                }
                this.toTopicDetail(topicDetailInfo);
            }}>
                <Image source={{uri: imgUri}} style={styles.scrollPages} />
            </TouchableOpacity>
        );
    }

    //跳转文章详细信息
    toTopicDetail(topicDetailInfo){
        //Alert.alert(topicId);
        navPush.push(this.props, Content, "内容详情", topicDetailInfo);
    }

    _renderViewAndStar(read, favorite){
        return (
            <View style={[styles.msgOverView, styles.msgOver]}>
                <View style={styles.msgOver}>
                    <View style={styles.msgOverImgView}>
                        <Image source={require('./img/read_count.png')} style={styles.msgOverImg}
                               resizeMode='stretch'/>
                    </View>
                    <Text style={styles.msgOverText}>{read}</Text>
                </View>
                <View style={[styles.msgOver, {marginLeft: 20}]}>
                    <View style={styles.msgOverImgView}>
                        <Image source={require('./img/favorite_count.png')} style={styles.msgOverImg}
                               resizeMode='stretch'/>
                    </View>
                    <Text style={styles.msgOverText}>{favorite}</Text>
                </View>
            </View>
        );
    }

    _renderTitleAndSummary(subject, summary, thumbnail, topicId, read, favorite){
        //摘要裁剪处理
        if(typeof summary ==='string' && summary != '' && summary.length > 36){
            summary = summary.substr(1, 33)+'...';
        }

        //跳转文章详情的基本信息
        let topicDetailInfo = {
            topicId:topicId,
            subject:subject,
            read:read,
            favorite:favorite,
        }

        return (
            <TouchableOpacity style={styles.listView} onPress={()=>this.toTopicDetail(topicDetailInfo)}>
                <Image source={thumbnail?{uri: app.apiUrl+thumbnail}:require('./img/topic_01.png')} style={styles.listViewImg}/>
                <View style={{flex: 1}}>
                    <Text style={styles.listViewContentTitle}>{subject}</Text>
                    <Text style={styles.listViewContent} ellipsizeMode='tail'>{summary}</Text>
                </View>
            </TouchableOpacity>
        );
    }

}


const styles = StyleSheet.create({
    rightContainer: {
        flex: 1,
        justifyContent: 'center',
        marginRight: 20,
        flexDirection: 'row',
    },
    bottomCenter: {
        justifyContent: 'center',
    },

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
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 6,
        //backgroundColor: 'blue'
    },
    listViewImg: {
        width: device.width()/4,
        height: 70,
        marginRight: 15,
        borderRadius: 3,
    },
    listViewContentTitleTop: {
        marginTop: 20,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        fontSize: 15,
        fontFamily: 'PingFang SC',
        color: 'rgb(0,0,0)',
        //backgroundColor:'blue',
    },
    listViewContentTitle: {
        //paddingTop: 7,
        paddingBottom: 5,
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
        //paddingBottom: 7,
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
    appendLoading: {
        flex: 1,
        alignItems: 'center',
        height: 10,
        justifyContent: 'center'
    },

})

const {connect} = require('react-redux');
module.exports = connect()(Find);
