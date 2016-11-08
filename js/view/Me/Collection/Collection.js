/**
 * Created by sea35 on 2016/11/7.
 */
import React, {Component} from 'react';
import {ListView, RefreshControl,View,Text,StyleSheet} from 'react-native';
import {Provider, connect} from 'react-redux';
import List from '../../../components/List/List';
import ListItem from '../../../components/List/ListItem';
import device from '../../../common/util/device';

const moreText = "加载完毕";    //foot显示的文案
//页码
var pageNum = 1;
//每页显示数据的条数
const pageSize = 5;
//页面总数据数
var pageCount = 0;
//页面List总数据
var totalList = new Array();

//foot：  0 隐藏  1  已加载完成   2  显示加载中

class Collection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            hLoaded: 0,
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            }),
            loaded: false,//控制Request请求是否加载完毕
            foot:0,// 控制foot， 0：隐藏foot  1：已加载完成   2 ：显示加载中
            error:false,
        }
    }

    _onRefresh() {
        this.setState({isRefreshing: true});
        setTimeout(() => {
            // prepend 10 items
            this.setState({
                hLoaded: this.state.hLoaded + 5,
                isRefreshing: false,

            });
            totalList = new Array();
            pageNum = 1;
            this._fetchListData();
        }, 500);
    }
    componentWillMount() {
        this._fetchListData();
    }
    _fetchListData() {
        if(pageNum > 1){
            this.setState({loaded:true});
        }
        const datas = [
            {
                name: '就是美国大选投票日了',
                avatar_url: 'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg',
                subtitle: '就是美国大选投票日了，纽约市的气氛骤然紧张起来。时代广场前，美国广播公司（ABC）已占据地利、架好直播舞台'
            },
            {
                name: 'Chris Jackson',
                avatar_url: 'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg',
                subtitle: '就是美国大选投票日了，纽约市的气氛骤然紧张起来。时代广场前，美国广播公司（ABC）已占据地利、架好直播舞台'
            },
            {
                name: 'Chris Jackson',
                avatar_url: 'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg',
                subtitle: '就是美国大选投票日了，纽约市的气氛骤然紧张起来。时代广场前，美国广播公司（ABC）已占据地利、架好直播舞台'
            },
            {
                name: 'Chris Jackson',
                avatar_url: 'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg',
                subtitle: '就是美国大选投票日了，纽约市的气氛骤然紧张起来。时代广场前，美国广播公司（ABC）已占据地利、架好直播舞台'
            },
            {
                name: 'Chris Jackson',
                avatar_url: 'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg',
                subtitle: '就是美国大选投票日了，纽约市的气氛骤然紧张起来。时代广场前，美国广播公司（ABC）已占据地利、架好直播舞台'
            },
            {
                name: 'Chris Jackson',
                avatar_url: 'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg',
                subtitle: '就是美国大选投票日了，纽约市的气氛骤然紧张起来。时代广场前，美国广播公司（ABC）已占据地利、架好直播舞台'
            },
            {
                name: 'Chris Jackson',
                avatar_url: 'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg',
                subtitle: '就是美国大选投票日了，纽约市的气氛骤然紧张起来。时代广场前，美国广播公司（ABC）已占据地利、架好直播舞台'
            }]
        pageCount = datas.length;
        let list = datas;
        let  currentCount = list.length;
        if(currentCount < pageSize){
            //当当前返回的数据小于PageSize时，认为已加载完毕
            this.setState({ foot:1,moreText:moreText});
        }else{//设置foot 隐藏Footer
            this.setState({foot:0});
        }
        for (var i=0; i < list.length; i++) {
            totalList.push( list[i] );
        }

        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(totalList),
            loaded: true,
        });
        /*fetch(requestURL, {
            method: 'get',
            headers: headerObj,
        }).then(response =>{
            if (response.ok) {
                return response.json();
            } else {
                this.setState({error:true,loaded:true});
            }
        }).then(json=>{
            let responseCode = json.code;
            if (responseCode == 0) {
                let responseData = json.data;

                pageCount = responseData.count;
                let list = responseData.data;

                if (orderList == null) {
                    orderList = [];
                    currentCount = 0;
                } else {
                    currentCount = list.length;
                }
                if(currentCount < pageSize){
                    //当当前返回的数据小于PageSize时，认为已加载完毕
                    this.setState({ foot:1,moreText:moreText});
                }else{//设置foot 隐藏Footer
                    this.setState({foot:0});
                }
                for (var i=0; i < list.length; i++) {
                    totalList.push( list[i] );
                }

                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(totalList),
                    loaded: true,
                });
            }else{
                this.setState({error:true,loaded:true});
            }
        }).catch(function (error) {
            this.setState({error:true,loaded:true});
        });*/
    }
    _renderRow(rowData,SectionId,rowID){
        return (
            <ListItem 

                avatar={rowData.avatar_url} 
                key={rowID} 
                title={rowData.name} 
                subtitle={rowData.subtitle} 
                subtitleStyle={{flexWrap:'wrap'}}
                avatarStyle={{ 
                    width: 60, 
                    height: 60 
                }} 
            />
        )
    }
    _renderFooter() {
        if(this.state.foot === 1){//加载完毕
            return (
                <View style={{height:40,alignItems:'center',justifyContent:'flex-start',}}>
                    <Text style={{color:'#999999',fontSize:12,marginTop:10}}>
                        {this.state.moreText}
                    </Text>
                </View>);
        }else if(this.state.foot === 2) {//加载中
            return (
                <View style={{height:40,alignItems:'center',justifyContent:'center',}}>
                    {/*<Image source={{uri:loadgif}} style={{width:20,height:20}}/>*/}
                    <Text style={{color:'#999999',fontSize:12,marginTop:10}}>
                        {'正在加载中...'}
                    </Text>
                </View>);
        }
    }
    _endReached(){
        if(this.state.foot != 0 ){
            return ;
        }
        this.setState({
            foot:2,
        });
        this.timer = setTimeout(
            () => {
                pageNum ++;
                this._fetchListData();
            },500);
    }
    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
    }
    render() {
        return (
            <ListView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh.bind(this)}
                        tintColor="#ff0000"
                        title="正在加载..."
                        titleColor="#00ff00"
                        colors={['#ff0000', '#00ff00', '#0000ff']}
                        progressBackgroundColor="#ffff00"
                    />
                }
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={this._renderRow.bind(this)}
                renderFooter={this._renderFooter.bind(this)}
                onEndReached={this._endReached.bind(this)}
                onEndReachedThreshold={0}

            />
        )
    }
}

export default connect()(Collection);
