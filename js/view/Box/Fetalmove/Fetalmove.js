/**
 * Created by linys on 2016/10/26.
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
import Calculation from './Calculation';
import {connect} from 'react-redux';


var total = 3599;
var timerRef;
var tmpValidCounter;

class Fetalmove extends Component {

    // 默认属性
    static defaultProps = {
        sideLength: device.width()/3,
    }

    // 属性类型
    static propTypes = {
        sideLength: PropTypes.number,
    }

    constructor(props) {
        super(props);
        this.state = {
            surplusTime: '60:00', //倒计时
            clickTimes: -1,
            autoCounts: 0,
            isStart: false,
        };
        this.total = total;
        this.timerRef = timerRef;
        //导航栏
        this.props.iNavBar(this, {
            right: this._navRight.bind(this),
            left: this._navLeft.bind(this)
        });

        this.pressCountBtn = this.pressCountBtn.bind(this);

    }

    componentDidMount() {
        console.log('---Fetalmove---componentDidMount------');
        this.props.dispatch(home.hideMenu(true));
    }
    componentWillMount() {
        console.log('---Fetalmove---componentWillMount------');
    }
    componentWillUnmount() {
        console.log('---Fetalmove---componentWillUnmount------');
        if(this.timerRef)
            clearInterval(this.timerRef); //清除计时器
        this.props.dispatch(home.hideMenu(false));
    }

    //计时器
    timeCounter(){
        let s = (this.total % 60) < 10 ? ('0' + this.total % 60) : this.total % 60;
        let h = this.total / 3600 < 10 ? ('0' + parseInt(this.total / 3600)) : parseInt(this.total / 3600);
        let m = (this.total - h * 3600) / 60 < 10 ? ('0' + parseInt((this.total - h * 3600) / 60)) : parseInt((this.total - h * 3600) / 60);
        let surplusTime = m + ':' + s;
        if(this.total % 300 === 0 && tmpValidCounter < this.state.clickTimes){ //5分钟之内自动校验一次胎动，在有点击胎动的情况下
            tmpValidCounter = this.state.clickTimes;
            this.setState({
                surplusTime: surplusTime,
                autoCounts: ++this.state.autoCounts,
            });
        } else {
            this.setState({
                surplusTime: surplusTime,
            });
        }
        this.total--;
        if (this.total < 0){
            clearInterval(this.timerRef);
            this.setState({
                isStart:false,
            });


            //请求计数



        }
    }

    //点击计数按钮
    pressCountBtn(){
        //是否开始计数
        if(this.state.isStart){
            //点击次数
            let clickCount = this.state.clickTimes + 1;
            //记录点击时间
            this.setState({
                clickTimes: clickCount,
            });
        } else {
            this.timerRef = setInterval(()=>this.timeCounter(), 1000);
            //记录点击时间
            this.setState({
                clickTimes: ++this.state.clickTimes,
                autoCounts: 0,
                isStart:true,
            });
            tmpValidCounter = this.state.clickTimes;
        }


    }

    render(){
        console.log('---Fetalmove---render------');

        return (
            <Image source={require('../img/fetalmove/bg.png')} resizeMode='stretch' style={styles.bg}>
                <View style={styles.alignCenter}><Text style={styles.fontHints}>5分钟内连续胎动，只算做1次有效胎动</Text></View>
                <View style={styles.alignCenter}><Text style={styles.fontHints}>剩余时间</Text></View>
                <View style={[styles.alignCenter, {paddingTop:5}]}>
                    <Text Text style={[styles.fontHints,{fontSize: 24}]}>{this.state.surplusTime}</Text>
                </View>
                <View style={styles.alignCenter}>
                    <TouchableOpacity style={{}} onPress={this.pressCountBtn}>
                        <Image source={require('../img/fetalmove/movement.png')} style={styles.movementImg} >
                            <Text style={styles.counts}>{this.state.clickTimes===-1?'开始':this.state.clickTimes}</Text>
                        </Image>
                    </TouchableOpacity>
                </View>
                <View style={[styles.alignCenter, {flexDirection: 'row', alignItems:'center'}]}>
                    <Text style={styles.fontHints}>胎动次数: </Text>
                    <Text style={[styles.fontHints, {fontSize: 30}]}>{this.state.autoCounts}</Text>
                    <Text style={styles.fontHints}> 次</Text>
                </View>
                <Image source={require('../img/fetalmove/bottom.png')} style={styles.bottomImg} ></Image>
            </Image>
        );

    }

    toCalculation(){
        navPush.push(this.props, Calculation, '胎动统计');
    }

    onCancel(){
        if(this.state.isStart){
            Alert.alert('温馨提示', '您正在数胎动中...要终止并退出吗？', [
                {text:'取消',onPress:()=>{return }},
                {text:'确定',onPress:()=>{navPush.pop(this.props);}}
            ]);
        } else {
            navPush.pop(this.props);
        }
    }

    _navRight(nav, _prototype) {
        return (
            <View style={styles.rightContainer}>
                <TouchableOpacity style={styles.bottomCenter} onPress={()=>this.toCalculation()}>
                    <Text style={{color:'rgb(255,255,255)',fontSize:15}}>统计</Text>
                </TouchableOpacity>
            </View>
        );
    }

    _navLeft(nav, _prototype) {
        return (
            <View style={styles.rightContainer}>
                <TouchableOpacity style={styles.bottomCenter} onPress={()=>this.onCancel()}>
                    <Text style={{color:'rgb(255,255,255)',fontSize:15}}>取消</Text>
                </TouchableOpacity>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    bg: {
        ...Platform.select({
            ios: {
                height: device.height() - 60
            },
            android: {
                height: device.height() - 40,
            }
        }),
        width: device.width(),
    },
    container:{
        flex:1,
        backgroundColor:'#f5f5f5',
    },
    rightContainer: {
        flex: 1,
        justifyContent: 'center',
        margin: 18,
    },
    bottomCenter: {
        justifyContent: 'center',
    },
    bottomImg:{
        height: 150,
        width: device.width(),
        position: 'absolute',
        bottom: 0,
    },
    movementImg:{
        height: device.width()/3,
        width: device.width()/3
    },
    fontHints: {
        fontSize: 16,
        fontFamily: 'PingFang SC',
        color: 'rgb(255,255,255)',
    },
    counts: {
        textAlign: 'center',
        fontSize: 35,
        lineHeight: device.width()/3,
        fontFamily: 'PingFang SC',
        color: 'rgb(255,122,162)',
        //backgroundColor: 'gray'
    },
    alignCenter: {
        paddingTop: 25,
        justifyContent:'center',
        alignItems: 'center',
    }

});

module.exports = connect()(Fetalmove);
