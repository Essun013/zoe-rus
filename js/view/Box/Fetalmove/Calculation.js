/**
 * Created by linys on 2016/11/22.
 */

import React, {Component, PropTypes} from 'react';
import {StyleSheet,
    Platform,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Image,
    Alert} from 'react-native';
import device from '../../../common/util/device';
import {home, find} from '../../../actions';
import {navPush} from '../../../components/Nav/Nav';
import {connect} from 'react-redux';

var marginLeftPx = 13;
var rowhightPx = 40;

class Calculation extends Component {

    // 默认属性
    static defaultProps = {
    }

    // 属性类型
    static propTypes = {
    }

    constructor(props) {
        super(props);
        this.state = {
            data:[
                {
                    date:'2016-10-12',
                    fetalmoveArr:[
                        {startTime:'10:00',fetalmoveCount:3,clickCount:5},
                        {startTime:'09:00',fetalmoveCount:5,clickCount:7},
                        {startTime:'08:00',fetalmoveCount:6,clickCount:8}
                    ]
                },
                {
                    date:'2016-10-11',
                    fetalmoveArr:[
                        {startTime:'12:00',fetalmoveCount:3,clickCount:5},
                        {startTime:'04:00',fetalmoveCount:7,clickCount:52},
                        {startTime:'03:00',fetalmoveCount:9,clickCount:31}
                    ]
                },
                {
                    date:'2016-10-10',
                    fetalmoveArr:[
                        {startTime:'13:00',fetalmoveCount:3,clickCount:5},
                        {startTime:'11:00',fetalmoveCount:4,clickCount:12},
                        {startTime:'05:00',fetalmoveCount:2,clickCount:18}
                    ]
                },
                {
                    date:'2016-10-09',
                    fetalmoveArr:[
                        {startTime:'22:00',fetalmoveCount:3,clickCount:5},
                        {startTime:'20:00',fetalmoveCount:2,clickCount:4},
                        {startTime:'18:00',fetalmoveCount:1,clickCount:7}
                    ]
                }
            ]

        };

        //导航栏


    }

    componentDidMount() {
        console.log('---Calculation---componentDidMount------');
    }
    componentWillMount() {
        console.log('---Calculation---componentWillMount------');
    }
    componentWillUnmount() {
        console.log('---Calculation---componentWillUnmount------');
    }

    //渲染日期和表头
    _renderRow(){
        return this.state.data.map((val, index)=>{
            return (
            <View key={index}>
                <View style={styles.timeAxisRow}>
                    <View style={styles.time}>
                        <View style={styles.timeAxis}></View>
                        <View style={styles.circle}></View>
                    </View>
                    <View style={styles.timeAxisRowDate}>
                        <Text style={styles.text}>{val.date}</Text>
                    </View>
                </View>
                <View style={styles.timeAxisRow}>
                    <View style={styles.time}>
                        <View style={styles.timeAxis}></View>
                    </View>
                    <View style={styles.timeAxisRowTitle}>
                        <Text style={styles.text}>开始时间</Text>
                        <Text style={styles.text}>胎动次数</Text>
                        <Text style={styles.text}>实际点击</Text>
                    </View>
                </View>
                {val.fetalmoveArr.map((data, i)=>{
                    return this._renderRowData(data, i)
                })}
            </View>);
        });

    }

    //渲染胎动次数和实际点击
    _renderRowData(data, i){
        return <View style={styles.timeAxisRow} key={i}>
            <View style={styles.time}>
                <View style={styles.timeAxis}></View>
            </View>
            <View style={styles.timeAxisRowContent}>
                <View style={{width:45}}><Text style={styles.content}>{data.startTime}</Text></View>
                <View style={{width:45}}><Text style={styles.content}>{data.fetalmoveCount}</Text></View>
                <View style={{width:45}}><Text style={styles.content}>{data.clickCount}</Text></View>
            </View>
        </View>
    }


    render(){
        console.log('---Calculation---render------');

        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>

                    {this._renderRow()}

                    {/*<View>
                        <View style={styles.timeAxisRow}>
                            <View style={styles.time}>
                                <View style={styles.timeAxis}></View>
                                <View style={styles.circle}></View>
                            </View>
                            <View style={styles.timeAxisRowDate}>
                                <Text style={styles.text}>2016-10-12</Text>
                            </View>
                        </View>
                        <View style={styles.timeAxisRow}>
                            <View style={styles.time}>
                                <View style={styles.timeAxis}></View>
                            </View>
                            <View style={styles.timeAxisRowTitle}>
                                <Text style={styles.text}>开始时间</Text>
                                <Text style={styles.text}>胎动次数</Text>
                                <Text style={styles.text}>实际点击</Text>
                            </View>
                        </View>
                        <View style={styles.timeAxisRow}>
                            <View style={styles.time}>
                                <View style={styles.timeAxis}></View>
                            </View>
                            <View style={styles.timeAxisRowContent}>
                                <Text style={styles.content}>10:00</Text>
                                <Text style={styles.content}>3</Text>
                                <Text style={styles.content}>5</Text>
                            </View>
                        </View>
                        <View style={styles.timeAxisRow}>
                            <View style={styles.time}>
                                <View style={styles.timeAxis}></View>
                            </View>
                            <View style={styles.timeAxisRowContent}>
                                <Text style={styles.content}>12:00</Text>
                                <Text style={styles.content}>5</Text>
                                <Text style={styles.content}>8</Text>
                            </View>
                        </View>
                        <View style={styles.timeAxisRow}>
                            <View style={styles.time}>
                                <View style={styles.timeAxis}></View>
                            </View>
                            <View style={styles.timeAxisRowContent}>
                                <Text style={styles.content}>13:00</Text>
                                <Text style={styles.content}>3</Text>
                                <Text style={styles.content}>9</Text>
                            </View>
                        </View>
                    </View>*/}


                </ScrollView>
            </View>
        );

    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'rgb(245,245,245)',
    },
    timeAxisRow:{
        flex:1,
        flexDirection:'row',
        height:rowhightPx
    },
    circle:{
        marginLeft:marginLeftPx-3,
        height:7,
        width:7,
        borderRadius:7,
        backgroundColor:'rgb(255,122,162)',
    },
    timeAxis:{
        position:'absolute',
        left:marginLeftPx,
        height:rowhightPx,
        borderWidth:1,
        borderColor:'rgb(204,204,204)'
    },
    text:{
        fontFamily: 'PingFang SC',
        fontSize: 14,
        color:'rgb(146,146,146)',
    },
    content:{
        textAlign:'center',
        fontFamily: 'PingFang SC',
        fontSize: 14,
        color:'rgb(0,0,0)',
    },
    time:{
        flex:1,
        flexDirection:'row',
        alignItems:'center'
    },
    timeAxisRowDate:{
        flex:10,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    timeAxisRowTitle:{
        flex:10,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:'rgb(255,255,255)',
        marginRight:15
    },
    timeAxisRowContent:{
        marginTop:1,
        flex:10,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:'rgb(255,255,255)',
        marginRight:15
    }


});

module.exports = Calculation;