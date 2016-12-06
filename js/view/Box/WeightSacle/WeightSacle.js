/**
 * Created by linys on 2016/11/28.
 */
import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
import {StyleSheet,
    Platform,
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    Animated,
    Image,
    Easing,
    PanResponder,
    Alert} from 'react-native';
import {device} from '../../../common/util';
import px2dp from '../../../common/util/px2dp';
import Icon from 'react-native-vector-icons/Ionicons';
import {navPush} from '../../../components/Nav/Nav';


class WeightSacle extends Component {

    // 默认属性
    static defaultProps = {
    }

    // 属性类型
    static propTypes = {
    }

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        console.log('---WeightSacle---componentDidMount------');
    }
    componentWillMount() {
        console.log('---WeightSacle---componentWillMount------');
    }
    componentWillUnmount() {
        console.log('---WeightSacle---componentWillUnmount------');
    }

    btnCount(){
        let s1 = "2015-7-25";
        let s2 = "2016-12-6";
        return "日期；"+s1+" 日期："+s2+" 相差 "+this.DateDiff(s1,s2)+"天";
    }

    //计算天数差的函数，通用
    DateDiff(sDate1,  sDate2){
        var  aDate,  oDate1,  oDate2,  iDays
        aDate  =  sDate1.split("-")
        oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])    //转换为12-18-2006格式
        aDate  =  sDate2.split("-")
        oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])
        iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数
        return  iDays
    }


    render(){

        return (
            <View style={[styles.container, {flex: 1}]}>
                <Text> {this.btnCount()} </Text>
            </View>
        );

    }

}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'rgb(245,245,245)',
        //alignItems:'center',
        //justifyContent:'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    item: {
        flexDirection: 'row',
        height: px2dp(49),
        width: device.width(),
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingLeft: px2dp(20),
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        position: 'absolute',
    },
    itemTitle: {
        fontSize: px2dp(15),
        color: '#000',
        marginLeft: px2dp(20)
    }

});

module.exports = WeightSacle;