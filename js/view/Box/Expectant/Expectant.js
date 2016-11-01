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
import {find} from '../../../actions';
import {navPush} from '../../../components/Nav/Nav';
import AddPackageThings from './AddPackageThings';
import {unPackage}  from '../../../actions/box/actions';
import {connect} from 'react-redux';

class Expectant extends Component {

    // 默认属性
    static defaultProps = {}

    // 属性类型
    static propTypes = {}

    constructor(props) {
        console.log('---Expectant---0.constructor------');
        super(props);
        this.switchCheckObj = this.switchCheckObj.bind(this);
        this.switchCheckThing = this.switchCheckThing.bind(this);
        this.toAddPackageThings = this.toAddPackageThings.bind(this);

        var checkedList = [{
            name:'毛巾',
            number:'4条',
        }, {
            name:'拖鞋',
            number:'2双',
        }, {
            name:'睡衣',
            number:'4套',
        }];

        var UnCheckedList = [{
            name:'产妇卫生巾',
            number:'3包',
        }, {
            name:'哺乳文胸',
            number:'2包',
        }, {
            name:'月子帽',
            number:'2顶',
        }];

        this.state = {
            checkObj: 'mom', //检查对象初始值默认为妈妈
            checkedList: checkedList,//已检查物品
            UnCheckedList: UnCheckedList,//未检查物品
        };

    }

    componentDidMount() {

        console.log('---Expectant---3.componentDidMount------');
    }

    toAddPackageThings(o) {
        navPush.push(o, AddPackageThings, "添加待产包");
    }

    _navRight(nav, _prototype) {
        return (
            <View style={styles.rightContainer}>
                <TouchableOpacity style={styles.bottomCenter} onPress={() => {_prototype.toAddPackageThings(nav)}}>
                    <Text style={{color:'rgb(255,255,255)',fontSize:15}}>添加</Text>
                </TouchableOpacity>
            </View>
        );
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
    switchCheckThing(thing, index, checked){
        //console.log(thing);
        if(checked){
            this.state.checkedList.push(thing); //增加元素
            this.state.UnCheckedList.splice(index, 1); //移除元素
            this.setState({
                checkedList: this.state.checkedList,
                UnCheckedList: this.state.UnCheckedList,
            });
        } else {
            this.state.UnCheckedList.push(thing); //增加元素
            this.state.checkedList.splice(index, 1); //移除元素
            this.setState({
                checkedList: this.state.checkedList,
                UnCheckedList: this.state.UnCheckedList,
            });
        }
    }

    //渲染检查对象
    _renderTitleCheckObj(obj){
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

    //渲染未准备物品
    renderUnCheckedThing(index, things){
        return (
            <View key={index} style={styles.prepareContentArea}>
                <View style={{flex:5}}><Text style={styles.prepareContentAreaText}>{things.name}</Text></View>
                <View style={{flex:5}}><Text style={styles.prepareContentAreaCount}>{things.number}</Text></View>
                <TouchableOpacity style={{flex:1}} onPress={()=>this.switchCheckThing(things, index, true)}>
                    <Image source={require('../img/expectant/unchecked.png')} style={styles.prepareChkImg}></Image>
                </TouchableOpacity>
            </View>
        );
    }

    //渲染已准备物品
    renderCheckedThing(index, things){
        return (
            <View key={index} style={styles.prepareContentArea}>
                <View style={{flex:5}}><Text style={styles.prepareContentAreaText}>{things.name}</Text></View>
                <View style={{flex:5}}><Text style={styles.prepareContentAreaCount}>{things.number}</Text></View>
                <TouchableOpacity style={{flex:1}} onPress={()=>this.switchCheckThing(things, index, false)}>
                    <Image source={require('../img/expectant/checked.png')} style={styles.prepareChkImg}></Image>
                </TouchableOpacity>
            </View>
        );
    }


    //渲染所有待产包
    _renderCheckThings(){
        return <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
            <View style={styles.prepareTextArea}>
                <Image source={require('../img/expectant/begin.png')} style={styles.prepareImg}></Image>
                <Text style={styles.prepareText}>未准备</Text>
            </View>
            {this.state.UnCheckedList.map((obj, index)=>{
                return this.renderUnCheckedThing(index, obj);
            })}
            <View style={styles.prepareTextArea}>
                <Image source={require('../img/expectant/begin.png')} style={styles.prepareImg}></Image>
                <Text style={styles.prepareText}>已准备</Text>
            </View>
            {this.state.checkedList.map((obj, index)=>{
                return this.renderCheckedThing(index, obj);
            })}
        </ScrollView>;
    }

    render() {
        console.log('---Expectant---2.render------');

        //处理待添加的东西
        let things = this.props.addPackageThing;
        if(typeof things !== 'undefined'){
            console.log('thingName:'+things.addThingName);
            console.log('thingCount:'+things.addThingCount);
            console.log('thingCount:'+things.addThingClass);
            this.state.UnCheckedList.push({name:things.addThingName,number:things.addThingCount});
            //TODO 用完一次就释放掉防止再次render  待解决
            //delete this.props.addPackageThing;
            //this.props.dispatch(unPackage(null));
        }

        return (
            <View style={{flex:1,backgroundColor:'#f5f5f5'}}>
                {this._renderTitleCheckObj(this.state.checkObj)}
                {this._renderCheckThings()}
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
    },
    rightContainer: {
        flex: 1,
        justifyContent: 'center',
        marginRight: 20,
        flexDirection: 'row',
    },
    bottomCenter: {
        justifyContent: 'center',
    },

});

function mapStateToProps(store) {
    //Alert.alert(JSON.stringify(store))
    //Alert.alert(JSON.stringify(store.getState()))
    return {
        addPackageThing: store.boxX.addPackageThing,
    }
}

module.exports = connect(mapStateToProps)(Expectant);
