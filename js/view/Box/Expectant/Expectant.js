/**
 * Created by linys on 2016/10/26.
 */

import React, {Component} from 'react';
import {StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Image,
    Alert} from 'react-native';
import device from '../../../common/util/device';

class Expectant extends Component {

    // 默认属性
    static defaultProps = {}

    // 属性类型
    static propTypes = {}

    constructor(props) {
        console.log('---Expectant---0.constructor------');
        super(props);
        this.state = {
            checkObj: 'mom', //检查对象初始值默认为妈妈
        };
        this.switchCheckObj = this.switchCheckObj.bind(this);
        this.switchCheckThing = this.switchCheckThing.bind(this);
    }

    componentWillMount() {
        console.log('---Expectant---1.componentWillMount------');
    }

    componentDidMount() {
        console.log('---Expectant---3.componentDidMount------');
    }

    componentWillUnmount() {
    }

    //切换检查对象
    switchCheckObj(obj){
        if(obj==="mom"){//妈妈
            this.setState({
                checkObj: 'mom',
            });
        } else if(obj==="baby"){//宝宝
            this.setState({
                checkObj: 'baby',
            });
        } else{}

    }

    //切换检查物品
    switchCheckThing(){

    }


    //渲染检查对象
    renderTitleCheckObj(obj){
        if(obj==="mom"){//妈妈
            return (<View style={styles.checkObjView}>
                <TouchableOpacity style={styles.checkObjSel} onPress={()=>{this.switchCheckObj("mom")}}>
                    <Text style={styles.checkObjTitleSel}>待产妈妈</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.checkObjUnSel} onPress={()=>{this.switchCheckObj("baby")}}>
                    <Text style={styles.checkObjTitleUnSel}>新生宝宝</Text>
                </TouchableOpacity>
            </View>);
        } else if(obj==="baby"){//宝宝
            return (<View style={styles.checkObjView}>
                <TouchableOpacity style={styles.checkObjUnSel} onPress={()=>{this.switchCheckObj("mom")}}>
                    <Text style={styles.checkObjTitleUnSel}>待产妈妈</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.checkObjSel} onPress={()=>{this.switchCheckObj("baby")}}>
                    <Text style={styles.checkObjTitleSel}>新生宝宝</Text>
                </TouchableOpacity>
            </View>);
        } else{
            return ;
        }
    }



    render() {
        console.log('---Expectant---2.render------');

        return (
            <View style={{flex:1,backgroundColor:'#f5f5f5'}}>
                {this.renderTitleCheckObj(this.state.checkObj)}
                <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                    <View style={styles.prepareTextArea}>
                        <Image source={require('../img/expectant/begin.png')} style={styles.prepareImg}></Image>
                        <Text style={styles.prepareText}>未准备</Text>
                    </View>
                    <View style={styles.prepareContentArea}>
                        <View style={{flex:5}}><Text style={styles.prepareContentAreaText} >产妇卫生巾</Text></View>
                        <View style={{flex:5}}><Text style={styles.prepareContentAreaCount}>3包</Text></View>
                        <TouchableOpacity style={{flex:1}} onPress={this.switchCheckThing}>
                            <Image source={require('../img/expectant/unchecked.png')} style={styles.prepareChkImg}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.prepareContentArea}>
                        <View style={{flex:5}}><Text style={styles.prepareContentAreaText}>哺乳文胸</Text></View>
                        <View style={{flex:5}}><Text style={styles.prepareContentAreaCount}>2包</Text></View>
                        <TouchableOpacity style={{flex:1}} onPress={this.switchCheckThing}>
                            <Image source={require('../img/expectant/unchecked.png')} style={styles.prepareChkImg}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.prepareContentArea}>
                        <View style={{flex:5}}><Text style={styles.prepareContentAreaText}>月子帽</Text></View>
                        <View style={{flex:5}}><Text style={styles.prepareContentAreaCount}>2顶</Text></View>
                        <TouchableOpacity style={{flex:1}}>
                            <Image source={require('../img/expectant/unchecked.png')} style={styles.prepareChkImg}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.prepareTextArea}>
                        <Image source={require('../img/expectant/begin.png')} style={styles.prepareImg}></Image>
                        <Text style={styles.prepareText}>已准备</Text>
                    </View>
                    <View style={styles.prepareContentArea} onPress={this.switchCheckThing}>
                        <View style={{flex:5}}><Text style={styles.prepareContentAreaText}>毛巾</Text></View>
                        <View style={{flex:5}}><Text style={styles.prepareContentAreaCount}>4条</Text></View>
                        <TouchableOpacity style={{flex:1}}>
                            <Image source={require('../img/expectant/checked.png')} style={styles.prepareChkImg}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.prepareContentArea}>
                        <View style={{flex:5}}><Text style={styles.prepareContentAreaText}>拖鞋</Text></View>
                        <View style={{flex:5}}><Text style={styles.prepareContentAreaCount}>2双</Text></View>
                        <TouchableOpacity style={{flex:1}}>
                            <Image source={require('../img/expectant/checked.png')} style={styles.prepareChkImg}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.prepareContentArea}>
                        <View style={{flex:5}}><Text style={styles.prepareContentAreaText}>睡衣</Text></View>
                        <View style={{flex:5}}><Text style={styles.prepareContentAreaCount}>4套</Text></View>
                        <TouchableOpacity style={{flex:1}}>
                            <Image source={require('../img/expectant/checked.png')} style={styles.prepareChkImg}></Image>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );

    }
}

const styles = StyleSheet.create({

    checkObjView: {
        flexDirection:'row',
        backgroundColor:'#fff',
    },
    checkObjSel: {
        flex:1,
        borderBottomWidth: 2,
        borderBottomColor: 'rgb(254,122,162)',
    },
    checkObjUnSel: {
        flex:1,
        //borderBottomWidth: 2,
        //borderBottomColor: 'rgb(0,0,0)',
    },
    checkObjTitleSel: {
        fontSize:15,
        paddingTop:10,
        paddingBottom:8,
        textAlign:'center',
        color:'rgb(254,122,162)',
        fontFamily: 'PingFang SC',
    },
    checkObjTitleUnSel: {
        fontSize:15,
        paddingTop:10,
        paddingBottom:8,
        textAlign:'center',
        color:'rgb(0,0,0)',
        fontFamily: 'PingFang SC',
    },

    prepareText: {
        paddingTop:8,
        fontSize:14,
        paddingLeft:10,
        color:'rgb(254,122,162)',
        fontFamily: 'PingFang SC',
    },
    prepareImg: {
        marginTop:10,
        width:5,
        height:16,
    },

    prepareTextArea: {
        backgroundColor:'#fff',
        flexDirection:'row',
        marginTop:5,
        //marginBottom:5,
    },

    prepareContentArea: {
        backgroundColor:'#fff',
        flexDirection:'row',
        marginBottom:1,
    },

    prepareChkImg: {
        marginTop:12,
        width:18,
        height:18,
    },

    prepareContentAreaText: {
        paddingLeft:15,
        paddingTop:10,
        paddingBottom:10,
        color:'rgb(0,0,0)',
        fontFamily: 'PingFang SC',
    },

    prepareContentAreaCount: {
        paddingLeft:15,
        paddingTop:10,
        paddingBottom:10,
        color:'rgb(146,146,146)',
        fontFamily: 'PingFang SC',
    }




})

module.exports = Expectant;
