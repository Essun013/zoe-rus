/**
 * Created by linys on 2016/11/2.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
    ListView,
} from 'react-native';
import device from '../../../common/util/device';


class Message extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.toDetail = this.toDetail.bind(this);
        //消息数组
        this.state = {
            msgChkList:[{
                msgName:'产检信息',
                msgImg: require('../img/msg/cjxx.png'),
                summary:'到了12周，孕妈妈需要进行第一次产前检查了......',
                msgTime:'上午08:20',
                unRead: 13,
            },{
                msgName:'儿童体检',
                msgImg: require('../img/msg/ettj.png'),
                summary:'宝宝体检时间快到了',
                msgTime:'星期四',
                unRead: 9,
            },{
                msgName:'预防接种',
                msgImg: require('../img/msg/yfjz.png'),
                summary:'宝宝接种疫苗时间快到了',
                msgTime:'星期一',
                unRead: 4,
            },{
                msgName:'事务性提醒',
                msgImg: require('../img/msg/swxtx.png'),
                summary:'亲爱滴宝妈，你的宝宝足月了吧？恭喜恭喜！.......',
                msgTime:'09-19',
                unRead: 44,
            }],
            msgRemindList:[{
                msgName:'运动',
                msgImg: require('../img/msg/yd.png'),
                summary:'这个阶段，您可以适当的做些运动，让宝宝能了......',
                msgTime:'上午10:00',
                unRead: 21,
            },{
                msgName:'喝水',
                msgImg:require('../img/msg/hs.png'),
                summary:'喝水时间到了，多喝点水能够预防感冒，大口了......',
                msgTime:'下午05:30',
                unRead: 0,
            }],
            msgSysList:[{
                msgName:'系统更新',
                msgImg:require('../img/msg/xtgx.png'),
                summary:'亲，新版本出现了，立即点击体验吧！',
                msgTime:'06-20',
                unRead: 0,
            },{
                msgName:'系统通知',
                msgImg:require('../img/msg/xttz.png'),
                summary:'感觉当妈客户端很好用？分享给更多宝妈吧！',
                msgTime:'06-20',
                unRead: 0,
            }],
        };
    }

    toDetail(value, index){
        console.log(value + "   "+ index);
    }

    renderUnRead(unRead){
        if(unRead === 0){
            return ;
        } else {
            return <View style={styles.unRead}>
                <Text style={styles.unReadText}>{unRead}</Text>
            </View>;
        }
    }

    renderMsgChkList(){
        return this.state.msgChkList.map((val, index)=>{
            return (<TouchableOpacity key={index} style={[styles.touchableView,{marginBottom:1}]} onPress={()=>this.toDetail(val.msgName, index)}>
                <View style={{flex:1}}>
                    <Image source={val.msgImg} style={styles.msgImage}></Image>
                    {this.renderUnRead(val.unRead)}
                </View>
                <View style={{flex:5}}>
                    <View style={{flex:1, flexDirection:'row'}}>
                        <View style={{flex:5}}><Text style={styles.msgName} >{val.msgName}</Text></View>
                        <View style={{flex:2}}><Text style={styles.msgTime} >{val.msgTime}</Text></View>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={styles.msgSummary}>{val.summary}</Text>
                    </View>
                </View>
            </TouchableOpacity>);
        })
    };

    renderMsgRemindList(){
        return this.state.msgRemindList.map((val, index)=>{
            return (<TouchableOpacity key={index} style={[styles.touchableView,{marginBottom:1,marginTop:index===0?7:0}]} onPress={()=>this.toDetail(val.msgName, index)}>
                <View style={{flex:1}}>
                    <Image source={val.msgImg} style={styles.msgImage}></Image>
                    {this.renderUnRead(val.unRead)}
                </View>
                <View style={{flex:5}}>
                    <View style={{flex:1, flexDirection:'row'}}>
                        <View style={{flex:5}}><Text style={styles.msgName} >{val.msgName}</Text></View>
                        <View style={{flex:2}}><Text style={styles.msgTime} >{val.msgTime}</Text></View>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={styles.msgSummary}>{val.summary}</Text>
                    </View>
                </View>
            </TouchableOpacity>);
        })
    };

    renderMsgSysList(){
        return this.state.msgSysList.map((val, index)=>{
            return (<TouchableOpacity key={index} style={[styles.touchableView,{marginBottom:1,marginTop:index===0?7:0}]} onPress={()=>this.toDetail(val.msgName, index)}>
                <View style={{flex:1}}>
                    <Image source={val.msgImg} style={styles.msgImage}></Image>
                    {this.renderUnRead(val.unRead)}
                </View>
                <View style={{flex:5}}>
                    <View style={{flex:1, flexDirection:'row'}}>
                        <View style={{flex:5}}><Text style={styles.msgName} >{val.msgName}</Text></View>
                        <View style={{flex:2}}><Text style={styles.msgTime} >{val.msgTime}</Text></View>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={styles.msgSummary}>{val.summary}</Text>
                    </View>
                </View>
            </TouchableOpacity>);
        })
    };


    render() {
        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                    {this.renderMsgChkList()}
                    {this.renderMsgRemindList()}
                    {this.renderMsgSysList()}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        width: device.width(),
        backgroundColor:'#f5f5f5',
    },
    touchableView: {
        flex:1,
        flexDirection: 'row',
        width: device.width(),
        height: 64,
        backgroundColor:'#fff',
    },
    msgImage: {
        marginTop:7,
        marginBottom:7,
        marginLeft:7,
        width:48,
        height:48,
    },
    msgName: {
        paddingTop:9,
        fontFamily: 'PingFang SC',
        color:'rgb(0,0,0)',
        fontSize:15,
    },
    msgTime: {
        paddingTop:10,
        paddingRight:14,
        fontFamily: 'PingFang SC',
        color:'rgb(146,146,146)',
        fontSize:13,
        textAlign:'right',
    },
    msgSummary: {
        paddingTop:3,
        fontFamily: 'PingFang SC',
        color:'rgb(146,146,146)',
        fontSize:13,
    },
    unRead:{
        width:18,
        height:18,
        backgroundColor:'rgb(255,0,0)',
        borderColor:'rgb(255,0,0)',
        borderWidth:1,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        position: 'absolute',
        right: 4,
        top: 7
    },
    unReadText:{
        fontFamily: 'PingFang SC',
        color:'rgb(255,255,255)',
        fontSize:10,
    }


});

module.exports = Message;